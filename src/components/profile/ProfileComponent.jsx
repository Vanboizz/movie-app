import React, { useEffect, useState } from 'react'
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
import ChangeEmail from './ChangeEmail'
import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'
import ChangeImage from './ChangeImage'

const ProfileComponent = () => {
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
                                <ChangeEmail
                                    user={user}
                                    hiddenEmail={hiddenEmail}
                                    changeEmail={changeEmail}
                                    esc={esc}
                                    email={email}
                                    setEmail={setEmail}
                                    showEmail={showEmail}
                                />
                                <ChangeName
                                    user={user}
                                    setFirstName={setFirstName}
                                    setLastName={setLastName}
                                    hiddenName={hiddenName}
                                    changeName={changeName}
                                    esc={esc}
                                    firstName={firstName}
                                    lastName={lastName}
                                    showName={showName}
                                />
                            </div>
                            <div className='mt-10 '>
                                <p className='text-white text-lg font-medium mb-3'>Change password</p>
                                <form className='flex gap-32 items-center' onSubmit={handleSubmit(changePassword)}>
                                    <ChangePassword
                                        setPassword={setPassword}
                                        errors={errors}
                                        password={password}
                                        register={register}
                                    />
                                    {
                                        <button className='bg-[#49494B] px-6 py-2 rounded-2xl text-white hover:bg-[#333335] transition duration-300'>Update</button>
                                    }
                                </form>
                            </div>
                            <div className='flex justify-center mt-12 mb-6'>
                                <button onClick={deleteAccount} className='px-5 py-2 border-none font-bold rounded-full text-[#E33F3D] bg-[#333335] hover:text-white hover:bg-[#EF4444] transition duration-300'>Delete Account</button>
                            </div>
                        </div>
                        <ChangeImage user={user} handleInputChange={handleInputChange} />
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
        router.push(appRouter.home)
    }
}

export default ProfileComponent