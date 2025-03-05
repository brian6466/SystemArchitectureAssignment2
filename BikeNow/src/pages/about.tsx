import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-green-600">About Us</h1>
            <p className="mt-4 text-lg text-gray-700">This page provides information about our website and mission.</p>
            <Link to="/" className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Back to Home
            </Link>
        </div>
    );
}
