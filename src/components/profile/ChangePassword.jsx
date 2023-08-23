import React from 'react'

const ChangePassword = (props) => {
    const { setPassword, errors, password, register } = props
    return (
        <>
            <div className='flex-1'>
                <input type="password" {...register("password")} value={password} onChange={(e) => setPassword(e.target.value)} className='bg-[#333335] selection:text-blue text-zinc py-3 rounded-md outline-none px-5 text-blaxc w-full' placeholder='New password' />
                <p className='style-error'>{errors.password?.message}</p>
            </div>
        </>
    )
}

export default ChangePassword