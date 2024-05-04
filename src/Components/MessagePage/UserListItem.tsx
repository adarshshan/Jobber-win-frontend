import React from 'react'

interface IUserListItemProps {

}
const UserListItem: React.FC<IUserListItemProps> = () => {
    return (
        <>
            <div className="flex justify-between p-2  bg-white m-1 rounded-sm">
                <div className="flex justify-start">
                    <img className='w-14 h-14 rounded-full' src="http://res.cloudinary.com/dnn1ree80/image/upload/v1713962983/ypkk1scqoxgubcfgpymk.jpg" alt="" />
                    <div className='mt-1 ms-2 font-normal'>
                        <h3 className=' text-lg'>Adarsh C</h3>
                        <p>Hello how are you ?</p>
                    </div>

                </div>
                <p>10.35</p>
            </div>
        </>
    )
}

export default UserListItem
