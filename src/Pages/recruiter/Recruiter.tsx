import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Sidebar = lazy(() => import('Components/Recruiter/Sidebar'));
const Header = lazy(() => import('Components/Recruiter/Header'))




const Recruiter: React.FC = () => {
    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar />
                <div className="w-full min-h-[500px] ms-1">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 sm:col-span-9 mt-20 text-black p-5">
                            <Outlet />
                        </div>
                        <div className="col-span-12 sm:col-span-3 mt-20">  </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Recruiter