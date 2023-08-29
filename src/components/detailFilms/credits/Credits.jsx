import React, { memo } from 'react'
import ContentCredits from './ContentCredits'

const Credits = (props) => {
    const { creditsMovie } = props

    return (
        <ul id='customize' className='grid grid-cols-2 gap-x-10 gap-y-8 mt-10 max-h-[400px] overflow-y-auto'>
            {
                creditsMovie.length !== 0 ? creditsMovie.map((credit, index) => (
                    <ContentCredits key={index} credit={credit} />
                )) :
                    <p className='text-white text-lg mt-10 text-center'>There is no credits yet.</p>
            }
        </ul>
    )
}

export default memo(Credits)