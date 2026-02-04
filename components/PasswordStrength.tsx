"use client";

type Props = {
  password: string;
};

export default function PasswordStrength({ password }: Props) {
  if (!password) return null;

  const length = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const criteria = [
    { label: "8+ characters", met: length },
    { label: "Contains letter", met: hasLetter },
    { label: "Contains number", met: hasNumber },
    { label: "Special character", met: hasSpecial },
  ];

  const metCount = criteria.filter((c) => c.met).length;
  const strength =
    metCount === 0
      ? "weak"
      : metCount <= 2
        ? "medium"
        : metCount === 3
          ? "good"
          : "strong";

  const strengthColors = {
    weak: "bg-red-500",
    medium: "bg-yellow-500",
    good: "bg-blue-500",
    strong: "bg-green-500",
  };

  return (
    <div className="mt-2 space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strengthColors[strength]}`}
            style={{ width: `${(metCount / 4) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600 capitalize">
          {strength}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1 text-xs">
        {criteria.map((criterion, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-1 ${
              criterion.met ? "text-green-600" : "text-gray-400"
            }`}
          >
            <span>{criterion.met ? "✓" : "○"}</span>
            <span>{criterion.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
