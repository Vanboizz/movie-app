import React from 'react'
import Navbar from '@/components/base/navbar'
import Footer from '@/components/base/footer'

const Layout = ({ children }) => {
    return (
        <div className='relative w-full'>
            <div className='flex items-start'>
                <div className='bg-gray h-full w-full top-0 fixed -z-10'></div>
                <Navbar />
                <main className='flex-1'>{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default Layout