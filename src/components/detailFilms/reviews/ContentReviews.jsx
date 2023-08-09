import React, { useState } from 'react'
import { AiTwotoneStar } from "react-icons/ai"
import Image from 'next/image'
import { parseDateTime } from '@/helpers'

const ContentReviews = (props) => {
    const { review } = props
    const [isSeeMore, setIsSeeMore] = useState(true)
    const createAt = parseDateTime(review)

    const toggleSeeMore = (e) => {
        e.preventDefault()
        setIsSeeMore(isSeeMore => !isSeeMore)
    }

    return (
        <li className='flex gap-7'>
            <div className='shrink-0 max-w-[64px] w-full'>
                <Image
                    src={`https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`}
                    width={1000}
                    height={100}
                    className='rounded-full h-16'
                    alt='' />
            </div>
            <div className='flex-grow'>
                <div className='flex items-center justify-between mt-2'>
                    <p className='text-white'>{review.author}</p>
                    <div className='text-blue flex'>
                        <AiTwotoneStar />
                        <AiTwotoneStar />
                        <AiTwotoneStar />
                        <AiTwotoneStar />
                        <AiTwotoneStar />
                    </div>
                </div>
                <span className='text-[#989898] inline-block mt-2'>
                    {isSeeMore ? review.content.slice(50) : review.content}
                    <button onClick={toggleSeeMore} className='font-medium hover:brightness-75 transition duration-300'>
                        {isSeeMore ? "... See more" : "... See less"}
                    </button>
                </span>
                <p className='text-right text-base text-[#989898]'>
                    {createAt}
                </p>
            </div>
        </li>
    )
}

export default ContentReviews