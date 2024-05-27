import React, { useEffect } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { IoIosNotifications } from 'react-icons/io'
import { getMessaging, getToken } from "firebase/messaging";
import { messaging } from 'firbase';

interface IMiddleSideProps {

}
const requestPermission = async () => {
    try {
        const notification = await Notification.requestPermission()
        if (notification === 'granted') {
            const token = await getToken(messaging, { vapidKey: 'BE3Lk3jmqErj8G4_GJ8QPo7a4QhVry-VLuHY3tUlA3z65370KnOA9TcWCM50pbxgPQn5-OsbCvKb8KfWClyFPII' });
            console.log('Token generated : ', token);
        } else if (notification === 'denied') {
            alert(notification);
        } else {

        }
    } catch (error) {
        console.error('Error requesting notification permission:', error);
        alert('Error requesting notification permission');
    }
}

const MIddleSide: React.FC<IMiddleSideProps> = () => {



    useEffect(() => {

        requestPermission();
    }, []);

    return (
        <div className="md:col-span-6 shadow-lg bg-transparent min-h-[100px] rounded-lg">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
        </div>
    )
}

export default MIddleSide

interface INotificationProps {

}
const NotificationItem: React.FC<INotificationProps> = () => {
    return (
        <div className="flex w-full gap-4 p-3 shadow-lg mt-3 justify-between bg-white cursor-default">
            <IoIosNotifications className='text-5xl m-auto' />
            <p>your job application approved by the HR for the mern stack developer position</p>
            <HiDotsHorizontal className='text-3xl' />
        </div>
    )
}