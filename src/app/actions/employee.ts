"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const requestSchema = z.object({
    reason: z.string().min(1),
    team: z.string().min(1),
    project: z.string().min(1),
})

export async function submitLeaveRequest(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const data = requestSchema.safeParse({
        reason: formData.get("reason"),
        team: formData.get("team"),
        project: formData.get("project"),
    })

    if (!data.success) return { error: "Invalid data" }

    const startDate = new Date(formData.get("startDate") as string)
    const endDate = new Date(formData.get("endDate") as string)

    try {
        await prisma.leaveRequest.create({
            data: {
                userId: session.user.id,
                startDate,
                endDate,
                reason: data.data.reason,
                team: data.data.team,
                currentProject: data.data.project,
            }
        })
        revalidatePath("/employee/dashboard")
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}

export async function submitWFHRequest(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const data = requestSchema.safeParse({
        reason: formData.get("reason"),
        team: formData.get("team"),
        project: formData.get("project"),
    })

    if (!data.success) return { error: "Invalid data" }

    const date = new Date(formData.get("date") as string)

    try {
        await prisma.wFHRequest.create({
            data: {
                userId: session.user.id,
                date,
                reason: data.data.reason,
                team: data.data.team,
                currentProject: data.data.project,
            }
        })
        revalidatePath("/employee/dashboard")
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}

export async function changePassword(password: string) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        })
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}
