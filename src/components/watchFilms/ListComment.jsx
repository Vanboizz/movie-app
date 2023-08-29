// import { listReaction } from '@/constants'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiDotsHorizontalRounded, BiSolidSend } from "react-icons/bi"
import moment from 'moment'
import { uuid } from 'uuidv4';
import { Timestamp, collection, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import ListReply from './ListReply'
import {
    AiFillLike,
    AiFillHeart,
} from 'react-icons/ai';
import { BsFillEmojiLaughingFill } from 'react-icons/bs';
import { FaSadTear, FaAngry } from 'react-icons/fa';
import ModalConfirmDeleteComment from '../base/modal/ModalConfirmDeleteComment';
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

const ListComment = (props) => {
    const { item, user, id, tabSortBy, getDataCommentBySortBy } = props
    const [hidenDots, setHidenDots] = useState(false)
    const [hidenForms, setHidenForms] = useState(false)
    const [typeReaction, setTypeReaction] = useState(null)
    const [reply, setReply] = useState("")
    const [replys, setReplys] = useState([])
    const timeago = moment(item.createdAt.toDate()).fromNow()
    const [reactions, setReactions] = useState([])
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [inputComment, setInputComment] = useState(item.comment)
    const [change, setChange] = useState(false)

    const handleDelete = () => {
        setIsOpenModal(true)
    }

    const handleHidenDots = () => {
        if (!hidenDots) {
            setHidenDots(true)
        }
        else setHidenDots(false)
    }

    const handleHidenForm = (e) => {
        if (!hidenForms) {
            setHidenForms(true)
        }
        else setHidenForms(false)
    }

    const handleReply = (e) => {
        setReply(e.target.value)
    }

    useOnKeyPress(() => { setChange(false) }, "Escape")

    const handleReplyComments = async (e, reply) => {
        e.preventDefault()
        setReply("")
        let temp = {
            reply,
            idComments: uuid(),
            idUser: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            createdAt: Timestamp.fromDate(new Date()),
            updateAt: null,
            parent_id: item.idComments
        }
        const docRef = doc(collection(db, "comments", id, "comment"))
        await setDoc(docRef, temp)
    }

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

    const handleEdit = async () => {
        setChange(true)
        setHidenDots(false)
    }

    const handleOnSubmitUpdate = (e) => {
        e.preventDefault()
        const commentDocRef = doc(db, "comments", id, "comment", item.id)
        updateDoc(commentDocRef, {
            "comment": inputComment,
            "updateAt": Timestamp.fromDate(new Date())
        })
            .then(() => {
                getDataCommentBySortBy()
                setChange(false)
            })
            .catch(error => console.log(error))
    }

    const getReplyBySortBy = async (sortBy) => {
        const collectionComment = collection(db, "comments", id, "comment")
        const q = query(
            collectionComment,
            where("parent_id", "==", item.idComments),
            orderBy('createdAt', sortBy)
        )
        const querySnapshot = await getDocs(q)
        const listReply = []
        querySnapshot.forEach((doc) => {
            listReply.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setReplys(listReply)
    }

    useEffect(() => {
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
        getReactions()
        if (tabSortBy === "Latest") {
            getReplyBySortBy('desc')
        } else {
            getReplyBySortBy('asc')
        }
    }, [reply, tabSortBy])

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
                                <p className='text-lg mt-1 text-[#989898]'>{item.comment}</p> :
                                <>
                                    <form action="" className='flex gap-2 items-center' onSubmit={(e) => handleOnSubmitUpdate(e)}>
                                        <input
                                            type="text"
                                            onChange={(e) => setInputComment(e.target.value)}
                                            value={inputComment}
                                            className='w-full outline-none py-1 px-2 mt-1 rounded-md text-white text-lg bg-[#49494B]' />
                                        <button type='submit'>
                                            <BiSolidSend size={30} className='text-blue' />
                                        </button>
                                    </form>
                                    <p className='mt-1 text-sm text-[#989898]'>Press Esc to cancel</p>
                                </>
                        }
                        <button className='absolute bg-[#333335] -right-10 -bottom-3 rounded-full shadow-md px-1 py-1/2 hover:brightness-90 transition duration-300'>
                            <div className='flex'>
                                {
                                    listReaction.map((value) => (
                                        Object.keys(item.reaction).map((react, index) => (
                                            <div key={index}>
                                                {
                                                    value.name === item.reaction[react].type
                                                        ?
                                                        value.icon
                                                        :
                                                        null
                                                }
                                            </div>
                                        ))
                                    ))
                                }
                            </div>
                        </button>
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
                            <div className='px-2 py-1 rounded-full flex gap-2 bg-[#49494B] absolute -top-8 group-hover:visible invisible transition duration-300 shadow-md'>
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
                        <button onClick={handleHidenForm} className='text-[#989898] transition duration-300 hover:text-white'>Reply</button>
                        <p className='text-[#989898] text-sm'>{timeago}</p>
                    </div>
                    {
                        hidenForms ?
                            <form action="" className='flex gap-2 items-center my-4' onSubmit={(e) => handleReplyComments(e, reply)}>
                                <Image
                                    className="rounded-full w-10 h-10 shrink-0 object-cover"
                                    src={user.photoURL}
                                    width={200}
                                    height={28}
                                    alt="user"
                                />
                                <input type="text" value={reply} onChange={handleReply} className='py-2 flex-1 bg-[#333335] outline-none rounded-full px-4 text-white' placeholder='Write comment...' required />
                                <button type='submit'>
                                    <BiSolidSend size={30} className='text-blue' />
                                </button>
                            </form> : null
                    }
                    <ul>
                        {
                            replys.map((item, index) => (
                                <ListReply key={index} item={item} id={id} getReplyBySortBy={getReplyBySortBy} />
                            ))
                        }
                    </ul>
                </div>
                <div className='relative'>
                    <button onClick={handleHidenDots} className='h-8 w-8 rounded-full flex items-center justify-center hover:bg-[#49494B] transition duration-300'>
                        <BiDotsHorizontalRounded size={28} className='text-[#989898]' />
                    </button>
                    {
                        hidenDots ?
                            <div className=' bg-[#49494B] flex flex-col gap-1 rounded-md px-3 py-2 shadow-md'>
                                <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleEdit}>Edit</button>
                                <button className='text-[#989898] transition duration-300 hover:text-white text-left'
                                    onClick={handleDelete}>Delete</button>
                            </div>
                            : null
                    }
                </div>
            </li>
            {isOpenModal &&
                <ModalConfirmDeleteComment
                    setIsOpenModal={setIsOpenModal}
                    id={id}
                    item={item}
                    getDataCommentBySortBy={getDataCommentBySortBy}
                    getReplyBySortBy={getReplyBySortBy}
                />}
        </>
    )
}

export default ListComment