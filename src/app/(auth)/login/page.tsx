import LoginForm from "./login-form"

export default function LoginPage() {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Or{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        request an account
                    </a>
                </p>
            </div>
            <LoginForm />
        </div>
    )
}
