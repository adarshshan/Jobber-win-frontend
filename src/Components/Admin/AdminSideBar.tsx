import React from 'react';
import { Link } from 'react-router-dom';

const AdminSideBar: React.FC = () => {

    return (
        <>
            <button
                data-drawer-target="sidebar-multi-level-sidebar"
                data-drawer-toggle="sidebar-multi-level-sidebar"
                aria-controls="sidebar-multi-level-sidebar"
                type="button"
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="sidebar-multi-level-sidebar"
                className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto border-2 bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
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
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.98 11H5V4.025c0-.554.448-.998.998-.998h.996a1 1 0 0 1 .996.998V9h8.987c.55 0 .993.448.993.998v1.004a1 1 0 0 1-.998.998Z" />
                                    <path d="M12 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h9.98a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-.993a.998.998 0 0 0-.996.998v6.002H6.98V2.027c0-.55.448-.998.998-.998h.996a1 1 0 0 1 .996.998V9h4.987c.55 0 .993.448.993.998v1.004a1 1 0 0 1-.998.998Z" />
                                </svg>
                                <span className="ms-3">All Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
                                <span className="ms-3">All Jobs</span>
                            </Link>
                        </li>
                        <li>
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
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
                        </li>
                        <li>
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
                                <span className="ms-3">Subscriptions</span>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link to='#' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 group">
                                <svg
                                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M21.5 1H18V0h-4v1H8V0H4v1H.5A.5.5 0 0 0 0 1.5v19a.5.5 0 0 0 .5.5h21a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5zM20 19H2V2h3v1h4V2h4v1h4V2h3v17Z" />
                                </svg>
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
