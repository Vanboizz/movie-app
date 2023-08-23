import React from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineSend } from "react-icons/ai"

const ChangeEmail = (props) => {
    const { hiddenEmail, user, esc, changeEmail, email, showEmail, setEmail } = props

    return (
        <>
            <p className='text-white text-lg'>Email</p>
            {
                !hiddenEmail ?
                    <div className='flex justify-between'>
                        <p className='text-[#989898]'>{user && user.email}</p>
                        <button onClick={showEmail}>
                            <BsPencilSquare className='text-[#989898] hover:text-blue transition duration-300' size={20} />
                        </button>
                    </div> :
                    <div>
                        <form action="" className='flex justify-between gap-48 mt-1'>
                            <input type="email" className='outline-none rounded-md selection:text-blue py-1 px-2 w-full bg-[#333335] text-[#989898]' value={email}
                                onChange={(e) => setEmail(e.target.value)
                                } required />
                            <button onClick={changeEmail}>
                                <AiOutlineSend className='text-[#989898] hover:text-blue transition du\' size={20} />
                            </button>
                        </form>
                        {!esc && <p className='text-sm mt-1 text-[#989898]'>Press Esc to cancel</p>}
                    </div>
            }
        </>
    )
}

export default ChangeEmail