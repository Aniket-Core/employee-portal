"use client"

import { useState } from "react"
import { approveUser } from "@/app/actions/admin"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ApproveButton({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(false)

    async function handleApprove() {
        setLoading(true)
        try {
            const result = await approveUser(userId)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success("User approved successfully")
            }
        } catch {
            toast.error("Failed to approve")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button onClick={handleApprove} disabled={loading} size="sm">
            {loading ? "Approving..." : "Approve"}
        </Button>
    )
}
