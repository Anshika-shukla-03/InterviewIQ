import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className="min-h-screen bg-[#f9f9f9] w-full">
            <Navbar />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout
