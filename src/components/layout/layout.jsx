import React from 'react'
import Navbar from '@/components/base/navbar'
import Footer from '@/components/base/footer'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default Layout