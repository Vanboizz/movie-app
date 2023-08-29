import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiDotsHorizontalRounded, BiSolidSend } from "react-icons/bi"
import moment from 'moment'
import {
    AiFillLike,
    AiFillHeart
} from 'react-icons/ai';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { FaSadTear, FaAngry } from 'react-icons/fa';
import { Timestamp, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { UserAuth } from '@/hooks/useAuth';
import ModalConfirmDeleteReply from '@/components/base/modal/ModalConfirmDeleteReply';
import useOnKeyPress from '@/hooks/useOnKeyPress';

const listReaction = [
    {
        button: <button className='text-[#5179FF] font-medium'>Like</button>,
        name: 'Like',
        icon: <AiFillLike size={20} className="text-[#5179FF] hover:scale-125 transition duration-300" />
    },
    {
        button: <button className='text-[#EF4444] font-medium'>Love</button>,
        name: 'Love',
        icon: <AiFillHeart size={20} className="text-[#EF4444] hover:scale-125 transition duration-300" />
    },
    {
        button: <button className='text-[#EAB308] font-medium'>Haha</button>,
        name: 'Haha',
        icon: <BsFillEmojiLaughingFill
            size={20}
            className="text-[#EAB308] hover:scale-125 transition duration-300"
        />
    },
    {
        button: <button className='text-[#A855F7] font-medium'>Sad</button>,
        name: 'Sad',
        icon: <FaSadTear size={20} className="text-[#A855F7] hover:scale-125 transition duration-300" />

    },
    {
        button: <button className='text-[#F97316] font-medium'>Angry</button>,
        name: 'Angry',
        icon: <FaAngry size={20} className="text-[#F97316] hover:scale-125 transition duration-300" />
    },
];

const ListReply = (props) => {
    const { item, id, getReplyBySortBy } = props
    const [hidenDots, setHidenDots] = useState(false)
    const timeago = moment(item.createdAt.toDate()).fromNow()
    const [typeReaction, setTypeReaction] = useState(null)
    const { user } = UserAuth()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [change, setChange] = useState(false)
    const [inputReply, setInputReply] = useState(item.reply)

    const handleHidenDots = () => {
        if (!hidenDots) {
            setHidenDots(true)
        }
        else setHidenDots(false)
    }

    const handleDelete = () => {
        setIsOpenModal(true)
    }

    useOnKeyPress(() => { setChange(false) }, "Escape")

    const getReactions = async () => {
        const docRef = doc(db, "comments", id, "comment", item.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            if (docSnap.data().reaction && docSnap.data().reaction[user.uid]) {
                setTypeReaction(docSnap.data().reaction[user.uid].type)
            }
        }
        else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getReactions()
    }, [])

    const handleReaction = async (reaction) => {
        setTypeReaction(reaction.name)
        const docRef = doc(collection(db, "comments", id, "comment"), item.id)

        const temp = {
            idUser: user.uid,
            name: user.displayName,
            type: reaction.name
        }

        await setDoc(docRef, {
            reaction: {
                [temp.idUser]: temp
            }
        }, { merge: true })
    }

    const handleEdit = () => {
        setChange(true)
        setHidenDots(false)
    }

    const handleOnSubmitUpdate = (e) => {
        e.preventDefault()
        const replyDocRef = doc(db, "comments", id, "comment", item.id)
        updateDoc(replyDocRef, {
            "reply": inputReply,
            "updateAt": Timestamp.fromDate(new Date())
        })
            .then(() => {
                getReplyBySortBy()
                setChange(false)
            })
            .catch(error => console.log(error))
    }

    return (
        <>
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
                        {
                            !change ?
                                <p className='text-lg mt-1 text-[#989898]'>{item.reply}</p> :
                                <>
                                    <form action="" className='flex gap-2 items-center' onSubmit={(e) => handleOnSubmitUpdate(e)}>
                                        <input
                                            type="text"
                                            onChange={(e) => setInputReply(e.target.value)}
                                            value={inputReply}
                                            className='w-full outline-none py-1 px-2 mt-1 rounded-md text-white text-lg bg-[#49494B]' />
                                        <button type='submit'>
                                            <BiSolidSend size={30} className='text-blue' />
                                        </button>
                                    </form>
                                    <p className='mt-1 text-sm text-[#989898]'>Press Esc to cancel</p>
                                </>
                        }
                    </div>
                    <div className='flex gap-3 mt-3 items-center'>
                        <div className='relative group'>
                            {
                                typeReaction === null && <button className='text-[#989898]'>Reaction</button>
                            }
                            {
                                listReaction.map((reaction, index) => (
                                    <div key={index}>
                                        {reaction.name === typeReaction ? reaction.button : null}
                                    </div>
                                ))
                            }
                            <div className='px-2 py-1 rounded-full flex gap-2 bg-[#49494B] absolute -top-8 group-hover:visible invisible  transition duration-300 shadow-md'>
                                {
                                    listReaction.map((reaction, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleReaction(reaction)}
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
                                <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleEdit}>Edit</button>
                                <button onClick={handleDelete} className='text-[#989898] transition duration-300 hover:text-white text-left'>Delete</button>
                            </div>
                            : null
                    }
                </div>
            </li>
            {isOpenModal &&
                <ModalConfirmDeleteReply
                    setIsOpenModal={setIsOpenModal}
                    id={id}
                    item={item}
                    getReplyBySortBy={getReplyBySortBy}
                />}
        </>
    )
}

export default ListReply