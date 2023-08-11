import React from 'react'
import Image from 'next/image'
import { AiFillHeart } from "react-icons/ai"
import { BiSolidShareAlt, BiDotsHorizontalRounded } from "react-icons/bi"
import { BsFillPlayFill } from "react-icons/bs"
import { background } from '@/constants';
import Link from 'next/link'

const Poster = (props) => {
    const { detailMovie } = props

    return (
        <div className='relative'>
            <div className="absolute w-full h-full top-0 left-0 gradient"></div>
            <div>
                <Image
                    src={`https://image.tmdb.org/t/p/w1280${detailMovie.backdrop_path}` || background}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className='w-full h-96 rounded-lg'
                    alt="img"
                >
                </Image>
            </div>
            <div className='flex gap-2 absolute top-[5%] right-[3%]'>
                <button className='border-[3px] border-white w-11 h-11 rounded-full group hover:border-blue transition duration-300'>
                    <AiFillHeart fontSize={20} className='inline-block text-white group-hover:text-blue transition duration-300' />
                </button>
                <button className='border-[3px] border-white w-11 h-11 rounded-full group hover:border-blue transition duration-300'>
                    <BiSolidShareAlt fontSize={24} className='inline-block text-white group-hover:text-blue transition duration-300' />
                </button>
                <button className='border-[3px] border-white w-11 h-11 rounded-full group hover:border-blue transition duration-300'>
                    <BiDotsHorizontalRounded fontSize={24} className='inline-block text-white group-hover:text-blue transition duration-300' />
                </button>
            </div>
            <div className='absolute left-[50%] top-[50%] transform translate-x-[-50%] flex w-full max-w-[1000px]'>
                <div>
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${detailMovie.poster_path || background}`}
                        width={180}
                        height={0}
                        className='rounded-xl'
                        alt="img"
                    />
                </div>
                <div className='ml-16'>
                    <h1 className='text-white text-4xl font-bold mt-6 t-ellipsis-1'>{detailMovie.original_name || detailMovie.original_title}</h1>
                    <ul className='flex gap-3 flex-wrap item mt-5'>
                        {
                            detailMovie.genres.slice(0, 3).map(genre => (
                                <li key={genre.id} className='mb-3'>
                                    <Link href={{
                                        pathname: '/explore',
                                        query: { genre: genre.id }
                                    }} className='px-3 py-1 rounded-full uppercase font-medium border border-white text-white 
                    hover:brightness-75 transition duration-300'>
                                        {genre.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className='ml-auto'>
                    <Link
                        href=""
                        className='flex gap-3 items-center px-5 py-2 rounded-full bg-blue
          text-white mt-20 hover:bg-[#2563EB] transition duration-300'
                    >
                        <BsFillPlayFill size={30} />
                        <span className='text-lg font-medium'>WATCH</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Poster