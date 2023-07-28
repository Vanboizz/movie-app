import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation, Parallax } from 'swiper/modules';
import Link from 'next/link';
import Image from 'next/image';
import { AiTwotoneStar } from 'react-icons/ai';
import LoadingSkeleton from '@/components/base/loading/LoadingSkeleton';

const MovieSwiper = (props) => {
    const { data, name } = props
    return (
        <div className='max-w-[900px] movie'>
            <ul className="flex flex-col gap-10 mt-10">
                <li>
                    <h2 className="text-xl text-white font-medium mb-3">{name}</h2>
                </li>
            </ul>
            <Swiper
                speed={600}
                parallax={true}
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation, Parallax]}
                className="mySwiper"
            >
                {
                    data.map((value, i) => (
                        <SwiperSlide key={i}>
                            <Link href="">
                                <div className='hover:scale-105 transition duration-300'>
                                    <div className="absolute top-1 left-2 bg-blue flex items-center gap-0.5 px-1 py-0.5 rounded-xl">
                                        <span className="text-white text-xs">{value.vote_average}</span>
                                        <AiTwotoneStar color="white" size={12} />
                                    </div>
                                    <Image className='rounded-md' src={`https://image.tmdb.org/t/p/w342${value.poster_path}`} height={300} width={300} alt='img' />
                                    <p className='text-white text-center mt-1'>{value.name}</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

const Loading = (props) => {
    const { data } = props
    return (
        <div className='max-w-[900px] movie'>
            <ul className="flex flex-col gap-10 mt-10">
                <li>
                    <div className="text-xl text-white font-medium mb-3">
                        <LoadingSkeleton className='w-20 h-3 rounded-2xl'></LoadingSkeleton>
                    </div>
                </li>
            </ul>
            <Swiper
                speed={600}
                parallax={true}
                slidesPerView={1}
                spaceBetween={10}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
                modules={[Navigation, Parallax]}
                className="mySwiper"
            >
                {
                    data.map((value, index) => (
                        <SwiperSlide key={index}>
                            <div key={index}>
                                <div>
                                    <LoadingSkeleton className='w-full h-64 rounded-2xl'></LoadingSkeleton>
                                </div>
                                <div className='text-white text-center mt-1'>
                                    <LoadingSkeleton className='w-full h-3 rounded-2xl'></LoadingSkeleton>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

MovieSwiper.Loading = Loading

export default MovieSwiper