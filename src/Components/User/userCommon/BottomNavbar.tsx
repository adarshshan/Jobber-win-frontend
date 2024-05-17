import React from 'react'
import './css/style.css'

const BottomNavbar = () => {
    return (
        <div>

            <div className="sm:hidden fixed bottom-0 w-full px-7 bg-white shadow-lg rounded-2xl">
                <div className="flex">
                    <div className="flex-1 group">
                        <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-home text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Home</span>
                            </span>
                        </a>
                    </div>
                    <div className="flex-1 group">
                        <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-compass text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Explore</span>
                            </span>
                        </a>
                    </div>
                    <div className="flex-1 group">
                        <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-search text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Search</span>
                            </span>
                        </a>
                    </div>
                    <div className="flex-1 group">
                        <a href="#" className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500 border-b-2 border-transparent group-hover:border-indigo-500">
                            <span className="block px-1 pt-1 pb-2">
                                <i className="far fa-cog text-2xl pt-1 mb-1 block"></i>
                                <span className="block text-xs pb-1">Settings</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BottomNavbar
