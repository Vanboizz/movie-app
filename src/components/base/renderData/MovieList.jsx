import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiTwotoneStar } from 'react-icons/ai';
import LoadingSkeleton from '@/components/base/loading/LoadingSkeleton';

const MovieList = (props) => {
    const { items } = props
    return (
        <Link href="">
            <div className='relative hover:scale-105 hover:brightness-110 duration-300'>
                <div className="absolute top-2 left-2 bg-blue flex items-center gap-0.5 px-1 py-0.5 rounded-xl">
                    <span className="text-white text-xs">{items.vote_average}</span>
                    <AiTwotoneStar color="white" size={12} />
                </div>
                <Image
                    className='rounded-md'
                    src={`https://image.tmdb.org/t/p/w342${items.poster_path || '/p2QJ5TEqPJMAVT2h8CN5TviEqt.jpg'}`}
                    height={300}
                    width={200}
                    alt='img'
                />
                <p className='text-[#CCD0D6] text-center mt-1'>{items.name}</p>
            </div>
        </Link>
    )
}

const Loading = () => {
    return (
        <Link href="" >
            <div>
                <LoadingSkeleton className='w-full h-64 rounded-2xl'></LoadingSkeleton>
            </div >
            <div className='text-white text-center mt-1'>
                <LoadingSkeleton className='w-full h-3 rounded-2xl mt-1'></LoadingSkeleton>
            </div>
        </Link>
    )
}

MovieList.Loading = Loading

export default MovieList