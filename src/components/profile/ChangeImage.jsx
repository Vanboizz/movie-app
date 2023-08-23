import React from 'react'
import { FiUpload } from "react-icons/fi"
import Image from 'next/image'

const ChangeImage = (props) => {
    const { user, handleInputChange } = props

    return (
        <div className='px-4 col-span-1'>
            <p className='text-white mt-5 text-xl font-medium'>Profile Photo</p>
            <div className='flex flex-col items-center mt-4'>
                <div>
                    <span>
                        {
                            user.photoURL ? <Image src={user.photoURL} width={250} height={250} alt='avt' className='rounded-full object-cover' /> : null
                        }
                    </span>
                </div>
                <label htmlFor='upload-img' className='px-5 py-3 mt-6 rounded-full bg-[#333335] flex items-center gap-3 hover:bg-[#262628] transition duration-300 cursor-pointer'>
                    <FiUpload className='text-blue' size={24} />
                    <p className='text-white'>Upload new photo</p>
                </label>
                <input id='upload-img' onChange={handleInputChange} type='file' className='hidden' accept='image/*' />
                <div className='mt-8 text-center'>
                    <p className='text-white text-xl'>{user && user.displayName}</p>
                    <p className='text-lg mt-2 text-[#989898]'>There is no great genius without some touch of madness.</p>
                </div>
            </div>
        </div>
    )
}

export default ChangeImage