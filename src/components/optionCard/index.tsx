"use client";
import { OptionCardProps } from "./types";

export default function OptionCard({
  label,
  value,
  image,
  selected,
  onClick,
  selectedColor,
}: OptionCardProps & { selectedColor?: string }) {
  const baseClass =
    "w-full mb-3 p-3 border rounded flex items-center gap-3 cursor-pointer";

  const isSelected = (() => {
    if (typeof selected === "boolean") return selected;
    if (Array.isArray(selected)) return (selected as any[]).includes(value);
    if (selected == null) return false;
    return String(selected) === String(value);
  })();

  const bgUtility = isSelected && !selectedColor ? "bg-black" : "";
  const textUtility = isSelected ? "text-white" : "text-inherit";
  const hoverUtility = !isSelected ? "hover:bg-gray-100" : "";

  const style =
    isSelected && selectedColor
      ? { backgroundColor: selectedColor, color: "#fff" }
      : undefined;

  return (
    <div
      className={`${baseClass} ${bgUtility} ${textUtility} ${hoverUtility}`}
      onClick={() => onClick(value)}
      data-selected={isSelected ? "true" : "false"}
      data-selected-prop={String(selected ?? "")}
      style={style}
    >
      {image && (
        <img src={image} alt="" className="w-10 h-10 rounded object-cover" />
      )}
      <span>{label}</span>
    </div>
  );
}
