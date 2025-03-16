import Navbar from './components/navBar.tsx';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home.tsx';
import About from './pages/about.tsx';
import Login from './pages/login.tsx';
import Register from './pages/register.tsx';
import Contact from "./pages/contact.tsx";
import Shop from "./pages/shop.tsx";
import Cart from "./pages/cart.tsx";
import Profile from "./pages/profile.tsx";
import PrivateRoute from "./routes/privateRoute.tsx";
import Admin from "./pages/admin.tsx";
import UnauthorizedPage from "./pages/unauthorized.tsx";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path="/admin" element={<PrivateRoute role="admin"><Admin/></PrivateRoute>}/>
            </Routes>
        </>
    );
}

export default App;



