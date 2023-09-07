// import { listReaction } from '@/constants'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { BiDotsHorizontalRounded, BiSolidSend } from "react-icons/bi"
import moment from 'moment'
import { uuid } from 'uuidv4';
import { Timestamp, collection, deleteField, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
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
import ModalListReact from '../base/modal/ModalListReact';

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
    const { item, user, id, getDataCommentBySortBy } = props
    const [hidenDots, setHidenDots] = useState(false)
    const [hidenForms, setHidenForms] = useState(false)
    const [hiddenComment, setHiddenComment] = useState(false)
    const [typeReaction, setTypeReaction] = useState(null)
    const [reply, setReply] = useState("")
    const [replys, setReplys] = useState([])
    const timeago = moment(item.createdAt.toDate()).fromNow()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [inputComment, setInputComment] = useState(item.comment)
    const [change, setChange] = useState(false)
    const [showList, setShowList] = useState(false)

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

    const showListReact = () => {
        setShowList(true)
    }

    const handleEdit = async () => {
        setChange(true)
        setHidenDots(false)
    }

    const handleHidenComment = () => {
        if (!hiddenComment) {
            setHiddenComment(true)
        }
        else setHiddenComment(false)
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
            avt: user.photoURL,
            type: reaction.name
        }

        await setDoc(docRef, {
            reaction: {
                [temp.idUser]: temp
            }
        }, { merge: true })
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

    const getReplyBySortBy = async () => {
        const collectionComment = collection(db, "comments", id, "comment")
        const q = query(
            collectionComment,
            where("parent_id", "==", item.idComments)
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

    const handleDeleteReact = async () => {
        const docRef = doc(db, "comments", id, "comment", item.id)
        const updateData = {};
        updateData[`reaction.${user.uid}`] = deleteField();

        try {
            await updateDoc(docRef, updateData)
        } catch (error) {
            console.error('Error deleting field:', error);
        }
    }

    const getReactions = async () => {
        const docRef = doc(db, "comments", id, "comment", item.id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const userReaction = docSnap.data().reaction && docSnap.data().reaction[user.uid]
            if (userReaction) {
                setTypeReaction(userReaction.type)
            }
        }
        else {
            console.log("No such document!");
        }
    }

    useEffect(() => {
        getReplyBySortBy()
        getReactions()
    }, [reply])

    return (
        <>
            {
                !hiddenComment ?
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
                                <button className='absolute bg-[#333335] -right-10 -bottom-3 rounded-full shadow-md px-1 py-1/2 hover:brightness-90 transition duration-300' onClick={showListReact}>
                                    <div className='flex'>
                                        {
                                            item.reaction && Object.keys(Object.values(item.reaction).reduce((prev, curr) => {
                                                if (prev[curr["type"]] === undefined) {
                                                    return { ...prev, [curr["type"]]: 1 }
                                                } else {
                                                    return { ...prev, [curr["type"]]: prev[curr["type"]] + 1 }
                                                }
                                            }, {})).map((value, index) => {
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
                                            item.reaction && Object.values(item.reaction).length > 0 ? Object.values(item.reaction).length : null
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
                                    replys.map((reply, index) => (
                                        <ListReply
                                            key={index}
                                            reply={reply}
                                            item={item}
                                            id={id}
                                            getReplyBySortBy={getReplyBySortBy}
                                            listReaction={listReaction}
                                        />
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
                                        {
                                            item.idUser === user.uid ?
                                                <>
                                                    <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleEdit}>Edit</button>
                                                    <button className='text-[#989898] transition duration-300 hover:text-white text-left'
                                                        onClick={handleDelete}>Delete</button>
                                                </>
                                                :
                                                <button className='text-[#989898] transition duration-300 hover:text-white text-left' onClick={handleHidenComment}>Hidden</button>
                                        }
                                    </div>
                                    : null
                            }
                        </div>
                    </li>
                    : null
            }
            {isOpenModal &&
                <ModalConfirmDeleteComment
                    setIsOpenModal={setIsOpenModal}
                    setHidenDots={setHidenDots}
                    id={id}
                    item={item}
                    getDataCommentBySortBy={getDataCommentBySortBy}
                    getReplyBySortBy={getReplyBySortBy}
                />}
            {
                showList && <ModalListReact item={item} listReaction={listReaction} setShowList={setShowList} />
            }
        </>
    )
}

export default ListComment