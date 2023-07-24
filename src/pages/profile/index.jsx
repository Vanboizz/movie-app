import React, { useEffect, useRef, useState } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { FiUpload } from "react-icons/fi"
import { AiOutlineSend } from "react-icons/ai"
import Image from 'next/image'
import Head from 'next/head'
import { UserAuth } from '@/hooks/useAuth'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import Modal from '@/components/base/modal'
import { GoogleAuthProvider, reauthenticateWithPopup, updatePassword } from 'firebase/auth'
import axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'

const Profile = () => {
    const { user } = UserAuth()
    const [hidenEmail, setHidenEmail] = useState(false)
    const [hidenName, setHidenName] = useState(false)
    const [email, setEmail] = useState(user ? user.email : "")
    const [esc, setEsc] = useState(false)
    const [modal, setModal] = useState(false)
    const inputPassword = useRef()

    const isPasswordProvider = user && user.providerData && user.providerData[0].providerId === "password"

    const showEmail = (e) => {
        e.preventDefault()
        setHidenEmail(true)
    }

    const showName = (e) => {
        e.preventDefault()
        setHidenName(true)
    }

    useOnKeyPress(() => { setEsc(false), setHidenEmail(false), setHidenName(false) }, "Escape")

    useEffect(() => {
        setEmail(user ? user.email : "")
    }, [user])

    const handleAction = async (e) => {
        e.preventDefault()
        if (isPasswordProvider) {
            setModal(true)
        }
        else {
            await reauthenticateWithPopup(user, new GoogleAuthProvider())
        }
    }

    const changePassword = async (e) => {
        e.preventDefault()
        try {
            if (isPasswordProvider) {
                setModal(true)
            } else {
                await updatePassword(user, inputPassword.current.value)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        const payload = new FormData()
        const imageRef = doc(db, "user", user.uid)
        payload.append("image", e.target.files[0])
        axios.post(
            `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_API_IMGBB}`,
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                updateDoc(imageRef, {
                    photoURL: response.data.data.display_url
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <Head>
                <title>Profile | TbtWorld</title>
                <meta name="description" content="Genered by create next app" />
            </Head>
            <div className='p-5'>
                <div className='pb-4 border-b border-[#525252]'>
                    <h1 className='text-white font-semibold uppercase text-4xl'>Account settings</h1>
                </div>
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <p className='text-white mt-5 text-xl font-medium mb-3'>User Information</p>
                        <p className='text-[#989898]'>Here you can edit public information about yourself.</p>
                        <p className='text-[#989898]'>If you signed in with Google or Facebook, you can't change your email and password.</p>
                        <div className='mt-7 flex flex-col gap-3'>
                            <div>
                                <p className='text-white text-lg'>Email</p>
                                <div >
                                    {
                                        !hidenEmail ?
                                            <div className='flex justify-between mt-1'>
                                                <p className='text-[#989898]'>{user && user.email}</p>
                                                <button onClick={showEmail}>
                                                    <BsPencilSquare className='text-[#989898] hover:text-blue transition duration-300' size={20} />
                                                </button>
                                            </div>
                                            :
                                            <>
                                                <form action="" className='flex justify-between gap-48 mt-1'>
                                                    <input type="email" className='outline-none rounded-md py-1 px-2 w-full bg-[#333335] text-[#989898]' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                    <button>
                                                        <AiOutlineSend onClick={handleAction} className='text-[#989898] hover:text-blue transition du\' size={20} />
                                                    </button>
                                                </form>
                                                {
                                                    !esc && <p className='text-sm mt-1 text-[#989898]'>Press Esc to cancel</p>
                                                }
                                            </>
                                    }
                                </div>
                            </div>
                            <div>
                                <p className='text-white text-lg'>Name</p>
                                {
                                    !hidenName ?
                                        <div className='flex justify-between mt-1'>
                                            <p className='text-[#989898]'>{user && user.displayName}</p>
                                            <button onClick={showName}>
                                                <BsPencilSquare className='text-[#989898] hover:text-blue transition du\' size={20} />
                                            </button>
                                        </div> :
                                        <>
                                            <form action="" className='flex justify-between mt-1'>
                                                <div className='flex gap-3'>
                                                    <input type="text" className='outline-none rounded-md py-1 px-2 w-full bg-[#333335]' placeholder='First name' />
                                                    <input type="text" className='outline-none rounded-md py-1 px-2 w-full bg-[#333335]' placeholder='Last name' />

                                                </div>
                                                <button>
                                                    <AiOutlineSend className='text-[#989898] hover:text-blue transition du\' size={20} />
                                                </button>
                                            </form>
                                            {
                                                !esc && <p className='text-sm mt-1 text-[#989898]'>Press Esc to cancel</p>
                                            }

                                        </>
                                }
                            </div>
                        </div>
                        <div className='mt-10 flex justify-between'>
                            <p className='text-white text-lg'>Your email is verified</p>
                            <button className='text-blue underline text-lg font-medium'>Send me verification email</button>
                        </div>
                        <div className='mt-10 '>
                            <p className='text-white text-lg font-medium mb-3'>Change password</p>
                            <form className='flex gap-32 items-center'>
                                <div className='flex-1'>
                                    <input type="password" ref={inputPassword} className='bg-[#333335] py-3 rounded-md outline-none px-5 text-blaxc w-full' placeholder='New password' />
                                </div>
                                {
                                    isPasswordProvider &&
                                    <button onClick={changePassword} className='bg-[#49494B] px-6 py-2 rounded-2xl text-white hover:bg-[#333335] transition duration-300'>Update</button>
                                }
                            </form>
                        </div>
                        <div className='flex justify-center mt-12 mb-6'>
                            <button className='px-5 py-2 border-none font-bold rounded-full text-[#E33F3D] bg-[#333335] hover:text-white hover:bg-[#EF4444] transition duration-300'>Delete Account</button>
                        </div>
                    </div>
                    <div className='px-4 col-span-1'>
                        <p className='text-white mt-5 text-xl font-medium'>Profile Photo</p>
                        <div className='flex flex-col items-center mt-4'>
                            <div>
                                <span>
                                    <Image src={user && user?.photoURL} width={250} height={250} alt='avt' className='rounded-full object-cover' />
                                </span>
                            </div>
                            <label htmlFor='upload-img' className='px-5 py-3 mt-6 rounded-full bg-[#333335] flex items-center gap-3 hover:bg-[#262628] transition duration-300 cursor-pointer'>
                                <FiUpload className='text-blue' size={24} />
                                <p className='text-white'>Upload new photo</p>
                            </label>
                            <input id='upload-img' onChange={handleInputChange} type='file' className='hidden' accept='image/*' />
                            <div className='mt-8 text-center'>
                                <p className='text-white text-xl'>{user && user.displayName}</p>
                                <p className='text-lg mt-2 text-[#989898]'>There is no great genius without some touch of madness.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                modal && <Modal modal={modal} setModal={setModal} />
            }
        </>
    )
}

export default Profile