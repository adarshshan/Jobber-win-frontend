import React from 'react'
import './css/style.css'
import { Link } from 'react-router-dom'

const BottomNavbar = () => {
    return (
        <div>

            <div className="sm:hidden fixed bottom-0 w-full  bg-white shadow-lg rounded-2xl">
                <div className="flex">
                    <div className="flex-1 group">
                        <Link to='/user/home' className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Home</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link to='/user/my-network' className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-compass text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Network</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link to='/user/find-jobs' className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Jobs</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link to='/user/message' className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-text text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Messaging</span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex-1 group">
                        <Link to='/user/notifications' className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-bell text-2xl pt-1 mb-1 me-4 block"></i>
                                <span className="block text-xs pb-1 me-4">Notifications</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BottomNavbar
