"use client"

import { useState } from "react"
import { promoteToManager, assignManager, resetUserPassword } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface EmployeeActionsProps {
    employeeId: string
    managers: { id: string; name: string | null }[]
}

export default function EmployeeActions({ employeeId, managers }: EmployeeActionsProps) {
    const [loading, setLoading] = useState(false)
    const [selectedManager, setSelectedManager] = useState("")

    async function handlePromote() {
        setLoading(true)
        try {
            const result = await promoteToManager(employeeId)
            if (result.error) toast.error(result.error)
            else toast.success("Promoted to Manager")
        } catch {
            toast.error("Failed")
        } finally {
            setLoading(false)
        }
    }

    async function handleAssign() {
        if (!selectedManager) return
        setLoading(true)
        try {
            const result = await assignManager(employeeId, selectedManager)
            if (result.error) toast.error(result.error)
            else toast.success("Manager assigned")
        } catch {
            toast.error("Failed")
        } finally {
            setLoading(false)
        }
    }

    async function handleResetPassword() {
        setLoading(true)
        try {
            const result = await resetUserPassword(employeeId)
            if (result.error) toast.error(result.error)
            else {
                toast.success(`Password reset to: ${result.password}`)
                // Also show in an alert for persistence
                alert(`New Password: ${result.password}`)
            }
        } catch {
            toast.error("Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePromote} disabled={loading}>
                Promote
            </Button>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Assign Manager</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Assign Manager</DialogTitle>
                        <DialogDescription>Select a manager for this employee.</DialogDescription>
                    </DialogHeader>
                    <Select onValueChange={setSelectedManager}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Manager" />
                        </SelectTrigger>
                        <SelectContent>
                            {managers.map(m => (
                                <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <DialogFooter>
                        <Button onClick={handleAssign} disabled={loading || !selectedManager}>Assign</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Button variant="destructive" size="sm" onClick={handleResetPassword} disabled={loading}>
                Reset Password
            </Button>
        </div>
    )
}
