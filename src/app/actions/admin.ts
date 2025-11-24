"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import bcrypt from "bcryptjs"

export async function approveUser(userId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") {
        return { error: "Unauthorized" }
    }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isApproved: true }
        })

        revalidatePath("/admin/requests")
        revalidatePath("/admin/employees")

        return { success: true }
    } catch (error) {
        return { error: "Failed to approve user" }
    }
}

export async function promoteToManager(userId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role: "MANAGER" }
        })
        revalidatePath("/admin/employees")
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}

export async function assignManager(userId: string, managerId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { managerId }
        })
        revalidatePath("/admin/employees")
        return { success: true }
    } catch {
        return { error: "Failed" }
    }
}

export async function resetUserPassword(userId: string) {
    const session = await auth()
    if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

    const newPassword = Math.random().toString(36).slice(-8)
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        })

        console.log(`\n=== RESET PASSWORD FOR USER ${userId} ===`)
        console.log(`New Password: ${newPassword}`)
        console.log(`=======================================\n`)

        return { success: true, password: newPassword }
    } catch {
        return { error: "Failed" }
    }
}
