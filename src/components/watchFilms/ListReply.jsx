import React, { useState } from 'react'
import Image from 'next/image'
import { listReaction } from '@/constants'
import { BiDotsHorizontalRounded } from "react-icons/bi"
import moment from 'moment'


const ListReply = (props) => {
    const { item } = props
    const [hidenDots, setHidenDots] = useState(false)
    const timeago = moment(item.createdAt.toDate()).fromNow()


    const handleHidenDots = () => {
        if (!hidenDots) {
            setHidenDots(true)
        }
        else setHidenDots(false)
    }

    return (
        <li className='flex gap-3 items-start py-2'>
            <Image
                className="rounded-full w-10 h-10 shrink-0 object-cover"
                src={item.photoURL}

                width={200}
                height={28}
                alt="user"
            />
            <div>
                <div className='bg-[#333335] px-4 py-2 rounded-2xl relative inline-block'>
                    <p className='text-white font-medium'>{item.displayName}</p>
                    <p className='text-lg mt-1 text-[#989898]'>{item.reply}</p>
                </div>
                <div className='flex gap-3 mt-3 items-center'>
                    <div className='relative group'>
                        <button className='text-[#989898]'>Reaction</button>
                        <div className='px-2 py-1 rounded-full flex gap-2 bg-[#49494B] absolute -top-8 group-hover:visible invisible  transition duration-300 shadow-md'>
                            {
                                listReaction.map((reaction, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            // setTypeReaction(reaction.name)
                                        }}
                                    >
                                        {reaction.icon}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <p className='text-[#989898] text-sm'>{timeago}</p>
                </div>
            </div>
            <div className='relative'>
                <button onClick={handleHidenDots} className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-[#49494B] transition duration-300'>
                    <BiDotsHorizontalRounded size={28} className='text-[#989898]' />
                </button>
                {
                    hidenDots ?
                        <div className=' bg-[#49494B] flex flex-col gap-1 rounded-md px-3 py-2 shadow-md'>
                            <button className='text-[#989898] transition duration-300 hover:text-white text-left'>Edit</button>
                            <button className='text-[#989898] transition duration-300 hover:text-white text-left'>Delete</button>
                        </div>
                        : null
                }
            </div>
        </li>
    )
}

export default ListReply