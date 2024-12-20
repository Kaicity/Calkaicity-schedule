"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { useTheme } from "../context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="logo" className="size-10" />
        <h4 className="text-3xl font-semibold">
          Cal<span className="text-blue-500">kaicity</span>
        </h4>
      </Link>
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
      >
        {darkMode ? (
          <SunIcon className="w-6 h-6 text-yellow-500" />
        ) : (
          <MoonIcon className="w-6 h-6 text-gray-900" />
        )}
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
          {darkMode ? "Light" : "Dark"}
        </span>
      </button>
    </div>
  );
}
