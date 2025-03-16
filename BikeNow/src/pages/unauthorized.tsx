interface UnauthorizedPageProps {
    message?: string;
}

export default function UnauthorizedPage({message}: UnauthorizedPageProps) {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold text-red-700">Access Denied</h1>

            <div className="mt-2 bg-red-600 text-white px-4 py-1 rounded-md text-sm">
                Unauthorized Access
            </div>

            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                {message || "You do not have permission to access this page."}
            </p>
        </div>
    );
}
