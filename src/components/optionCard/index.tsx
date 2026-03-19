"use client";
import { OptionCardProps } from "./types";

export default function OptionCard({
  label,
  value,
  image,
  selected,
  onClick,
}: OptionCardProps) {
  const baseClass =
    "w-full mb-3 p-3 border rounded flex items-center gap-3 cursor-pointer";
  const selectedClass = selected ? "bg-black text-white" : "hover:bg-gray-100";

  return (
    <div
      className={`${baseClass} ${selectedClass}`}
      onClick={() => onClick(value)}
    >
      {image && (
        <img src={image} alt="" className="w-10 h-10 rounded object-cover" />
      )}
      <span>{label}</span>
    </div>
  );
}
