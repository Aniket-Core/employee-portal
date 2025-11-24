import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Home, CalendarOff } from "lucide-react"

export default async function AdminDashboard() {
    const totalEmployees = await prisma.user.count({
        where: { role: { not: "ADMIN" }, isApproved: true }
    })

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const wfhToday = await prisma.wFHRequest.count({
        where: {
            date: {
                gte: today,
                lt: tomorrow
            },
            status: "APPROVED"
        }
    })

    const leaveToday = await prisma.leaveRequest.count({
        where: {
            startDate: { lte: today },
            endDate: { gte: today },
            status: "APPROVED"
        }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalEmployees}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">WFH Today</CardTitle>
                        <Home className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{wfhToday}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
                        <CalendarOff className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{leaveToday}</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
