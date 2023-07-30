import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { tabs } from '@/constants';
import Link from 'next/link';
import { handleFetchData } from '@/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import RenderData from '@/components/base/renderData';

const Explore = () => {
    // type
    let types;
    const [type, setType] = useState(types);

    // selected
    const [selected, setSelected] = useState("Most Popular")

    //isOpenSort
    const [isOpenSort, setIsOpenSort] = useState(false)

    //isOpenFilter
    const [isOpenFilter, setIsOpenFilter] = useState(false)

    // no more
    const [noMore, setNoMore] = useState(true)

    // page
    const [page, setPage] = useState(2)

    //genres
    const [genres, setGenres] = useState([]);

    //discover
    const [discover, setDiscover] = useState([])

    // loading
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('tab') === null) {
                setType('tv');
            }
            if (localStorage.getItem('tab') !== null) {
                setType(localStorage.getItem('tab'));
            }
        }
        if (type) {
            Promise.all([
                handleFetchData(`/3/discover/${type}?page=1`),
                handleFetchData(`/3/genre/${type}/list`)
            ])
                .then((response) => {
                    setGenres(response[1].genres)
                    setDiscover(response[0].results.map((item) => ({
                        ...item,
                        name: item.name || item.title,
                    })))
                })
                .catch(error => console.log(error))
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [type])

    const renderData = async () => {
        const res = await handleFetchData(`/3/discover/${type}?page=${page}`)
        const data = await res.results;
        return data
    }

    const connectData = async () => {
        const filmsFormServer = await renderData()

        setDiscover((prev) => [...prev, ...filmsFormServer])

        if (filmsFormServer.length === 0 || filmsFormServer.length < 20) {
            setNoMore((prev) => !prev)
        }

        setPage((prev) => prev + 1)
    }

    return (
        <>
            <Head>
                <title>Explore | TbtWorld</title>
                <meta name='description' content='Web devlopment' />
            </Head>
            <div className='grid grid-cols-4'>
                <div className='col-span-3 px-4 pt-4'>
                    <div className='flex justify-between mb-7'>
                        <h2 className='text-white text-3xl font-medium uppercase'>
                            Find films that best fit you
                        </h2>
                        <form className="relative">
                            <button className="absolute top-2 left-3" onClick={(e) => e.preventDefault()}>
                                <AiOutlineSearch size={25} className="text-[#989898]" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full outline-none text-white bg-[#333335] rounded-full px-14 py-2"
                            />
                        </form>
                    </div>
                    <div className="flex gap-5 pb-3 border-b border-[#3f3f46] relative">
                        {tabs.map((tab) => (
                            <Link
                                key={tab}
                                href=""
                                className={`${type === tab
                                    ? 'text-white font-bold after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-4 transition duration-300 hover:text-white translate-x-0 after:translate-y-3'
                                    : 'text-[#989898]'
                                    }`}
                                onClick={() => {
                                    setType(tab);
                                    localStorage.setItem('tab', tab);
                                }}
                            >
                                <p>{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
                            </Link>
                        ))}
                    </div>
                    <InfiniteScroll
                        dataLength={discover.length}
                        next={connectData}
                        hasMore={noMore}
                        loader={<p className='text-white'>abc</p>}
                        endMessage={
                            <p className='text-center text-white'>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {loading && <RenderData.Loading discover={discover}></RenderData.Loading>}
                        {!loading && <RenderData discover={discover}></RenderData>}
                    </InfiniteScroll>
                </div>
                <div className='col-span-1 pt-10 px-8'>
                    <div className='bg-[#333335] px-4 pt-3 rounded-md shadow-md'>
                        <div className='flex justify-between items-center text-white pb-3'>
                            <p className='text-lg'>Sort</p>
                            <button onClick={() => setIsOpenSort((prev) => !prev)}>
                                {
                                    !isOpenSort ? <MdKeyboardArrowDown size={30} /> :
                                        <MdKeyboardArrowRight size={30} />
                                }
                            </button>
                        </div>
                        {
                            !isOpenSort &&
                            <div className='py-3 border-t border-gray relative'>
                                <p className='text-lg mb-2 text-[#cbd5e1] font-semibold'>Sort results by</p>
                                <select value={selected} name="" id="" onChange={(e) => setSelected(e.target.value)} className='bg-[#49494B] outline-none text-md font-medium text-white p-2 rounded-md w-full'>
                                    <option value="Most Popular">Most Popular</option>
                                    <option value="Most Rating">Most Rating</option>
                                    <option value="Most Recent">Most Recent</option>
                                </select>
                                <MdKeyboardArrowDown size={30} color='#cbd5e1' className='absolute top-16 right-0' />
                            </div>
                        }

                    </div>
                    <div className='bg-[#333335] px-4 pt-3 rounded-md shadow-md mt-4'>
                        <div className='flex justify-between items-center text-white pb-3'>
                            <p className='text-lg'>Filter</p>
                            <button onClick={() => setIsOpenFilter((prev) => !prev)}>
                                {
                                    !isOpenFilter ? <MdKeyboardArrowDown size={30} /> :
                                        <MdKeyboardArrowRight size={30} />
                                }
                            </button>
                        </div>
                        {
                            !isOpenFilter && <div className='py-3 border-t border-gray'>
                                <p className='text-lg mb-2 text-[#cbd5e1] font-semibold'>Genres</p>
                                <ul id='customize' className="flex gap-2 flex-wrap mt-8 max-h-[200px] overflow-y-auto">
                                    {
                                        genres.map((value, index) => (
                                            <li className="bg-[#333335] text-[#989898] rounded-full px-2 py-1 border border-white hover:brightness-90 transition duration-300" key={index}>
                                                <Link href="">{value.name}</Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <p className='text-lg mt-4 text-[#cbd5e1] font-semibold'>Runtime</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore