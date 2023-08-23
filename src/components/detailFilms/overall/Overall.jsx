import React from 'react'
import SpokenLanguage from './SpokenLanguage'

const Overall = (props) => {
    const { detailMovie } = props

    return (
        <div>
            <div>
                <p className='text-white font-medium mb-3'>STORY</p>
                <span className='text-[#989898] inline-block'>{detailMovie.overview}</span>
            </div>
            <div>
                <p className='text-white font-medium my-4'>DETAILS</p>
                <p className='text-[#989898]'>Status: {detailMovie.status}</p>
                {detailMovie.last_air_date ?
                    <p className='text-[#989898]'>Last air date: {detailMovie.last_air_date}</p> :
                    <p className='text-[#989898]'>Release date: {detailMovie.release_date}</p>
                }
                <p className='text-[#989898]'>Spoken language: {
                    detailMovie.spoken_languages.map((spoken, index) => (
                        <SpokenLanguage key={index} spoken={spoken} />
                    ))
                }</p>
            </div>
        </div>
    )
}

export default Overall