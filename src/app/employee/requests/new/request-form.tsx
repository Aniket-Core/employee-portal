"use client"

import { useState } from "react"
import { submitLeaveRequest, submitWFHRequest } from "@/app/actions/employee"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function RequestForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    async function handleLeaveSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        try {
            const result = await submitLeaveRequest(formData)
            if (result.error) toast.error(result.error)
            else {
                toast.success("Leave request submitted")
                router.push("/employee/dashboard")
            }
        } catch {
            toast.error("Error")
        } finally {
            setLoading(false)
        }
    }

    async function handleWFHSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        try {
            const result = await submitWFHRequest(formData)
            if (result.error) toast.error(result.error)
            else {
                toast.success("WFH request submitted")
                router.push("/employee/dashboard")
            }
        } catch {
            toast.error("Error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Tabs defaultValue="leave" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="leave">Apply for Leave</TabsTrigger>
                <TabsTrigger value="wfh">Work From Home</TabsTrigger>
            </TabsList>

            <TabsContent value="leave">
                <Card>
                    <CardHeader>
                        <CardTitle>Leave Application</CardTitle>
                        <CardDescription>Request time off from work.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLeaveSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input id="startDate" name="startDate" type="date" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input id="endDate" name="endDate" type="date" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea id="reason" name="reason" required placeholder="Vacation, Sick leave, etc." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="team">Team</Label>
                                    <Input id="team" name="team" required placeholder="Engineering" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="project">Current Project</Label>
                                    <Input id="project" name="project" required placeholder="Employee Portal" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>Submit Request</Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>

            <TabsContent value="wfh">
                <Card>
                    <CardHeader>
                        <CardTitle>WFH Application</CardTitle>
                        <CardDescription>Request to work from home.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleWFHSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" name="date" type="date" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reason">Reason</Label>
                                <Textarea id="reason" name="reason" required placeholder="Personal work, etc." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="team">Team</Label>
                                    <Input id="team" name="team" required placeholder="Engineering" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="project">Current Project</Label>
                                    <Input id="project" name="project" required placeholder="Employee Portal" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={loading}>Submit Request</Button>
                        </CardFooter>
                    </form>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
