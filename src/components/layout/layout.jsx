import React from 'react'
import Footer from '@/components/base/footer'
import { useRouter } from 'next/router'
import { appRouter } from '@/constants'
import CollapseNavbar from '../base/navbar/navbarLeft/CollapseNavbar'
import FullNavbar from '@/components/base/navbar/navbarLeft/FullNavbar'

const Layout = ({ children }) => {
    const router = useRouter()

    return (
        <div className='relative w-full'>
            <div className='flex items-start'>
                <div className='bg-gray h-full w-full top-0 fixed -z-10'></div>
                {
                    router.asPath.includes(appRouter.explore) || router.asPath.includes(router.query.movieid) ? <CollapseNavbar /> : <FullNavbar />
                }
                <main className='flex-1'>{children}</main>
            </div>
            <Footer />
        </div>
    )
}

export default Layout