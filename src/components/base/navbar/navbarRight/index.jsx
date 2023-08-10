import React from 'react';
import { AiOutlineSearch, AiTwotoneStar } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSkeleton from '@/components/base/loading/LoadingSkeleton';
import { useRouter } from 'next/router';
import { appRouter } from '@/constants';

const Filter = (props) => {
    const { data, trending, type } = props
    const router = useRouter()
    const navigatePage = () => {
        router.push(appRouter.explore)
    }
    return (
        <div className="max-w-[310px] w-full p-4 top-0 sticky right-0">
            <div>
                <form className="relative">
                    <button className="absolute top-1 left-3" onClick={(e) => e.preventDefault()}>
                        <AiOutlineSearch size={25} className="text-[#989898]" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full outline-none text-white bg-[#333335] rounded-full pr-7 pl-14 py-1"
                    />
                </form>
            </div>
            <ul className="flex gap-2 flex-wrap mt-8">
                {
                    data.slice(0, 5).map((value, index) => (
                        <li className="bg-[#404040] text-[#989898] brightness-90 transition duration-300 rounded-full px-2 py-1" key={index}>
                            <Link href={{
                                pathname: '/explore',
                                query: { genre: value.id }
                            }} >{value.name}</Link>
                        </li>
                    ))
                }
            </ul>
            <div className="mt-4">
                <p className="flex justify-between mb-3.5 text-xl items-center font-medium">
                    <span className="text-white">Trending</span>
                    <BiDotsVerticalRounded size={24} className="text-[#989898]" />
                </p>
                <ul className="flex flex-col gap-5">
                    {
                        trending.slice(0, 2).map((trend, index) => (
                            <li key={index}>
                                <Link href={{
                                    pathname: `/${type}/${trend.id}`,
                                }} className="flex gap-4 items-center hover:brightness-75 transition duration-300">
                                    <div className='shrink-0'>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w154${trend.poster_path}`}
                                            width={100}
                                            height={150}
                                            alt="image"
                                            className="rounded-lg "
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-white text-lg t-ellipsis-2 mb-3">{trend.name}</p>
                                        <p className=" text-[#989898] mb-4">{trend.release_date}</p>
                                        <div className=" border border-blue inline-flex items-center gap-1 px-1 py-0.5 rounded-xl">
                                            <span className="text-blue">{trend.vote_average}</span>
                                            <AiTwotoneStar className="text-blue" />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    }

                </ul>
            </div>
            <button className='bg-[#333335] w-full mt-12 py-1 rounded-full text-white hover:brightness-90 transition duration-300' onClick={navigatePage}>See more</button>
        </div>
    );
};

const Loading = (props) => {
    const { data, trending } = props
    return (
        <div className="max-w-[310px] w-full p-4 top-0 sticky right-0">
            <div>
                <form className="relative">
                    <button className="absolute top-1 left-3" onClick={(e) => e.preventDefault()}>
                        <AiOutlineSearch size={25} className="text-[#989898]" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full outline-none text-white bg-[#333335] rounded-full pr-7 pl-14 py-1"
                    />
                </form>
            </div>
            <ul className="flex gap-2 flex-wrap mt-8">
                {
                    data.slice(0, 5).map((value, index) => (
                        <div className="bg-[#333335] text-[#989898] rounded-full px-8 py-2" key={index}>
                            <LoadingSkeleton></LoadingSkeleton>
                        </div>
                    ))
                }
            </ul>
            <div className="mt-4">
                <div className="flex justify-between mb-3.5 text-xl items-center font-medium">
                    <LoadingSkeleton className='w-20 h-3 rounded-2xl'></LoadingSkeleton>
                    <BiDotsVerticalRounded size={24} className="text-[#989898]" />
                </div>
                <ul className="flex flex-col gap-5">
                    {
                        trending.slice(0, 2).map((value, index) => (
                            <li key={index}>
                                <div className='grid grid-cols-4 gap-3 w-full'>
                                    <div className='col-span-2'>
                                        <LoadingSkeleton className='w-full h-44 rounded-2xl'></LoadingSkeleton>
                                    </div>
                                    <div className='col-span-2'>
                                        <div className="mb-3">
                                            <LoadingSkeleton className='h-3 rounded-2xl'></LoadingSkeleton>
                                        </div>
                                        <div className="mb-4">
                                            <LoadingSkeleton className='h-3 rounded-2xl'></LoadingSkeleton>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        ))
                    }

                </ul>
            </div>
            <button className='bg-[#333335] w-full mt-12 py-1 rounded-full text-[#989898]'>See more</button>
        </div>
    );
}

Filter.Loading = Loading

export default Filter;
