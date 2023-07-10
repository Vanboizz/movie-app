import React from 'react'

const Video = () => {
    return (
        <div className='relative'>
            <video autoPlay muted loop className='fixed min-w-full z-[-10] h-[136vh] top-[-134px] object-cover'>
                <source src='/assest/videos/endgame.mp4' type="video/mp4" />
            </video>

        </div>
    )
}

export default Video