import React from 'react'
import Item from '@/components/base/item/Item'

const FilterByGenres = (props) => {
    const { genres, selection, toggleSelection } = props

    return (
        <>
            <p className='text-lg mb-2 text-[#cbd5e1] font-semibold'>Genres</p>
            <ul id='customize' className="flex gap-2 flex-wrap mt-8 max-h-[210px] overflow-y-auto">
                {
                    genres.map((value) => (
                        <Item
                            key={value.id}
                            selected={selection.includes(value.id.toString())}
                            onClick={(e) => toggleSelection(e, value.id.toString())}
                            value={value}
                        />
                    ))
                }
            </ul>
        </>
    )
}

export default FilterByGenres