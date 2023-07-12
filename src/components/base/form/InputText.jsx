import React from 'react'
import { AiOutlineMail } from "react-icons/ai"
import classNames from 'classnames'


const InputText = (props) => {
    const { name, register, handleChange, errors, state } = props

    const styleInput = "absolute transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none"

    const inputClases = classNames(styleInput, {
        ' top-[0] peer-focus:top-0 transition-all duration-500': state,
        ' top-[50%]': !state
    })

    return (
        <div className='relative text-center mt-4'>
            <input
                id="email"
                autoComplete="off"
                name={name}
                className="w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer"
                onChange={handleChange}
                {...register(name)}
            />
            <p className='text-red font-bold flex'>{errors.email?.message}</p>

            <label htmlFor="email" className={inputClases}>Email</label>

            {/* <label htmlFor="email" className='absolute top-[50%] transform translate-y-[-50%] left-[16px] select-none text-zinc pointer-events-none '>Email</label> */}
            <AiOutlineMail size={24} className='absolute top-2 right-3 text-zinc' />
        </div>


    )
}

export default InputText