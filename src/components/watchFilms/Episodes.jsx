import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Episodes = (props) => {
    const { index, episodes, i } = props
    const [check, setCheck] = useState()
    const router = useRouter()

    useEffect(() => {
        const season = router.query.season || 0
        if (i === parseInt(season)) {
            setCheck(router.query.episode || 0)
        } else {
            setCheck()
        }
    }, [router.query])

    const handleCheck = (e) => {
        e.preventDefault()
        router.push({
            query: {
                ...router.query,
                season: i,
                episode: index
            }
        })
    }

    return (
        <li >
            <button onClick={handleCheck} className='flex items-center gap-3 hover:bg-[#333335] transition duration-300 w-full rounded-md py-1'>
                <div className='shrink-0 max-w-[15px] w-full'>
                    <p className={`${parseInt(check) === index ? 'text-blue' : 'text-white'}`}>
                        {episodes.episode_number}
                    </p>
                </div>
                <div className='shrink-0 max-w-[120px] w-full '>
                    <Image
                        src={`https://image.tmdb.org/t/p/w154${episodes.still_path}`}
                        width={200} height={0}
                        className='w-full'
                        alt=''
                    />
                </div>
                <div className='flex-grow'>
                    <p className='text-[#989898] text-xs'>
                        {episodes.name}
                    </p>
                </div>
            </button>
        </li>
    )
}

export default Episodes