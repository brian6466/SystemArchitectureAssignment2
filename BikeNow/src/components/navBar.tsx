import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {AppDispatch, RootState} from '../app/store';
import {logoutUser} from '../features/auth/authSlice';
import {useNavigate} from 'react-router-dom';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {useState} from 'react';

export default function Navbar() {
    const {isAuthenticated, user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [showRole, setShowRole] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate("/login");
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-gray-900 p-4 shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link style={{color: "white"}} to="/" className="text-2xl font-bold text-white">
                    BikeNow
                </Link>

                <div className="hidden md:flex space-x-6">
                    <Link style={{color: "white"}} to="/shop" className="hover:text-gray-400 text-white">Shop</Link>
                    <Link style={{color: "white"}} to="/about" className="hover:text-gray-400 text-white">About</Link>
                    <Link style={{color: "white"}} to="/contact"
                          className="hover:text-gray-400 text-white">Contact</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/cart" className="relative">
                        <FaShoppingCart className="text-xl text-white hover:text-gray-400"/>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <div className="relative">
                                <Link
                                    to="/profile"
                                    onMouseEnter={() => setShowRole(true)}
                                    onMouseLeave={() => setShowRole(false)}
                                >
                                    <FaUser className="text-xl text-white hover:text-gray-400 cursor-pointer"/>
                                </Link>

                                {showRole && user?.role && (
                                    <div
                                        className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-3 py-1 rounded-md shadow-md">
                                        Role: {user.role}
                                    </div>
                                )}
                            </div>

                            {user?.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition text-lg font-semibold no-underline"
                                    style={{color: "white"}}
                                >
                                    Admin
                                </Link>
                            )}


                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
                            <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
