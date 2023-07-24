import { UserAuth } from '@/hooks/useAuth'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import React, { useRef } from 'react'

const Modal = (props) => {
    // const { modal, setModal } = props
    const { user } = UserAuth()
    const passwordRef = useRef()

    const handleReauthetication = async (e) => {
        e.preventDefault()
        // setModal(false)
        const credential = EmailAuthProvider.credential(user?.email, passwordRef.current.value)
        try {
            // await reauthenticateWithCredential(user, credential)
            console.log("success");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form className='z-10 fixed min-h-[230px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
        bg-[#333335] rounded-md px-3 py-2 w-[500px]'>
            <p className='text-white font-medium mb-6 text-lg text-center'>Type your password again to reauthenticate</p>
            <input type="password" ref={passwordRef} className='bg-[#49494B] py-3 rounded-md px-5 text-white mb-4 w-full outline-none' placeholder='Type your password...' />
            <div className='absolute left-1/2 -translate-x-1/2 '>
                <button onClick={handleReauthetication} className='px-6 py-2 bg-[#5B5B5E] rounded-xl text-white'>Continue</button>
            </div>
        </form>
    )
}

export default Modal