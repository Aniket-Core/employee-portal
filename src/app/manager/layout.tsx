import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import LogoutButton from "@/components/logout-button"

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()

    if (session?.user?.role !== "MANAGER") {
        redirect("/")
    }

    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b bg-white dark:bg-gray-950">
                <div className="flex h-16 items-center px-4 gap-4">
                    <h1 className="text-xl font-bold">Manager Portal</h1>
                    <nav className="flex items-center gap-4 ml-8">
                        <Link href="/manager/dashboard" className="text-sm font-medium hover:underline">Dashboard</Link>
                    </nav>
                    <div className="ml-auto flex items-center gap-4">
                        <span className="text-sm text-gray-500">{session.user.email}</span>
                        <LogoutButton />
                    </div>
                </div>
            </header>
            <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
                {children}
            </main>
        </div>
    )
}
