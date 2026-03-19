"use client";
import { ButtonProps } from "./types";

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled,
}: ButtonProps) {
  const baseClass = "px-6 py-3 rounded font-semibold";
  const styleClass =
    variant === "primary"
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${styleClass}`}
    >
      {label}
    </button>
  );
}
