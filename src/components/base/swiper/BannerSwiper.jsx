import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Parallax, Navigation, Autoplay } from 'swiper/modules';

// Link
import Link from 'next/link';

// Image
import Image from 'next/image';

import { AiTwotoneStar } from 'react-icons/ai';
import LoadingSkeleton from '@/components/base/loading/LoadingSkeleton';
import { BsFillPlayFill } from "react-icons/bs"

const BannerSwiper = (props) => {
    const { type, trending } = props
    return (
        <div className="mt-4 max-w-[900px] banner group">
            <Swiper
                speed={600}
                parallax={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Parallax, Navigation, Autoplay]}
                className="mySwiper"
            >
                {
                    trending.map((value, index) => (
                        <SwiperSlide key={index}>
                            <Link href={{
                                pathname: `/${type}/${value.id}`,
                            }}>
                                <div className="absolute w-full h-full top-0 left-0 background"></div>
                                <Image
                                    src={`https://image.tmdb.org/t/p/w1280${value.backdrop_path}`}
                                    width={1280}
                                    height={200}
                                    alt="imgs"
                                    className="rounded-xl h-[396px]"
                                />
                                <div>
                                    <div className="absolute top-3 right-5 bg-blue flex items-center gap-1 px-1 py-0.5 rounded-xl">
                                        <span className="text-white">{value.vote_average}</span>
                                        <AiTwotoneStar color="white" />
                                    </div>
                                    <div className='absolute top-1/2 left-1/2 transition -translate-x-1/2 -translate-y-1/2
                                    w-16 h-16 rounded-full bg-gradient-to-br from-blue to-[#c353b4] flex items-center invisible group-hover:visible justify-center duration-700'>
                                        <BsFillPlayFill size={40} className='text-white' />
                                    </div>
                                    <h1 className="text-blue absolute top-10 left-6 text-5xl font-bold w-[500px] flex-wrap">
                                        {value.name}
                                    </h1>
                                    <p className="text-white absolute top-28 left-6 text-2xl font-bold mt-10">
                                        {value.name}
                                    </p>
                                    <span className="absolute top-40 left-6 text-[#989898] mt-4">
                                        First air date: {value.release_date}
                                    </span>
                                    <ul className="absolute top-44 left-6 text-[#989898] mt-14 flex flex-wrap gap-3">
                                        {
                                            value.genre_ids.map((item, index) => (
                                                <li key={index} className="border border-white px-3 py-[4px] rounded-2xl">{item.name}</li>
                                            ))
                                        }

                                    </ul>
                                    <span className="absolute top-44 left-6 text-[#989898] mt-24 w-[500px] flex flex-wrap t-ellipsis-4 ">
                                        {value.overview}
                                    </span>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    );
};

const Loading = () => {
    return (
        <div className="mt-4 max-w-[900px] banner">
            <div>
                <LoadingSkeleton className='w-full h-96 rounded-2xl'></LoadingSkeleton>
            </div>
        </div>
    );
}

BannerSwiper.Loading = Loading

export default BannerSwiper;
