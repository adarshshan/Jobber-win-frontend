import { User } from '@nextui-org/react'
import React from 'react'

interface ISingleUserProps {
    name: string;
    description: string;
    imageUrl: string;
}
const SingleUser: React.FC<ISingleUserProps> = ({ name, description, imageUrl }) => {
    return (
        <>
            <div>
                <User
                    name={name}
                    description={description}
                    avatarProps={{
                        src: imageUrl
                    }}
                />
                <div className="flex justify-center">
                    <button className='outline rounded-xl border-blue-100 px-5 mt-2'>Follow</button>
                </div>
            </div>
        </>
    )
}

export default SingleUser
