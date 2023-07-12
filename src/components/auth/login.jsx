import React, { useState } from 'react'
import Video from '../base/video'
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { UserAuth } from '@/hooks/useAuth';
import { auth } from '@/firebase';
import { useRouter } from 'next/router';
import { appRouter, schemaLogin } from '@/constants';
import InputText from '@/components/base/form/InputText';
import InputPassword from '@/components/base/form/InputPassword';


const LoginComponent = () => {
    // call googleSignIn
    const { googleSignIn, facebookSiginIn, setUser } = UserAuth()

    // router
    const router = useRouter()

    // link
    const link = appRouter

    //state of type password
    const [passwordType, setPasswordType] = useState("password")

    // state of object
    const [formValue, setFormValue] = useState({
        email: "",
        password: ""
    })

    // onChange 
    const handleChange = (e) => {
        const { name, value } = e.target
        console.log(name);
        setFormValue({ ...formValue, [name]: value })
    }

    // useForm
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schemaLogin)
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
                router.push(link.home)
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
                router.push(link.home)
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
            router.push(link.home)
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
                        <InputText
                            name="email"
                            register={register}
                            handleChange={e => handleChange(e)}
                            errors={errors}
                            state={formValue.email}
                        />
                        <InputPassword
                            type={passwordType}
                            name="password"
                            register={register}
                            handleChange={e => handleChange(e)}
                            errors={errors}
                            togglePassword={togglePassword}
                        />
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