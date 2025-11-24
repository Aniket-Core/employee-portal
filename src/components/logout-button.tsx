"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
    return (
        <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
        >
            Logout
        </Button>
    )
}
