import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default async function EmployeeDashboard() {
    const session = await auth()
    if (!session?.user?.id) return null

    const leaves = await prisma.leaveRequest.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 5
    })

    const wfh = await prisma.wFHRequest.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 5
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">My Dashboard</h2>
                <Button asChild>
                    <Link href="/employee/requests/new">New Request</Link>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Leave Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Dates</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comment</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {leaves.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={req.status === "APPROVED" ? "default" : req.status === "REJECTED" ? "destructive" : "secondary"}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{req.managerComment || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent WFH Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Comment</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {wfh.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.date.toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={req.status === "APPROVED" ? "default" : req.status === "REJECTED" ? "destructive" : "secondary"}>
                                                {req.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{req.managerComment || "-"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
