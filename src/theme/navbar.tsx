"use client";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Circle } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Navibar({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  return (
    <main className="flex flex-col">
      <div className="flex h-16 items-center px-6 bg-pink-600">
        <Link href={`/`}>
          <Image src={Logo} alt="logo" className="mx-10" />
        </Link>
        <Circle className="h-[.6rem] w-[.6rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {children}
    </main>
  );
}
