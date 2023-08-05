import React from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { AiOutlineSend } from "react-icons/ai"

const ChangeName = (props) => {
    const { user, setFirstName, setLastName, hiddenName, changeName, esc, firstName, lastName, showName } = props

    return (
        <>
            <p className='text-white text-lg'>Name</p>
            {
                !hiddenName ?
                    <div className='flex justify-between mt-1'>
                        <p className='text-[#989898]'>{user && user.displayName}</p>
                        <button onClick={showName}>
                            <BsPencilSquare className='text-[#989898] hover:text-blue transition du\' size={20} />
                        </button>
                    </div> :
                    <>
                        <form action="" className='flex justify-between mt-1'>
                            <div className='flex gap-3'>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className='selection:text-blue outline-none rounded-md py-1 px-2 w-full text-zinc bg-[#333335]' placeholder='First name' required />
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className='selection:text-blue outline-none rounded-md py-1 px-2 w-full text-zinc bg-[#333335]' placeholder='Last name' required />
                            </div>
                            <button>
                                <AiOutlineSend onClick={changeName} className='text-[#989898] hover:text-blue transition du\' size={20} />
                            </button>
                        </form>
                        {
                            !esc && <p className='text-sm mt-1 text-[#989898]'>Press Esc to cancel</p>
                        }

                    </>
            }
        </>
    )
}

export default ChangeName