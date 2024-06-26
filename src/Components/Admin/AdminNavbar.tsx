import React from 'react'
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { logout } from '../../Api/admin';
import { adminLogout } from '../../app/slice/AuthSlice';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'

const AdminNavbar = () => {

    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            Swal.fire({
                title: "Logout ?",
                text: "",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout"
            }).then((result) => {
                if (result.isConfirmed) {
                    logout().then(()=>console.log('logout'));
                    dispatch(adminLogout());
                    toast.success("You are logged out!")
                    Swal.fire({
                        title: "Logged Out!",
                        text: "",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.log(error as Error);
        }
    }
    return (
        <div>
            <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded hidden">
                                <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                                </svg>
                                <svg id="toggleSidebarMobileClose" className="w-6 h-6 hidden" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                </svg>
                            </button>
                            <a href="#" className="text-xl font-bold flex items-center lg:ml-2.5">
                                <img src="https://demo.themesberg.com/windster/images/logo.svg" className="h-6 mr-2" alt="Windster Logo" />
                                <span className="self-center whitespace-nowrap">JobberWin</span>
                            </a>
                            <form action="#" method="GET" className="hidden lg:block lg:pl-32">
                                <label htmlFor="topbar-search" className="sr-only">Search</label>
                                <div className="mt-1 relative lg:w-64">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 p-2.5" placeholder="Search" />
                                </div>
                            </form>
                        </div>
                        <div className="flex items-center">
                            <span onClick={handleLogout} className='text-3xl text-red-600'><IoMdLogOut /></span>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default AdminNavbar
