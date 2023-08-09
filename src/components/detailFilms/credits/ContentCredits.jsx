import React from 'react'
import Image from 'next/image'

const ContentCredits = (props) => {
    const { credit } = props

    return (
        <li className='flex gap-3 items-center'>
            <div>
                <Image
                    src={`https://image.tmdb.org/t/p/w185${credit.profile_path}` || background}
                    width={1000}
                    height={0}
                    className='w-16 h-16 rounded-full'
                    alt='' />
            </div>
            <div className='flex-grow'>
                <p className='text-blue text-lg font-medium'>{credit.name}</p>
                <p className='text-white text-base'>
                    <span>as</span> {credit.character}
                </p>
            </div>
        </li>
    )
}

export default ContentCredits