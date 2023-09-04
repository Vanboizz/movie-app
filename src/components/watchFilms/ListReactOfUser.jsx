import React from 'react'
import Image from 'next/image'

const ListReactOfUser = (props) => {
    const { value, listReaction } = props
    return (
        <li className='flex justify-between items-center'>
            <div className='flex gap-3 items-center'>
                <Image
                    className="rounded-full w-10 h-10 shrink-0 object-cover"
                    src={value.avt}
                    width={150}
                    height={28}
                    alt="user"
                />
                <p className='text-[#d1d5db]'>{value.name}</p>
            </div>
            <div>
                {
                    listReaction.map((react, index) => (
                        <div key={index}>
                            {
                                react.name === value.type
                                    ?
                                    react.icon
                                    :
                                    null
                            }
                        </div>
                    ))
                }
            </div>
        </li>
    )
}

export default ListReactOfUser