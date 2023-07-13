import classNames from 'classnames'
import React from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import { inputType } from '@/constants'

const InputPassword = (props) => {
    const { type, name, register, handleChange, errors, togglePassword, state, passwordType } = props

    const styleLabel = "style-label"

    const styleButton = "style-button"

    const labelClasses = classNames(styleLabel, {
        "top-0 peer-focus:top-0 transition-all duration-500": state,
        "top-[32%]": !state
    })


    return (
        <div className='relative text-center mt-4'>
            <input
                id="password"
                autoComplete="off"
                type={type}
                name={name}
                className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer'
                {...register(name)}
                onChange={handleChange}
            />
            <p className='text-red font-bold flex'>{errors.password?.message}</p>
            <label htmlFor="password" className={labelClasses}>Password</label>

            <button onClick={togglePassword}>
                {
                    passwordType === inputType.PASSWORD ?
                        <AiOutlineEyeInvisible size={24} className={styleButton} /> :
                        <AiOutlineEye size={24} className={styleButton} />
                }
            </button>
        </div>
    )
}

export default InputPassword