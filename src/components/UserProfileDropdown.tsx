"use client"

import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { Avatar } from "./Avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

interface UserProfileDropdownProps {
  session: Session
}

export function UserProfileDropdown({ session }: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-2 py-2 rounded-md hover:bg-accent transition-colors"
      >
        <Avatar image={session.user?.image} name={session.user?.name} size="sm" />
        <div className="flex-1 text-left overflow-hidden">
          <p className="text-sm font-medium truncate">{session.user?.name}</p>
          <p className="text-xs text-muted-foreground truncate">
            {session.user?.email}
          </p>
        </div>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute bottom-full left-0 right-0 mb-1 bg-popover border border-border rounded-md shadow-lg z-50">
            <Link
              href="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </Link>

            <button
              onClick={async () => {
                setIsOpen(false)
                await signOut({ redirect: true, callbackUrl: "/sign-in" })
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-destructive/10 text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
