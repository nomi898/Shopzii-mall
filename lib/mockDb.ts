import bcrypt from "bcryptjs";

export type Role = "user" | "admin";

export type DbUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
};

export type DbProfile = {
  userId: string;
  name?: string;
  phone?: string;
  country?: string;
  updatedAt: string;
};

export type DbWallet = {
  userId: string;
  balance: number;
  currency: "USD";
  updatedAt: string;
};

export type DbOrder = {
  id: string;
  userId: string;
  status: "pending" | "completed" | "cancelled";
  amount: number;
  createdAt: string;
};

type State = {
  usersByEmail: Map<string, DbUser>;
  profilesByUserId: Map<string, DbProfile>;
  walletsByUserId: Map<string, DbWallet>;
  orders: DbOrder[];
  seeded: boolean;
};

const state: State = {
  usersByEmail: new Map(),
  profilesByUserId: new Map(),
  walletsByUserId: new Map(),
  orders: [],
  seeded: false,
};

function nowIso() {
  return new Date().toISOString();
}

function randomId(prefix: string) {
  return `${prefix}_${Math.random().toString(16).slice(2)}${Date.now().toString(16)}`;
}

async function ensureSeed() {
  if (state.seeded) return;
  state.seeded = true;

  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword && !state.usersByEmail.has(adminEmail)) {
    const passwordHash = await bcrypt.hash(adminPassword, 10);
    const admin: DbUser = {
      id: randomId("usr"),
      email: adminEmail,
      passwordHash,
      role: "admin",
      createdAt: nowIso(),
    };
    state.usersByEmail.set(adminEmail, admin);
    state.walletsByUserId.set(admin.id, {
      userId: admin.id,
      balance: 0,
      currency: "USD",
      updatedAt: nowIso(),
    });
  }

  // Demo user for local development
  const demoEmail = "demo@shopzii.test";
  if (!state.usersByEmail.has(demoEmail)) {
    const passwordHash = await bcrypt.hash("demo1234", 10);
    const demoUser: DbUser = {
      id: randomId("usr"),
      email: demoEmail,
      passwordHash,
      role: "user",
      createdAt: nowIso(),
    };
    state.usersByEmail.set(demoEmail, demoUser);
    state.walletsByUserId.set(demoUser.id, {
      userId: demoUser.id,
      balance: 0,
      currency: "USD",
      updatedAt: nowIso(),
    });
  }
}

export async function createUser(params: {
  email: string;
  password: string;
  role?: Role;
}) {
  await ensureSeed();
  const email = params.email.trim().toLowerCase();
  if (state.usersByEmail.has(email)) {
    throw new Error("User already exists");
  }
  const passwordHash = await bcrypt.hash(params.password, 10);
  const user: DbUser = {
    id: randomId("usr"),
    email,
    passwordHash,
    role: params.role ?? "user",
    createdAt: nowIso(),
  };
  state.usersByEmail.set(email, user);
  state.walletsByUserId.set(user.id, {
    userId: user.id,
    balance: 0,
    currency: "USD",
    updatedAt: nowIso(),
  });
  return user;
}

export async function verifyUserPassword(email: string, password: string) {
  await ensureSeed();
  const user = state.usersByEmail.get(email.trim().toLowerCase());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}

export async function getUserByEmail(email: string) {
  await ensureSeed();
  return state.usersByEmail.get(email.trim().toLowerCase()) ?? null;
}

export async function getUserById(id: string) {
  await ensureSeed();
  for (const u of state.usersByEmail.values()) {
    if (u.id === id) return u;
  }
  return null;
}

export async function getOrCreateProfile(userId: string) {
  await ensureSeed();
  const existing = state.profilesByUserId.get(userId);
  if (existing) return existing;
  const profile: DbProfile = { userId, updatedAt: nowIso() };
  state.profilesByUserId.set(userId, profile);
  return profile;
}

export async function updateProfile(
  userId: string,
  patch: Pick<DbProfile, "name" | "phone" | "country">,
) {
  await ensureSeed();
  const current = await getOrCreateProfile(userId);
  const updated: DbProfile = { ...current, ...patch, updatedAt: nowIso() };
  state.profilesByUserId.set(userId, updated);
  return updated;
}

export async function getWallet(userId: string) {
  await ensureSeed();
  const wallet = state.walletsByUserId.get(userId);
  if (wallet) return wallet;
  const created: DbWallet = {
    userId,
    balance: 0,
    currency: "USD",
    updatedAt: nowIso(),
  };
  state.walletsByUserId.set(userId, created);
  return created;
}

export async function addToWallet(userId: string, amount: number) {
  await ensureSeed();
  const wallet = await getWallet(userId);
  const next: DbWallet = {
    ...wallet,
    balance: Math.round((wallet.balance + amount) * 100) / 100,
    updatedAt: nowIso(),
  };
  state.walletsByUserId.set(userId, next);
  return next;
}

export async function subtractFromWallet(userId: string, amount: number) {
  await ensureSeed();
  const wallet = await getWallet(userId);
  if (wallet.balance < amount) throw new Error("Insufficient balance");
  const next: DbWallet = {
    ...wallet,
    balance: Math.round((wallet.balance - amount) * 100) / 100,
    updatedAt: nowIso(),
  };
  state.walletsByUserId.set(userId, next);
  return next;
}

export async function listOrders(userId: string) {
  await ensureSeed();
  return state.orders.filter((o) => o.userId === userId);
}

export async function createOrder(userId: string, amount: number) {
  await ensureSeed();
  const order: DbOrder = {
    id: randomId("ord"),
    userId,
    status: "pending",
    amount: Math.round(amount * 100) / 100,
    createdAt: nowIso(),
  };
  state.orders.unshift(order);
  return order;
}

export async function listAllUsers() {
  await ensureSeed();
  return Array.from(state.usersByEmail.values()).map((u) => ({
    id: u.id,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
  }));
}

export async function listAllOrders() {
  await ensureSeed();
  return [...state.orders];
}

