import React from 'react'

const FilterByDate = (props) => {
    const { from, to, handleOnChangeDate } = props

    return (
        <div className='flex flex-col gap-3 text-[#989898] mt-2'>
            <p className='text-lg text-[#cbd5e1] font-semibold'>Release Dates</p>
            <div className='flex justify-between items-center'>
                <label htmlFor="from" className='font-medium'>From:</label>
                <input type="date" id='from' name='from' value={from} className='outline-none px-2 py-1 rounded-md bg-[#49494B]' onChange={handleOnChangeDate} />
            </div>
            <div className='flex justify-between items-center'>
                <label htmlFor="to" className='font-medium'>To:</label>
                <input type="date" id='to' name='to' value={to} className='outline-none px-2 py-1 rounded-md bg-[#49494B]' onChange={handleOnChangeDate} />
            </div>
        </div>
    )
}

export default FilterByDate