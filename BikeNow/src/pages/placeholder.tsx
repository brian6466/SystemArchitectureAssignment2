interface PlaceholderPageProps {
    title: string;
    description?: string;
}

export default function PlaceholderPage({title, description}: PlaceholderPageProps) {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
            <h1 className="text-4xl font-bold text-gray-900">{title}</h1>

            <div className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded-md text-sm">
                Placeholder Page - Not Implemented
            </div>

            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
                {description ||
                    "This page is a placeholder and does not need to be implemented for the Authentication/Authorization module. It is included for structure only."}
            </p>
        </div>
    );
}
