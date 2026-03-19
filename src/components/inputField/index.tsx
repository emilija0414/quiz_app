"use client";
import { InputFieldProps } from "./types";

import { useEffect, useState } from "react";

export default function InputField({ value, placeholder }: InputFieldProps) {
  const [localValue, setLocalValue] = useState(value?.toString() ?? "");

  useEffect(() => {
    setLocalValue(value?.toString() ?? "");
  }, [value]);

  return (
    <input
      type="number"
      value={localValue}
      placeholder={placeholder}
      onChange={(e) => setLocalValue(e.target.value)}
      className="border rounded px-3 py-2 w-full mt-4"
    />
  );
}
