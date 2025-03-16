import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {ReactNode} from "react";
import UnauthorizedPage from "../pages/unauthorized.tsx";

interface ProtectedRouteProps {
    children: ReactNode;
    role?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children, role}) => {
    const {isAuthenticated, user} = useSelector((state: any) => state.auth);

    if (!isAuthenticated) {
        return <Navigate to="/login"/>;
    }

    if (role && user?.role !== role) {
        return <UnauthorizedPage/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
