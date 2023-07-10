import React, { useEffect, useState } from 'react'
import Video from '../base/video'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserAuth } from '@/hooks/useAuth';
import { auth } from '@/firebase';
import { useRouter } from 'next/router';


const LoginComponent = () => {

    const { user, setUser } = UserAuth()
    // call googleSignIn
    const { googleSignIn, facebookSiginIn } = UserAuth()

    // router
    const router = useRouter()

    //state of type password
    const [passwordType, setPasswordType] = useState("password")

    // state of object
    const [value, setValue] = useState({
        email: "",
        password: ""
    })

    // schema
    const schema = yup.object().shape({
        email: yup.string().email("Email is not valid").required("Email is required"),
        password: yup.string().required('Password is required').min(8, "Your password is too short"),
    })

    // useForm
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    // togglePassword
    const togglePassword = (e) => {
        e.preventDefault()
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    // onSubmit
    const onSubmit = (data, e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((credential) => {
                setUser(credential.user)
                localStorage.setItem("credential", JSON.stringify(credential.user))
                router.push('/')
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // handleFacebookLogin
    const handleFacebookLogin = async () => {
        try {
            facebookSiginIn().then((credential) => {
                setUser(credential.user)
                localStorage.setItem("credential", JSON.stringify(credential.user))
                router.push('/')
            })
        } catch (error) {
            console.log(error);
        }
    }

    // handleGoogleLogin
    const handleGoogleLogin = async () => {
        googleSignIn().then((credential) => {
            setUser(credential.user)
            localStorage.setItem("credential", JSON.stringify(credential.user))
            router.push('/')
        })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <Video />
            <div className='relative'>
                <div className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[34%]'>
                    <div>
                        <div className='text-5xl font-bold text-blue'>
                            Sign In To TbtWorld
                        </div>
                        <div className='flex gap-2 justify-center mt-4'>
                            <button onClick={handleGoogleLogin} className='h-12 w-12 rounded-full bg-white flex items-center justify-center'>
                                <FcGoogle size={24} />
                            </button>
                            <button onClick={handleFacebookLogin} className='h-12 w-12 rounded-full bg-white flex items-center justify-center'>
                                <FaFacebookF size={24} className='text-blue' />
                            </button>
                        </div>
                        <p className='text-zinc font-normal text-center mt-4'>or use your email account:</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='relative text-center mt-4'>
                            <input id='email' autoComplete='off' className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer' {...register("email")} onChange={(e) => setValue({
                                ...value,
                                email: e.target.value
                            })} />
                            <p className='text-red font-bold flex'>{errors.email?.message}</p>
                            {
                                value.email ?
                                    <label htmlFor="email" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Email</label>
                                    :
                                    <label htmlFor="email" className='absolute top-[50%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Email</label>
                            }
                            <AiOutlineMail size={24} className='absolute top-2 right-3 text-zinc' />

                        </div>
                        <div className='relative text-center mt-4'>
                            <input id="password" type={passwordType} className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer' {...register("password")} onChange={(e) => setValue({
                                ...value,
                                password: e.target.value
                            })} />
                            <p className='text-red font-bold flex'>{errors.password?.message}</p>
                            {
                                value.password ?
                                    <label htmlFor="password" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Password</label>
                                    :
                                    <label htmlFor="password" className='absolute top-[32%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Password</label>
                            }
                            <button onClick={togglePassword}>
                                {
                                    passwordType === "password" ?
                                        <AiOutlineEyeInvisible size={24} className='absolute top-2 right-3 text-zinc' /> :
                                        <AiOutlineEye size={24} className='absolute top-2 right-3 text-zinc' />
                                }

                            </button>
                        </div>
                        <div className='text-center mt-4'>
                            <button type='submit' className='px-12 py-3 font-bold rounded-full text-lg text-white uppercase 
                            bg-blue hover:bg-[#4161cc] transition duration-300'>
                                SIGN IN
                            </button>
                        </div>
                    </form>
                    <p className='text-lg font-medium flex justify-center gap-2 mt-4'>
                        <span className='text-zinc'>Not a member</span>
                        <Link href="/register" className='text-blue underline'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}


export default LoginComponent