import { appRouter, logo, sidebarData } from '@/constants'
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserAuth } from '@/hooks/useAuth'
import { BiUserCircle } from 'react-icons/bi';


const CollapseNavbar = () => {
    const router = useRouter()
    const { user } = UserAuth()

    return (
        <div className='max-w-[80px] w-full flex flex-col items-center justify-between h-screen top-0 sticky py-8'>
            <div>
                <Image onClick={() => router.push(appRouter.home)} src={logo} width={40} height={40} alt="logo" />
            </div>
            <div className='mt-8 flex flex-col gap-7 text-[#989898]'>
                {
                    sidebarData.map((values) => (
                        values.items.map((value, index) => (
                            <div key={index} >
                                <Link
                                    href={value.path}
                                    className={router.pathname === value.path ?
                                        "text-blue transition duration-300" :
                                        ""
                                    }
                                >
                                    {value.icon}
                                </Link>
                            </div>
                        ))
                    ))
                }
            </div>
            <div className='text-[#989898] cursor-pointer'>
                {user && user.photoURL ? (
                    <Image
                        onClick={() => router.push(appRouter.profile)}
                        className="rounded-full "
                        src={user && user.photoURL}
                        width={28}
                        height={28}
                        alt="user"
                    />
                ) : (
                    <>
                        <BiUserCircle size={40} />
                    </>
                )}
            </div>
        </div>
    )
}

export default CollapseNavbar