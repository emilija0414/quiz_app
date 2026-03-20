"use client";

import { ButtonProps } from "./types";

export default function Button({
  label,
  onClick,
  variant = "primary",
  color,
  disabled,
}: ButtonProps) {
  const baseClass = "px-6 py-3 rounded font-semibold";
  const textClass =
    variant === "primary"
      ? "text-white hover:brightness-90"
      : "text-black hover:bg-gray-300";
  const bgClass = variant === "primary" ? "" : "bg-gray-200";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={color ? { backgroundColor: color } : undefined}
      className={`${baseClass} ${bgClass} ${textClass}, ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {label}
    </button>
  );
}
