"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Button from "../button";
import { HeaderProps } from "./types";

const Header: FC<HeaderProps & { color?: string }> = ({
  title,
  backUrl,
  nextUrl,
  color,
  nextDisabled,
}) => {
  const router = useRouter();

  return (
    <header className="flex w-full items-center justify-between p-4 bg-white shadow-lg border border-transparent">
      <div>
        {backUrl && (
          <Button
            label="Back"
            onClick={() => router.push(backUrl)}
            variant="secondary"
          />
        )}
      </div>

      <span
        className="text-xl text-white font-bold text-center rounded inline-block px-4 py-2"
        style={{ backgroundColor: color }}
      >
        {title}
      </span>

      <div>
        {nextUrl && (
          <Button
            label="Next"
            onClick={() => router.push(nextUrl)}
            variant="primary"
            color={color}
            disabled={nextDisabled}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
