"use client"

import { useState } from "react"
import { changePassword } from "@/app/actions/employee"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const newPassword = formData.get("newPassword") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match")
            setLoading(false)
            return
        }

        try {
            const result = await changePassword(newPassword)
            if (result.error) toast.error(result.error)
            else {
                toast.success("Password changed successfully")
                e.currentTarget.reset()
            }
        } catch {
            toast.error("Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" name="newPassword" type="password" required minLength={6} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input id="confirmPassword" name="confirmPassword" type="password" required minLength={6} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" disabled={loading}>Update Password</Button>
                </CardFooter>
            </form>
        </Card>
    )
}
