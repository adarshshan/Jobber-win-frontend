import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GrPlan } from "react-icons/gr";
import { RiSettings2Line } from "react-icons/ri";
import { FaList } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { VscListFlat } from "react-icons/vsc";

const AdminSideBar: React.FC = () => {

    const location = useLocation();

    const isActive = (path: any) => {
        return location.pathname === path
    };

    return (
        <>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-start p-2 mt-0 ms-0 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="text-xl"><VscListFlat /></span>

            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto border-2 bg-gray-50 dark:bg-gray-800">
                    <div className='text-3xl bg-neutral-200 p-3 font-bold'>
                        <h1>JobberWin</h1>
                    </div>
                    <ul className="space-y-2 font-medium mt-5">
                        <li>
                            <Link to='/admin/dashboard' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/users' className={`${isActive('/admin/users') && 'bg-gray-700 text-white'} flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <FaUsers />
                                <span className="ms-3">All Users</span>
                            </Link>
                        </li>
                        {/* <li>
                            <Link to='/admin/jobs' className={`${isActive('/admin/jobs') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <FaList />
                                <span className="ms-3">All Jobs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/recruiters' className={`${isActive('/admin/recruiters') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
                                <span className="ms-3">Recruiters</span>
                            </Link>
                        </li> */}
                        <li>
                            <Link to='/admin/reported-jobs' className={`${isActive('/admin/reported-jobs') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
                                <span className="ms-3">Reported Jobs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/reported-posts' className={`${isActive('/admin/reported-posts') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
                                <span className="ms-3">Reported Posts</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='/admin/subscription' className={`${isActive('/admin/subscription') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <GrPlan />
                                <span className="ms-3">Subscriptions</span>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to='/admin/settings' className={`${isActive('/admin/settings') && 'bg-gray-700 text-white'} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group`}>
                                <RiSettings2Line />
                                <span className="ms-3">Settings</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default AdminSideBar;
