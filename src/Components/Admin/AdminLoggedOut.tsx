import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../app/store";


const AdminLoggedOut = () => {

    const { adminData } = useAppSelector((state) => state.auth);
    if (adminData) {
        return <Navigate to='/admin/users' />
    } else {
        return <Outlet />
    }

}

export default AdminLoggedOut;