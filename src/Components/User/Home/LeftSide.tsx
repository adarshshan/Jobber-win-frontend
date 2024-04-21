import React from 'react'
import ProfileCard from './ProfileCard'

interface ILeftSideProps {

}
const LeftSide: React.FC<ILeftSideProps> = () => {

    return (
        <>
            <div className="sm:col-span-3 shadow-lg text-lg min-h-[100px] bg-transparent rounded-lg">
                <ProfileCard />
            </div>
        </>
    )
}

export default LeftSide
