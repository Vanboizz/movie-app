import { listReaction } from '@/constants'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiDotsHorizontalRounded, BiSolidSend } from "react-icons/bi"
import moment from 'moment'
import { uuid } from 'uuidv4';
import { Timestamp, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import ListReply from './ListReply'

const ListComment = (props) => {
    const { item, user, id } = props
    const [hidenDots, setHidenDots] = useState(false)
    const [hidenForms, setHidenForms] = useState(false)
    const [typeReaction, setTypeReaction] = useState(null)
    const [reply, setReply] = useState("")
    const [replys, setReplys] = useState([])
    const timeago = moment(item.createdAt.toDate()).fromNow()
    const [reactions, setReactions] = useState([])

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

    useEffect(() => {
        const getReactions = async () => {
            const docRef = doc(db, "comments", id, "comment", item.id)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                console.log(docSnap.data());
            }
            else {
                console.log("No such document!");
            }
        }
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

    useEffect(() => {
        const getReply = async () => {
            const q = query(collection(db, "comments", id, "comment"), where("parent_id", "==", item.idComments))
            const querySnapshot = await getDocs(q)
            const listReply = []
            querySnapshot.forEach((doc) => {
                listReply.push(doc.data())
            })
            setReplys(listReply)
        }
        getReply()
    }, [reply])

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
                    <p className='text-lg mt-1 text-[#989898]'>{item.comment}</p>
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
                            <ListReply key={index} item={item} />
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
                            <button className='text-[#989898] transition duration-300 hover:text-white text-left'>Edit</button>
                            <button className='text-[#989898] transition duration-300 hover:text-white text-left'>Delete</button>
                        </div>
                        : null
                }
            </div>
        </li>
    )
}

export default ListComment