import React from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"

const InputPassword = (props) => {
    const { type, name, register, handleChange, errors, togglePassword } = props

    return (
        <div className='relative text-center mt-4'>
            <input
                id="password"
                autoComplete="off"
                type={type}
                name={name}
                className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer'
                onChange={handleChange}
                {...register(name)}
            />
            <p className='text-red font-bold flex'>{errors.password?.message}</p>
            {/* {
                formValue.password ?
                    <label htmlFor="password" className='absolute top-0 transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none peer-focus:top-0 transition-all duration-500'>Password</label>
                    :
                    <label htmlFor="password" className='absolute top-[32%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Password</label>
            } */}
            <button onClick={togglePassword}>
                {/* {
                    passwordType === "password" ?
                        <AiOutlineEyeInvisible size={24} className='absolute top-2 right-3 text-zinc' /> :
                        <AiOutlineEye size={24} className='absolute top-2 right-3 text-zinc' />
                } */}

            </button>
        </div>
    )
}

export default InputPassword