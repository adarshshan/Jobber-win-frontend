import React from 'react'
import { Link } from 'react-router-dom'
interface IHeaderProps {

}
const Header: React.FC<IHeaderProps> = () => {
    return (
        <>
            <div className="flex justify-between fixed top-0 left-0 p-2 w-full bg-blue-400 min-h-[80px] z-20">
                <h1 className='text-3xl font-bold mt-2 ms-2'>JobberWin</h1>
                <Link to='/user/home'>
                    <button className="text-2xl px-4 border border-yellow-500 hover:bg-yellow-300 rounded-full mt-2 p-2">Go Back To home</button>
                </Link>
            </div>
        </>
    )
}

export default Header
