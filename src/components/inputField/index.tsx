"use client";
import { InputFieldProps } from "./types";

export default function InputField({
  value,
  placeholder,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type="number"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 w-full mt-4"
    />
  );
}
