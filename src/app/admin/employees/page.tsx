import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmployeeActions from "./employee-actions"

export default async function EmployeesPage() {
    const employees = await prisma.user.findMany({
        where: { role: { not: "ADMIN" }, isApproved: true },
        include: { manager: true },
        orderBy: { name: 'asc' }
    })

    const managers = await prisma.user.findMany({
        where: { role: "MANAGER" },
        orderBy: { name: 'asc' }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
            <Card>
                <CardHeader>
                    <CardTitle>All Employees</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {employees.map((employee: any) => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>{employee.role}</TableCell>
                                    <TableCell>{employee.manager?.name || "-"}</TableCell>
                                    <TableCell>
                                        <EmployeeActions employeeId={employee.id} managers={managers} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
