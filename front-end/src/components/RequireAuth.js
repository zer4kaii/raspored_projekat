import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import { useEffect } from "react";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    

    return (
        auth?.roles?.find(role => {
            return allowedRoles?.includes(role)
        })
            ? <Outlet />
            : auth?.korisnicko_ime
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace /> 
    );
    // return (
    //     auth?.korisnicko_ime
    //     ? <Outlet/>
    //     : <Navigate to="/login" state={{ from: location }} replace /> 
    // )
}

export default RequireAuth;