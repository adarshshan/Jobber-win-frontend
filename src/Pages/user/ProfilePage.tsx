import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getProfile } from '../../Api/user';

interface UserData {
    _id?: string;
    name?: string;
    email?: string;
    isBlocked?: boolean;
    role?: string;
}

const ProfilePage = () => {
    const [profile, setProfile] = useState<UserData | undefined>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('ehlloo');
                const response = await getProfile();
                if (response) setProfile(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, [])


    return (
        <div>
            <h1>User Profile</h1>
            {profile && (
                <div>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <p>Role: {profile.role}</p>
                    <p>Blocked: {profile.isBlocked ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    )
}

export default ProfilePage
