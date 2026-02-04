export type AuthUser =
  | { status: "guest" }
  | { status: "user"; email: string };

const STORAGE_KEY = "shopzii_auth_v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAuthUser(): AuthUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AuthUser;
    if (!parsed || typeof parsed !== "object") return null;
    if (parsed.status === "guest") return parsed;
    if (parsed.status === "user" && typeof (parsed as any).email === "string")
      return parsed as AuthUser;
    return null;
  } catch {
    return null;
  }
}

export function setAuthUser(user: AuthUser) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("shopzii-auth-changed"));
}

export function clearAuthUser() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("shopzii-auth-changed"));
}


