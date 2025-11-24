"use client"

import { useState } from "react"
import { reviewRequest } from "@/app/actions/manager"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Check, X } from "lucide-react"

export default function RequestActions({ type, id }: { type: "LEAVE" | "WFH", id: string }) {
    const [loading, setLoading] = useState(false)

    async function handleReview(status: "APPROVED" | "REJECTED") {
        setLoading(true)
        try {
            const result = await reviewRequest(type, id, status)
            if (result.error) toast.error(result.error)
            else toast.success(`Request ${status.toLowerCase()}`)
        } catch {
            toast.error("Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex gap-2">
            <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleReview("APPROVED")} disabled={loading}>
                <Check className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleReview("REJECTED")} disabled={loading}>
                <X className="h-4 w-4" />
            </Button>
        </div>
    )
}
