import React from 'react'
import { Outlet } from 'react-router-dom'

function LandingPage() {
    return (
        <div>
            <h1>This is Landing page...</h1>
            <Outlet />
        </div>
    )
}

export default LandingPage
