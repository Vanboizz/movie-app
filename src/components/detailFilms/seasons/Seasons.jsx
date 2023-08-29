import React, { memo } from 'react'
import Episodes from './Episodes'
import { totalEpisodes, totalSeason } from '@/helpers'

const Seasons = (props) => {
    const { detailMovie } = props

    const sumSeason = totalSeason(detailMovie)
    const sumEpisodes = totalEpisodes(detailMovie)

    return (
        <>
            <div className='flex justify-between mb-8 text-[#989898]'>
                <p>Total seasons :{sumSeason}</p>
                <p>Total episodes: {sumEpisodes}</p>
            </div>
            <ul id='customize' className='max-h-[400px] overflow-y-auto flex flex-col gap-8 pr-4'>
                {
                    detailMovie.seasons && detailMovie.seasons.length !== 0 ?
                        detailMovie.seasons.map((season, index) => (
                            <Episodes key={index} season={season} />
                        ))
                        :
                        <p className='text-white text-lg mt-10 text-center'>There is no reviews yet.</p>
                }
            </ul>
        </>
    )
}

export default memo(Seasons)