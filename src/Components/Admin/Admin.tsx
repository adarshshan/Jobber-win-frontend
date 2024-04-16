import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminFooter from './AdminFooter';
import AdminSideBar from './AdminSideBar';
import { Outlet } from 'react-router-dom';

const Admin: React.FC = () => {
    return (
        <>
            <div>
                <AdminNavbar />
                <div className="flex overflow-hidden bg-white pt-16">
                    <AdminSideBar />
                    <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">

                        <Outlet />
                        {/* contents */}


                        <AdminFooter />
                    </div>
                </div>
                <script async defer src="https://buttons.github.io/buttons.js"></script>
                <script src="https://demo.themesberg.com/windster/app.bundle.js"></script>
            </div>
        </>
    )
}

export default Admin;
