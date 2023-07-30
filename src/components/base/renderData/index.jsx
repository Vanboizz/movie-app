import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiTwotoneStar } from 'react-icons/ai';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const RenderData = (props) => {
    const { discover } = props

    return (
        <div className='grid grid-cols-5 gap-4 mt-4'>
            {
                discover.map((items, index) => (
                    <Link href="" key={index} >
                        <div className='relative hover:scale-105 hover:brightness-110 duration-300'>
                            <div className="absolute top-2 left-2 bg-blue flex items-center gap-0.5 px-1 py-0.5 rounded-xl">
                                <span className="text-white text-xs">{items.vote_average}</span>
                                <AiTwotoneStar color="white" size={12} />
                            </div>
                            <Image className='rounded-md' src={`https://image.tmdb.org/t/p/w342${items.poster_path}`} height={300} width={200} alt='img' />
                            <p className='text-[#CCD0D6] text-center mt-1'>{items.name}</p>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

const Loading = (props) => {
    const { discover } = props
    return (
        <div className='grid grid-cols-5 gap-4 mt-4'>
            {
                discover.map((values, index) => (
                    <Link href="" key={index} >
                        <div>
                            <LoadingSkeleton className='w-full h-64 rounded-2xl'></LoadingSkeleton>
                        </div >
                        <div className='text-white text-center mt-1'>
                            <LoadingSkeleton className='w-full h-3 rounded-2xl mt-1'></LoadingSkeleton>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

RenderData.Loading = Loading

export default RenderData