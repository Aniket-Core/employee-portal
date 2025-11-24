import RegisterForm from "./register-form"

export default function RegisterPage() {
    return (
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                    Request an Account
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in
                    </a>
                </p>
            </div>
            <RegisterForm />
        </div>
    )
}
