"use client";

import Image from "next/image";

interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <h1 className="flex justify-center items-center gap-x-2">
        <Image
          className="h-10 w-auto"
          src="/munus-logo.jpg"
          alt="Munus Logo"
          width={60}
          height={60}
        />
        <span className="text-3xl font-bold text-gray-900 font-serif">
          Munus Hub
        </span>
      </h1>
      <p className="text-muted-foreground text-lg text-center">{label}</p>
    </div>
  );
}
