import React from 'react'
import { AiOutlineDelete } from "react-icons/ai"

const ModalConfirmDeleteAccount = (props) => {
    const { setModalConfimDelete, setModalConfirmPassword } = props

    return (
        <div className='z-10 fixed min-h-[100px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-[#333335] rounded-md px-3 py-5 text-center text-zinc shadow-md'>
            <div className='mx-auto mb-7 h-16 w-16 rounded-full border-[3px] border-[#BD3F40]'>
                <AiOutlineDelete size={44} className='text-[#BD3F40] inline-block mt-1' />
            </div>
            <p className='text-white text-xl font-medium mb-4'>You are about to delete this account</p>
            <p className='mb-1'>This will remove your account and cannot recover</p>
            <p>Are you sure?</p>
            <div className='flex mt-8 justify-end'>
                <button className='px-4 py-1 rounded-md text-white hover:brightness-75 transition duration-300' onClick={() => setModalConfimDelete(false)}>Cancel</button>
                <button className='px-5 rounded-md text-white bg-[#BD3F40] hover:bg-red-600 transition duration-300' onClick={() => {
                    setModalConfimDelete(false);
                    setModalConfirmPassword(true)
                }}>Yes</button>
            </div>
        </div>
    )
}

export default ModalConfirmDeleteAccount