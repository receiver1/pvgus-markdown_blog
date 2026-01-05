"use client"

import { Github, Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./button"
import { ButtonGroup } from "./button-group"

export function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-5 md:px-0 flex h-14 items-center justify-between">
        {/* Site title - clickable to return to home */}
        <Link href="/" className="flex items-center space-x-3">
          <Image src="./logo.svg" alt="vmpblog" width="32" height="32" />
          <span className="font-bold text-lg">vmpblog</span>
        </Link>

        <div className="flex items-center space-x-4">
          {/* GitHub link */}
          <Button variant="secondary" asChild>
            <Link
              href="https://github.com/receiver1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
          </Button>

          {/* Theme toggle */}
          <ButtonGroup className="bg-primary/10 rounded-md">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("light")}
              className={theme === "light" ? "bg-accent" : ""}
              aria-label="Light theme"
            >
              <Sun className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "bg-accent" : ""}
              aria-label="Dark theme"
            >
              <Moon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme("system")}
              className={theme === "system" ? "bg-accent" : ""}
              aria-label="System theme"
            >
              <Monitor className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </nav>
  )
}