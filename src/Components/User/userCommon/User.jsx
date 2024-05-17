import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import BottomNavbar from './BottomNavbar';

const User = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <BottomNavbar />
        </>
    )
}

export default User
