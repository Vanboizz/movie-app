import React from 'react'
import classNames from 'classnames'


const InputText = (props) => {
    const { name, register, handleChange, errors, state, icon } = props

    const styleInput = "style-input"

    const inputClases = classNames(styleInput, {
        ' top-[0] peer-focus:top-0 transition-all duration-500 capitalize': state,
        ' top-[50%] capitalize': !state
    })

    return (
        <div className='relative text-center mt-4'>
            <input
                id={name}
                autoComplete="off"
                name={name}
                className="w-full rounded-lg h-12 px-3 text-zinc bg-gray outline-none peer"
                {...register(name)}
                onChange={handleChange}
            />
            <p className='text-red font-bold flex'>{errors.email?.message}</p>
            <label htmlFor="email" className={inputClases}>{name}</label>
            {icon}
        </div>
    )
}

export default InputText