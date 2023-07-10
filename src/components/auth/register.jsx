import React, { useState } from 'react'
import Video from '../base/video'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/router';

const RegisterComponent = () => {
    // router
    const router = useRouter()

    //state of type password
    const [passwordType, setPasswordType] = useState("password")

    // state of input
    const [value, setValue] = useState({
        firstNameInput: "",
        lastNameInput: "",
        emailInput: "",
        passwordInput: "",
    })

    // schema
    const schema = yup.object().shape({
        firstname: yup.string().required("First name is required"),
        lastname: yup.string().required("Last name is required"),
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

    // onSubmit form
    const onSubmit = (data, e) => {
        e.preventDefault()
        // userCredential.user.reloadUserInfo.passwordHash
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                addDoc(collection(db, "user"), {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: data.password
                })
                router.push("/login")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            <Video />
            <div className='relative'>
                <div className='absolute w-[448px] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[16%]'>
                    <div>
                        <p className='text-zinc font-extrabold text-xl text-center'>START FOR FREE</p>
                        <div className='text-5xl font-bold text-blue mt-2 text-center'>
                            Create Account
                        </div>
                        <div className='flex gap-2 justify-center mt-4'>
                            <button className='h-12 w-12 rounded-full bg-white flex items-center justify-center'>
                                <FcGoogle size={24} />
                            </button>
                            <button className='h-12 w-12 rounded-full bg-white flex items-center justify-center'>
                                <FaFacebookF size={24} className='text-blue' />
                            </button>
                        </div>
                        <p className='text-zinc font-normal text-center mt-4'>or use your email account:</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-between mt-4 relative'>
                            <div >
                                <input id='firstname' autoComplete='off' className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer'  {...register("firstname")}
                                    onChange={(e) => setValue({
                                        ...value, firstNameInput: e.target.value
                                    })}
                                />
                                <p className='text-red font-bold flex'>{errors.firstname?.message}</p>
                                {
                                    value.firstNameInput ?
                                        <label htmlFor="firstname" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>First Name</label>
                                        :
                                        <label htmlFor="firstname" className='absolute top-[50%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>First Name</label>

                                }
                                <BiUserCircle size={24} className='absolute top-2 right-64 text-zinc' />
                            </div>
                            <div>
                                <input id='lastname' autoComplete='off' className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer' {...register("lastname")} onChange={(e) => setValue({
                                    ...value, lastNameInput: e.target.value
                                })} />
                                <p className='text-red font-bold flex'>{errors.lastname?.message}</p>

                                {
                                    value.lastNameInput ?
                                        <label htmlFor="lastname" className='absolute top-0 transform translate-y-[-50%] left-[250px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Last Name</label>
                                        :
                                        <label htmlFor="lastname" className='absolute top-[50%] transform translate-y-[-50%] left-[250px] select-none text-zinc pointer-events-none '>Last Name</label>
                                }

                                <BiUserCircle size={24} className='absolute top-2 right-3 text-zinc' />
                            </div>
                        </div>
                        <div className='relative text-center mt-4'>
                            <input id='email' autoComplete='off' className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer' {...register("email")} onChange={(e) => setValue({
                                ...value, emailInput: e.target.value
                            })} />
                            <p className='text-red font-bold flex'>{errors.email?.message}</p>
                            {
                                value.emailInput ? <label htmlFor="email" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Email</label> :
                                    <label htmlFor="email" className='absolute top-[50%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Email</label>
                            }
                            <AiOutlineMail size={24} className='absolute top-2 right-3 text-zinc' />
                        </div>
                        <div className='relative text-center mt-4'>
                            <input id='password' autoComplete='off' type={passwordType} className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer' {...register("password")} onChange={(e) => setValue({
                                ...value, passwordInput: e.target.value
                            })} />
                            <p className='text-red font-bold flex'>{errors.password?.message}</p>
                            {
                                value.passwordInput ?
                                    <label htmlFor="password" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Password</label> :
                                    <label htmlFor="password" className='absolute top-[32%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Password</label>
                            }
                            <button onClick={togglePassword}>
                                {
                                    passwordType === "password" ? <AiOutlineEyeInvisible size={24} className='absolute top-2 right-3 text-zinc' /> :
                                        <AiOutlineEye size={24} className='absolute top-2 right-3 text-zinc' />
                                }

                            </button>
                        </div>
                        <div className='text-center mt-4'>
                            <button type='submit' className='px-12 py-3 font-bold rounded-full text-lg text-white uppercase 
                            bg-blue hover:bg-[#4161cc] transition duration-300'>
                                SIGN UP
                            </button>
                        </div>
                    </form>
                    <p className='text-lg font-medium flex justify-center gap-2 mt-4'>
                        <span className='text-zinc'>Already a member</span>
                        <Link href="/login" className='text-blue underline'>Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterComponent