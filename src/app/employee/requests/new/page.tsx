import RequestForm from "./request-form"

export default function NewRequestPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">New Request</h2>
            <RequestForm />
        </div>
    )
}
