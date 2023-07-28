import React, { useEffect, useState } from 'react'
import { BsPencilSquare } from "react-icons/bs"
import { FiUpload } from "react-icons/fi"
import { AiOutlineSend } from "react-icons/ai"
import Image from 'next/image'
import Head from 'next/head'
import { UserAuth } from '@/hooks/useAuth'
import useOnKeyPress from '@/hooks/useOnKeyPress'
import ModalConfimPasswordAccount from '@/components/base/modal/ModalConfirmPassword'
import axios from 'axios'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useRouter } from 'next/router'
import { appRouter, schemaPassword } from '@/constants'
import ModalConfirmDeleteAccount from '@/components/base/modal/ModalConfirmDeleteAccount'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const Profile = () => {
    const { user, setUser } = UserAuth()
    const [hiddenEmail, setHiddenEmail] = useState(false)
    const [hiddenName, setHiddenName] = useState(false)
    const [email, setEmail] = useState(user ? user.email : "")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [esc, setEsc] = useState(false)
    const [modalConfirmPassword, setModalConfirmPassword] = useState(false)
    const [modalConfimDelete, setModalConfimDelete] = useState(false)
    const [type, setType] = useState()
    const router = useRouter()

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(schemaPassword)
    })

    const showEmail = (e) => {
        e.preventDefault()
        setHiddenEmail(true)
    }

    const showName = (e) => {
        e.preventDefault()
        setHiddenName(true)
    }

    useOnKeyPress(() => { setEsc(false), setHiddenEmail(false), setHiddenName(false) }, "Escape")

    useEffect(() => {
        setEmail(user ? user.email : "")
    }, [user])

    const changeEmail = (e) => {
        e.preventDefault()
        if (user.email === email) {
            toast.error("Email have already existed")
            setModalConfirmPassword(false)
        }
        else {
            setType("Change Email")
            setModalConfirmPassword(true)
        }
    }

    const changePassword = () => {
        setType("Change Password")
        setModalConfirmPassword(true)
    }

    const changeName = (e) => {
        e.preventDefault()
        setType("Change Name")
        setModalConfirmPassword(true)
    }

    const deleteAccount = (e) => {
        e.preventDefault()
        setType("Delete Account")
        setModalConfimDelete(true)
    }

    const handleInputChange = (e) => {
        const payload = new FormData()
        const docRef = doc(db, "user", user.uid)
        payload.append("image", e.target.files[0])
        axios.post(
            `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.NEXT_PUBLIC_API_IMGBB}`,
            payload,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                toast("Upload image is successfull")
                updateDoc(docRef, {
                    photoURL: response.data.data.display_url
                })
                    .then(() => {
                        const newUser = {
                            ...user,
                            photoURL: response.data.data.display_url
                        }
                        setUser(newUser)
                        localStorage.setItem("credential", JSON.stringify(newUser))
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    if (user) {
        return (
            <>
                <ToastContainer />
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
                                            !hiddenEmail ?
                                                <div className='flex justify-between mt-1'>
                                                    <p className='text-[#989898]'>{user && user.email}</p>
                                                    <button onClick={showEmail}>
                                                        <BsPencilSquare className='text-[#989898] hover:text-blue transition duration-300' size={20} />
                                                    </button>
                                                </div>
                                                :
                                                <>
                                                    <form action="" className='flex justify-between gap-48 mt-1'>
                                                        <input type="email" className='outline-none rounded-md selection:text-blue py-1 px-2 w-full bg-[#333335] text-[#989898]' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                        <button onClick={changeEmail}>
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
                                <div>
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
                                </div>
                            </div>
                            <div className='mt-10 flex justify-between'>
                                <p className='text-white text-lg'>Your email is verified</p>
                                <button className='text-blue underline text-lg font-medium'>Send me verification email</button>
                            </div>
                            <div className='mt-10 '>
                                <p className='text-white text-lg font-medium mb-3'>Change password</p>
                                <form className='flex gap-32 items-center' onSubmit={handleSubmit(changePassword)}>
                                    <div className='flex-1'>
                                        <input type="password" {...register("password")} value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#333335] selection:text-blue text-zinc py-3 rounded-md outline-none px-5 text-blaxc w-full' placeholder='New password' />
                                        <p className='style-error'>{errors.password?.message}</p>
                                    </div>
                                    {
                                        <button className='bg-[#49494B] px-6 py-2 rounded-2xl text-white hover:bg-[#333335] transition duration-300'>Update</button>
                                    }
                                </form>
                            </div>
                            <div className='flex justify-center mt-12 mb-6'>
                                <button onClick={deleteAccount} className='px-5 py-2 border-none font-bold rounded-full text-[#E33F3D] bg-[#333335] hover:text-white hover:bg-[#EF4444] transition duration-300'>Delete Account</button>
                            </div>
                        </div>
                        <div className='px-4 col-span-1'>
                            <p className='text-white mt-5 text-xl font-medium'>Profile Photo</p>
                            <div className='flex flex-col items-center mt-4'>
                                <div>
                                    <span>
                                        {
                                            user.photoURL ? <Image src={user.photoURL} width={250} height={250} alt='avt' className='rounded-full object-cover' /> : null
                                        }

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
                    modalConfirmPassword && <ModalConfimPasswordAccount type={type} setModalConfirmPassword={setModalConfirmPassword} email={email} password={password} firstName={firstName} lastName={lastName} />
                }
                {
                    modalConfimDelete && <ModalConfirmDeleteAccount setModalConfimDelete={setModalConfimDelete} setModalConfirmPassword={setModalConfirmPassword} />
                }
            </>
        )
    }
    else {
        router.push(appRouter.login)
    }
}

export default Profile