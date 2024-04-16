import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/store";


const UserLoggedIn = () => {
    const { userData } = useAppSelector((state) => state.auth);
    console.log(userData)
    if (!userData) {
        return <Navigate to='/' />
    } else {
        return <Outlet />
    }
}

export default UserLoggedIn;