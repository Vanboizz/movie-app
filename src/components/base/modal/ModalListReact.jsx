import ListReactOfUser from '@/components/watchFilms/ListReactOfUser'
import React from 'react'
import { AiOutlineClose } from "react-icons/ai"

const ModalListReact = (props) => {
    const { item, reply, listReaction, setShowList } = props

    const handleCloseModal = () => {
        setShowList(false)
    }

    return (
        <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md bg-[#49494B] px-4 py-3 rounded-xl w-full max-w-[350px]'>
            <div className='flex justify-between items-center mb-4'>
                <p className='text-white text-lg font-medium'>People's reaction to this info</p>
                <button onClick={handleCloseModal}>
                    <AiOutlineClose size={20} className='text-white' />
                </button>
            </div>
            <ul className='flex flex-col gap-3'>
                {
                    item ?
                        item.reaction && Object.values(item.reaction).map((value, index) => (
                            <ListReactOfUser key={index} value={value} listReaction={listReaction} />
                        ))
                        :
                        reply.reaction && Object.values(reply.reaction).map((value, index) => (
                            <ListReactOfUser key={index} value={value} listReaction={listReaction} />
                        ))
                }

            </ul>
        </div>
    )
}

export default ModalListReact