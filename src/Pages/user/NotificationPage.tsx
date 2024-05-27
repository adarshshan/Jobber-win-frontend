import LeftSide from 'Components/User/Notifications/LeftSide'
import MIddleSide from 'Components/User/Notifications/MIddleSide'
import RightSide from 'Components/User/Notifications/RightSide'
import React from 'react'

const NotificationPage: React.FC = () => {
    return (
        <>
            <div className="grid md:grid-cols-12 gap-5 min-h-[150px] py-5 bg-blue-50 container">
                <LeftSide />
                <MIddleSide />
                <RightSide />
            </div>
        </>
    )
}

export default NotificationPage;
