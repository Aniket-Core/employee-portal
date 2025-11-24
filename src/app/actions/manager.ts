"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function reviewRequest(type: "LEAVE" | "WFH", id: string, status: "APPROVED" | "REJECTED", comment?: string) {
    const session = await auth()
    if (session?.user?.role !== "MANAGER") return { error: "Unauthorized" }

    try {
        if (type === "LEAVE") {
            await prisma.leaveRequest.update({
                where: { id },
                data: { status, managerComment: comment }
            })
        } else {
            await prisma.wFHRequest.update({
                where: { id },
                data: { status, managerComment: comment }
            })
        }
        revalidatePath("/manager/dashboard")
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}
