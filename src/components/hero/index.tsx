"use client";
import { HeroProps } from "./types";
import Button from "../button";

export default function Hero({
  title,
  image,
  buttons,
  color,
}: HeroProps & { color?: string }) {
  return (
    <div className="text-center flex flex-col md:flex-row items-center p-8 gap-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{title}</h1>

        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
          {buttons.map((button, idx) => (
            <Button
              key={idx}
              label={button.label}
              onClick={button.onClick}
              color={button.color || color}
            />
          ))}
        </div>
      </div>

      {image && (
        <img
          src={image}
          alt=""
          className="mx-auto md:mx-0 w-100 h-100 object-contain"
        />
      )}
    </div>
  );
}
