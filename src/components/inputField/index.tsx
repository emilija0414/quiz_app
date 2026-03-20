"use client";
import { InputFieldProps } from "./types";

import { useEffect, useState } from "react";

export default function InputField({
  value,
  placeholder,
  onValueChange,
}: InputFieldProps) {
  const [localValue, setLocalValue] = useState(value?.toString() ?? "");

  useEffect(() => {
    setLocalValue(value?.toString() ?? "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
    if (onValueChange) onValueChange(e.target.value);
  };

  return (
    <input
      type="number"
      value={localValue}
      placeholder={placeholder}
      onChange={handleChange}
      className="border rounded px-3 py-2 w-full mt-4"
    />
  );
}
