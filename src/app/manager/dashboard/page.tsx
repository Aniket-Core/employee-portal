import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import RequestActions from "./request-actions"

export default async function ManagerDashboard() {
    const session = await auth()
    if (!session?.user?.id) return null

    const pendingLeaves = await prisma.leaveRequest.findMany({
        where: {
            user: { managerId: session.user.id },
            status: "PENDING"
        },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    })

    const pendingWFH = await prisma.wFHRequest.findMany({
        where: {
            user: { managerId: session.user.id },
            status: "PENDING"
        },
        include: { user: true },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Team Requests</h2>

            <Card>
                <CardHeader>
                    <CardTitle>Pending Leave Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Team/Project</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingLeaves.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="text-center">No pending requests</TableCell></TableRow>
                            ) : (
                                pendingLeaves.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.user.name}</TableCell>
                                        <TableCell>{req.startDate.toLocaleDateString()} - {req.endDate.toLocaleDateString()}</TableCell>
                                        <TableCell>{req.reason}</TableCell>
                                        <TableCell>{req.team} / {req.currentProject}</TableCell>
                                        <TableCell>
                                            <RequestActions type="LEAVE" id={req.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Pending WFH Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Employee</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Team/Project</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pendingWFH.length === 0 ? (
                                <TableRow><TableCell colSpan={5} className="text-center">No pending requests</TableCell></TableRow>
                            ) : (
                                pendingWFH.map(req => (
                                    <TableRow key={req.id}>
                                        <TableCell>{req.user.name}</TableCell>
                                        <TableCell>{req.date.toLocaleDateString()}</TableCell>
                                        <TableCell>{req.reason}</TableCell>
                                        <TableCell>{req.team} / {req.currentProject}</TableCell>
                                        <TableCell>
                                            <RequestActions type="WFH" id={req.id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
