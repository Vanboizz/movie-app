import React from 'react'

const ScoreRated = (props) => {
    const { detailMovie } = props
    return (
        <div className='mt-20 pt-16 border-r border-[#3f3f46] w-full max-w-[120px] flex flex-col gap-16'>
            <div className='flex flex-col items-center gap-6'>
                <p className='text-white font-medium text-lg'>RATING</p>
                <div className='progress-bar flex justify-center items-center w-16 h-16 rounded-full'>
                    <progress
                        value={detailMovie.vote_average}
                        min="0"
                        max="100"
                        className='invisible h-0 w-0'
                    >
                        {detailMovie.vote_average}
                    </progress>
                    <span className='text-white text-sm font-base'>{detailMovie.vote_average}</span>
                </div>
            </div>
            <div className='flex flex-col items-center gap-3'>
                <p className='text-white font-medium text-lg'>EP LENGTH</p>
                <div className='flex gap-2 justify-center items-center'>
                    <p className='text-[#989898] text-2xl'>{detailMovie.episode_run_time && detailMovie.episode_run_time[0]}</p>
                    <span className='text-[#989898]'>min</span>
                </div>
            </div>
        </div>
    )
}

export default ScoreRated