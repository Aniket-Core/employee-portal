import Link from "next/link"
import { Button } from "@/components/ui/button"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    if (session.user.role === "ADMIN") redirect("/admin/dashboard")
    if (session.user.role === "MANAGER") redirect("/manager/dashboard")
    if (session.user.role === "EMPLOYEE") redirect("/employee/dashboard")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      </div>

      <div className="relative flex place-items-center flex-col gap-8">
        <h1 className="text-6xl font-bold text-white tracking-tight">
          Employee Portal
        </h1>
        <p className="text-xl text-indigo-100">
          Manage your work, leaves, and team efficiently.
        </p>

        <div className="flex gap-4">
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white/10">
            <Link href="/register">Request Access</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
