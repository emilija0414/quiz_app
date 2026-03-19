"use client";
import { HeroProps } from "./types";
import Button from "../button";

export default function Hero({ title, subtitle, image, buttons }: HeroProps) {
  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {subtitle && <p className="text-gray-500 mb-6">{subtitle}</p>}
      {image && <img src={image} alt="" className="mx-auto mb-6" />}
      <div className="flex justify-center gap-4">
        {buttons.map((btn, idx) => (
          <Button key={idx} label={btn.label} onClick={btn.onClick} />
        ))}
      </div>
    </div>
  );
}
