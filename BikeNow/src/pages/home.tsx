import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to the Home Page</h1>
            <p className="mt-4 text-lg text-gray-700">This is the main landing page of our website.</p>
            <Link to="/about" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Go to About Page
            </Link>
        </div>
    );
}
