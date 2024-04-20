
import React, { useEffect, useState } from "react";
import { getProfile } from "../../Api/user";


interface UserData {
    _id?: string;
    name?: string;
    email?: string;
    isBlocked?: boolean;
    role?: string;
    profile_picture: string;
}

const ProfilePage: React.FC = () => {
    const [userProfile, setUserProfile] = useState<UserData | null>(null);

    // const { user } = useAppSelector((state) => state.auth)

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ehlloo');
                const response = await getProfile();
                if (response) setUserProfile(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="grid gap-3 sm:grid-cols-12 py-5 container">
                <div className="sm:col-span-8 min-h-[100px] rounded-lg shadow-lg bg-slate-200"></div>
                <div className="sm:col-span-4 min-h-[100px] rounded-lg shadow-lg bg-slate-200"></div>
            </div>
        </>
    );
};

export default ProfilePage