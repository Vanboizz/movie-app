import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md"
import ContentReviews from './ContentReviews'

const Reviews = (props) => {
    const { reviewsMovie } = props

    return (
        <>
            <div className='flex gap-4 justify-end text-[#989898]'>
                <p>Sort Rating: </p>
                <div className='flex items-center'>
                    <select name="" id="" className='outline-none bg-gray'>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                    <MdKeyboardArrowDown size={24} />
                </div>
            </div>
            <div>
                <ul id='customize' className='flex flex-col gap-12 max-h-[360px] overflow-y-auto pr-4'>
                    {
                        reviewsMovie.results.length !== 0 ? reviewsMovie.results.map((review, index) => (
                            <ContentReviews key={index} review={review} />
                        ))
                            :
                            <p className='text-white text-lg mt-10 text-center'>There is no reviews yet.</p>
                    }
                </ul>
            </div>

        </>
    )
}

export default Reviews