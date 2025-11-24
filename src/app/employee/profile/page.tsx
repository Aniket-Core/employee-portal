import ChangePasswordForm from "./change-password-form"

export default function ProfilePage() {
    return (
        <div className="max-w-md mx-auto space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
            <ChangePasswordForm />
        </div>
    )
}
