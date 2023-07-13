import React, { useState } from 'react'
import Video from '@/components/base/video'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineMail, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import Link from "next/link"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { renderAvatar } from '@/helpers';
import { appRouter, inputType, schemaRegister } from '@/constants';
import InputText from '@/components/base/form/InputText';
import InputPassword from '@/components/base/form/InputPassword';

const RegisterComponent = () => {
    // router
    const router = useRouter()

    // link
    const link = appRouter

    //state of type password
    const [passwordType, setPasswordType] = useState("password")

    // state of input
    const [formValue, setFormValue] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })

    // handle change 
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({ ...formValue, [name]: value })
    }

    // react hook form combine with with yup
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaRegister)
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
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((credential) => {
                setDoc(doc(db, "user", credential?.user.uid), {
                    displayName: data.firstname,
                    email: data.email,
                    avatar: renderAvatar()
                })
                router.push(link.login)
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
                            <InputText
                                name={inputType.FIRSTNAME}
                                register={register}
                                handleChange={e => handleChange(e)}
                                errors={errors}
                                state={formValue.firstname}
                                icon={<BiUserCircle size={24} className="style-icon" />}
                            />
                            <InputText
                                name={inputType.LASTNAME}
                                register={register}
                                handleChange={e => handleChange(e)}
                                errors={errors}
                                state={formValue.lastname}
                                icon={<BiUserCircle size={24} className="style-icon" />}
                            />
                        </div>
                        <InputText
                            name={inputType.EMAIL}
                            register={register}
                            handleChange={e => handleChange(e)}
                            errors={errors}
                            state={formValue.email}
                            icon={<AiOutlineMail size={24} className='style-icon' />}
                        />
                        <InputPassword
                            type={passwordType}
                            name={inputType.PASSWORD}
                            register={register}
                            handleChange={e => handleChange(e)}
                            errors={errors}
                            state={formValue.password}
                            passwordType={passwordType}
                            togglePassword={togglePassword}
                            eyeInvisible={<AiOutlineEyeInvisible size={24} className="style-icon" />}
                            eye={<AiOutlineEye size={24} className="style-icon" />}
                        />
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