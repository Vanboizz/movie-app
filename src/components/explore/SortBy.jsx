import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"

const SortBy = (props) => {
    const { selected, handleOnChangeSelected, listSelectOptions } = props

    return (
        <>
            <p className='text-lg mb-2 text-[#cbd5e1] font-semibold'>Sort results by</p>
            <select value={selected} name="" id=""
                onChange={handleOnChangeSelected} className='bg-[#49494B] outline-none text-md font-medium text-white p-2 rounded-md w-full'>
                {
                    listSelectOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                    ))
                }
            </select>
            <MdKeyboardArrowDown size={30} color='#cbd5e1' className='absolute top-16 right-0' />
        </>
    )
}

export default SortBy