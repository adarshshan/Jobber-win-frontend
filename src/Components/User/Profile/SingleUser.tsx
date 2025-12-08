import { User } from '@nextui-org/react'
import React from 'react'
import { Link } from 'react-router-dom';

interface ISingleUserProps {
    name: string;
    description: string;
    imageUrl: string;
    id: string;
}
const SingleUser: React.FC<ISingleUserProps> = ({ id, name, description, imageUrl }) => {
    return (
        <>
            <div>
                <Link to={`/user/view-user-profile/${id}`}>
                    <User
                        name={name}
                        description={description}
                        avatarProps={{
                            src: imageUrl
                        }}
                    />
                </Link>
                <div className="flex justify-center">
                    <button className='border border-blue-500 text-blue-500 rounded-full px-3 py-1 text-sm mt-2'>Follow</button>
                </div>
            </div>
        </>
    )
}

export default SingleUser
