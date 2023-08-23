import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Episodes from './Episodes'
import { useRouter } from 'next/router'

const Season = (props) => {
    const { i, item } = props
    const [type, setType] = useState(0)
    const router = useRouter()
    const season = router.query.season || 0

    const handleHiden = (e) => {
        e.preventDefault()
        if (type === i) {
            setType()
        } else
            setType(i)
    }

    return (
        <li>
            <button onClick={handleHiden} className='flex items-center gap-7 hover:bg-[#333335] transition duration-300 w-full rounded-md'>
                <div>
                    <Image
                        src={`https://image.tmdb.org/t/p/w154${item.poster_path}`}
                        width={100}
                        height={150}
                        alt="image"
                        className="rounded-lg"
                    />
                </div>
                <div>
                    <p className={`${parseInt(season) === i ? 'text-blue' : 'text-white'} text-lg`}>{item.name}</p>
                    <p className='text-white'>Episode: {item.season_number}</p>
                </div>
            </button>
            {
                type === i ?
                    <ul className='flex flex-col gap-4 px-4 mt-2'>
                        {
                            item.episodes.map((episodes, index) => (
                                <Episodes key={index} index={index} i={i} episodes={episodes} />
                            ))
                        }

                    </ul> : null
            }

        </li >
    )
}

export default Season