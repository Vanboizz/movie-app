import React from 'react'
import Link from 'next/link'
import { BsFacebook, BsGithub } from "react-icons/bs"

const Footer = () => {
    return (
        <div className='bg-[#333335] text-white flex justify-between items-center py-3 px-4 mt-3'>
            <p className='flex gap-2'>
                <span>Copyright_vanboizz</span>
                <span> © 16/7/2023</span>
            </p>
            <div className='flex gap-2'>
                <p>Contact me:</p>
                <div className='flex gap-2'>
                    <Link href="https://www.facebook.com/dv142">
                        <BsFacebook size={24} />
                    </Link>
                    <Link href="https://github.com/Vanboizz">
                        <BsGithub size={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer