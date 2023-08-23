import React from 'react'
import Image from 'next/image'

const Episodes = (props) => {
    const { season } = props
    return (
        <li >
            <div className='flex gap-3 items-center'>
                <div className='shrink-0 max-w-[120px] w-full'>
                    <Image
                        src={`https://image.tmdb.org/t/p/w185${season.poster_path}`}
                        width={1000}
                        height={0}
                        className='w-full h-full rounded-md'
                        alt=''
                    />
                </div>
                <div className='flex-grow'>
                    <div className='flex mb-3 justify-between'>
                        <p className='text-white font-medium'>Specials</p>
                        <p className='text-[#989898]'>{season.episode_count} episodes</p>
                    </div>
                    <p className='text-base text-[#989898]'>{season.air_date}</p>
                </div>
            </div>
        </li>
    )
}

export default Episodes