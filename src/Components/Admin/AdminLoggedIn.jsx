import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/store";


const AdminLoggedIn = () => {

    const { adminData } = useAppSelector((state) => state.auth);
    if (!adminData) {
        return <Navigate to='/admin-login' />
    } else {
        return <Outlet />
    }

}

export default AdminLoggedIn;