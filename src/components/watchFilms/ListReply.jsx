import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiDotsHorizontalRounded, BiSolidSend } from "react-icons/bi"
import moment from 'moment'
import { Timestamp, collection, deleteField, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { UserAuth } from '@/hooks/useAuth';
import ModalConfirmDeleteReply from '@/components/base/modal/ModalConfirmDeleteReply';
import useOnKeyPress from '@/hooks/useOnKeyPress';
import ModalListReact from '../base/modal/ModalListReact';

const ListReply = (props) => {
    const { reply, item, id, getReplyBySortBy, listReaction } = props
    const [hidenDots, setHidenDots] = useState(false)
    const timeago = moment(reply.createdAt.toDate()).fromNow()
    const [typeReaction, setTypeReaction] = useState(null)
    const [hiddenReply, setHiddenReply] = useState(false)
    const { user } = UserAuth()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [change, setChange] = useState(false)
    const [inputReply, setInputReply] = useState(reply.reply)
    const [showList, setShowList] = useState(false)


    const handleHidenDots = () => {
        if (!hidenDots) {
            setHidenDots(true)
        }
        else setHidenDots(false)
    }

    const handleDelete = () => {
        setIsOpenModal(true)
    }

    const handleHidenReply = () => {
        if (!hiddenReply) {
            setHiddenReply(true)
        }
        else setHiddenReply(false)
    }

    const showListReact = () => {
        setShowList(true)
    }

    useOnKeyPress(() => { setChange(false) }, "Escape")

    const getReactions = async () => {
        const docRef = doc(db, "comments", id, "comment", reply.id)
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
        const docRef = doc(collection(db, "comments", id, "comment"), reply.id)

        const temp = {
            idUser: user.uid,
            name: user.displayName,
            avt: user.photoURL,
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
        const replyDocRef = doc(db, "comments", id, "comment", reply.id)
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

    const handleDeleteReact = async () => {
        const docRef = doc(db, "comments", id, "comment", reply.id)
        const updateData = {};
        updateData[`reaction.${user.uid}`] = deleteField();

        try {
            await updateDoc(docRef, updateData)
        } catch (error) {
            console.error('Error deleting field:', error);
        }
    }

    return (
        <>
            {
                !hiddenReply ?
                    <li className='flex gap-3 items-start py-2'>
                        <Image
                            className="rounded-full w-10 h-10 shrink-0 object-cover"
                            src={reply.photoURL}

                            width={200}
                            height={28}
                            alt="user"
                        />
                        <div>
                            <div className='bg-[#333335] px-4 py-2 rounded-2xl relative inline-block'>
                                <p className='text-white font-medium'>{reply.displayName}</p>
                                {
                                    !change ?
                                        <p className='text-lg mt-1 text-[#989898]'>{reply.reply}</p> :
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
                                <button className='absolute bg-[#333335] -right-10 -bottom-3 rounded-full shadow-md px-1 py-1/2 hover:brightness-90 transition duration-300' onClick={showListReact}>
                                    <div className='flex'>
                                        {
                                            reply.reaction && Object.keys(Object.values(reply.reaction).reduce((prev, curr) => {
                                                if (prev[curr["type"]] === undefined) {
                                                    return { ...prev, [curr["type"]]: 1 }
                                                } else {
                                                    return { ...prev, [curr["type"]]: prev[curr["type"]] + 1 }
                                                }
                                            }, {}))
                                                .map((value, index) => {
                                                    switch (value) {
                                                        case "Like":
                                                            return <div key={index}>{listReaction[0]["icon"]}</div>
                                                        case "Love":
                                                            return <div key={index}>{listReaction[1]["icon"]}</div>
                                                        case "Haha":
                                                            return <div key={index}>{listReaction[2]["icon"]}</div>
                                                        case "Sad":
                                                            return <div key={index}>{listReaction[3]["icon"]}</div>
                                                        case "Angry":
                                                            return <div key={index}>{listReaction[4]["icon"]}</div>
                                                        default:
                                                            break;
                                                    }
                                                })
                                        }
                                        <p className='text-sm text-[#989898] font-semibold'>{
                                            reply.reaction && Object.values(reply.reaction).length > 0 ? Object.values(reply.reaction).length : null
                                        }</p>
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
                                            <div key={index} onClick={handleDeleteReact}>
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
                                        {
                                            (user.uid === item.idUser && reply.parent_id === item.idComments || user.uid === reply.idUser) ?
                                                <>
                                                    <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleEdit}>Edit</button>
                                                    <button onClick={handleDelete} className='text-[#989898] transition duration-300 hover:text-white text-left'>Delete</button>
                                                </>
                                                :
                                                <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleHidenReply} >Hidden</button>
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                    </li>
                    : null
            }
            {isOpenModal &&
                <ModalConfirmDeleteReply
                    setIsOpenModal={setIsOpenModal}
                    id={id}
                    reply={reply}
                    getReplyBySortBy={getReplyBySortBy}
                />}
            {
                showList && <ModalListReact reply={reply} listReaction={listReaction} setShowList={setShowList} />
            }
        </>
    )
}

export default ListReply