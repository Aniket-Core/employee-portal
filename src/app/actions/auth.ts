"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
})

export async function registerUser(formData: FormData) {
    const data = registerSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!data.success) {
        return { error: "Invalid data" }
    }

    const { name, email, password } = data.data

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return { error: "User already exists" }
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: "EMPLOYEE",
                isApproved: false,
            },
        })

        return { success: true }
    } catch (error) {
        return { error: "Something went wrong" }
    }
}
