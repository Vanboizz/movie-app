import classNames from 'classnames'
import React from 'react'
import { inputType } from '@/constants'

const InputPassword = (props) => {
    const { type, name, register, handleChange, errors, togglePassword, state, passwordType, eyeInvisible, eye } = props

    const labelClasses = classNames("style-input", {
        "top-0 peer-focus:top-0 transition-all duration-500": state,
        "top-[32%]": !state
    })

    return (
        <div className='relative text-center mt-4'>
            <input
                id={inputType.PASSWORD}
                autoComplete="off"
                type={type}
                name={name}
                className='w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer selection:text-blue'
                {...register(name)}
                onChange={handleChange}
            />
            <p className='style-error'>{errors.password?.message}</p>
            <label htmlFor={name} className={labelClasses}>Password</label>
            <button onClick={togglePassword}>
                {
                    passwordType === inputType.PASSWORD ?
                        eyeInvisible :
                        eye
                }
            </button>
        </div>
    )
}

export default InputPassword