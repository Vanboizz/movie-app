import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { listSelectOptions, queryMovieDefault, tabs } from '@/constants';
import Link from 'next/link';
import { handleFetchData } from '@/helpers';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from '@/components/base/renderData/MovieList';
import { useRouter } from 'next/router';
import apiMovie from '@/apis/movie.api';
import GenresList from '@/components/base/renderData/GenresList';

const Explore = () => {
    // type
    const [type, setType] = useState(queryMovieDefault.type);

    // router
    const router = useRouter()

    // selected
    const [selected, setSelected] = useState()

    //isOpenSort
    const [isOpenSort, setIsOpenSort] = useState(false)

    //isOpenFilter
    const [isOpenFilter, setIsOpenFilter] = useState(false)

    // page
    const [page, setPage] = useState(1)

    //genres
    const [genres, setGenres] = useState([]);

    //discover
    const [discover, setDiscover] = useState([])

    // loading
    const [loading, setLoading] = useState(false)

    // date
    const [date, setDate] = useState({
        from: router.query.from || queryMovieDefault.from,
        to: router.query.to || queryMovieDefault.to
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (localStorage.getItem('tab') === null) {
                setType('tv');
            }
            if (localStorage.getItem('tab') !== null) {
                setType(localStorage.getItem('tab'));
            }
        }
        const sort_by = router.query.sort_by || queryMovieDefault.selected
        const from = router.query.from || queryMovieDefault.from
        const to = router.query.to || queryMovieDefault.to

        setSelected(sort_by)
        setDate({
            ...date,
            from: from,
            to: to
        })
    }, [router.query])

    //  Lần đầu tiên hoặc khi selected or type thay đổi chạy vào hàm này reset lại data
    useEffect(() => {
        setDiscover([])
        setPage(1)
        getListGenre()
        getListMovie()
        localStorage.setItem('tab', type)
    }, [selected, type, date])

    // fetch data genre
    const getListGenre = async () => {
        const response = await handleFetchData(`/3/genre/${type}/list`)
        setGenres(response.genres)
    }

    const handleOnChangeSelected = (e) => {
        e.preventDefault()
        // giữ các query cũ và thêm query mới cho url
        router.push({
            query: {
                ...router.query,
                sort_by: e.target.value
            },
        })
    }

    const handleOnChangeDate = (e) => {
        e.preventDefault()
        // giữ các query cũ và thêm query mới cho url
        router.push({
            query: {
                ...router.query,
                [e.target.name]: e.target.value
            }
        })
    }

    // lấy danh sách phim cho page đầu tiên
    const getListMovie = async () => {
        const query = {
            page: 1,
            selected,
            type,
            from: date.from,
            to: date.to
        }
        setLoading(true)
        apiMovie.getListDiscover(query)
            .then(response => {
                setDiscover(response.data.results.map((item) => ({
                    ...item,
                    name: item.name || item.title,
                })))
            })
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    //  Khi scroll xuống cuối thì gọi hàm này fetch thêm data vô
    const handleFetch = () => {
        // Lấy page là trang tiếp theo 
        const query = {
            page: page + 1,
            selected,
            type,
            from: date.from,
            to: date.to
        }
        apiMovie.getListDiscover(query)
            .then(response => {
                setDiscover((prev) => [...prev, ...response.data.results])
                setPage(page + 1)
            })
            .catch(error => console.log(error))
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
                        dataLength={discover && discover.length ? discover.length : 0}
                        next={handleFetch}
                        hasMore={true}
                        loader={<p>123</p>}
                        endMessage={
                            <p className='text-center text-white'>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className='grid grid-cols-5 gap-4 mt-4' >
                            {loading && discover.map((items, index) => (
                                <MovieList.Loading key={index} />
                            ))}
                        </div>
                        <div className='grid grid-cols-5 gap-4 mt-4' >
                            {!loading && discover.map((items, index) => (
                                <MovieList key={index} items={items} />
                            ))}
                        </div>
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
                                <select value={selected} name="" id=""
                                    onChange={handleOnChangeSelected} className='bg-[#49494B] outline-none text-md font-medium text-white p-2 rounded-md w-full'>
                                    {
                                        listSelectOptions.map((item, index) => (
                                            <option key={index} value={item.value}>{item.name}</option>
                                        ))
                                    }
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
                                            <GenresList key={index} value={value} />
                                        ))
                                    }
                                </ul>
                                <p className='text-lg mt-4 text-[#cbd5e1] font-semibold'>Runtime</p>
                                <p className='text-lg mt-4 text-[#cbd5e1] font-semibold'>Release Dates</p>
                                <div className='flex flex-col gap-3 text-[#989898] mt-2'>
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="from" className='font-medium'>From:</label>
                                        <input type="date" id='from' name='from' value={date.from} className='outline-none px-2 py-1 rounded-md bg-[#49494B]' onChange={handleOnChangeDate} />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <label htmlFor="to" className='font-medium'>To:</label>
                                        <input type="date" id='to' name='to' value={date.to} className='outline-none px-2 py-1 rounded-md bg-[#49494B]' onChange={handleOnChangeDate} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Explore