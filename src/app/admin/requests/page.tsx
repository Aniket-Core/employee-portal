import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ApproveButton from "./approve-button"

export default async function AccountRequestsPage() {
    const requests = await prisma.user.findMany({
        where: { isApproved: false },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Account Requests</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Pending Requests</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No pending requests</TableCell>
                                </TableRow>
                            ) : (
                                requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell>{request.name}</TableCell>
                                        <TableCell>{request.email}</TableCell>
                                        <TableCell>{request.createdAt.toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <ApproveButton userId={request.id} email={request.email} />
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
