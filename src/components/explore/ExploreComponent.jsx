import React from 'react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { AiOutlineSearch } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md"
import { listSelectOptions, queryMovieDefault, tabs } from '@/constants';
import { handleFetchData } from '@/helpers';
import { useRouter } from 'next/router';
import apiMovie from '@/apis/movie.api';
import FilterByRuntime from '@/components/explore/FilterByRuntime';
import FilterByDate from '@/components/explore/FilterByDate';
import FilterByGenres from '@/components/explore/FilterByGenres';
import InfiniteScrollData from '@/components/explore/InfiniteScrollData';
import Tab from '@/components/base/tab/Tab';
import SortBy from './SortBy';

const ExploreComponent = () => {
    const [type, setType] = useState(queryMovieDefault.type);
    const router = useRouter()
    const [selected, setSelected] = useState()
    const [isOpenSort, setIsOpenSort] = useState(false)
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [page, setPage] = useState(1)
    const [genres, setGenres] = useState([]);
    const [selection, setSelection] = useState([])
    const [discover, setDiscover] = useState([])
    const [loading, setLoading] = useState(false)
    const [runtime, setRuntime] = useState({ min: queryMovieDefault.min, max: queryMovieDefault.max });
    const [date, setDate] = useState({
        from: router.query.from || queryMovieDefault.from,
        to: router.query.to || queryMovieDefault.to
    })

    useEffect(() => {
        const sort_by = router.query.sort_by || queryMovieDefault.selected
        const from = router.query.from || queryMovieDefault.from
        const to = router.query.to || queryMovieDefault.to
        const min = router.query.minRuntime || queryMovieDefault.min
        const max = router.query.maxRuntime || queryMovieDefault.max

        if (typeof window !== 'undefined') {
            if (localStorage.getItem('tab') === null) {
                setType('tv');
            }
            if (localStorage.getItem('tab') !== null) {
                setType(localStorage.getItem('tab'));
            }
        }
        setSelected(sort_by)
        if (router.query.genre && typeof router.query.genre === "object") {
            setSelection(router.query.genre || [])
        }
        else if (router.query.genre && typeof router.query.genre == "string") {
            setSelection([router.query.genre])
        }
        setDate({
            ...date,
            from: from,
            to: to
        })
        setRuntime({
            ...runtime,
            min: min,
            max: max
        })
    }, [router.query])

    //  Lần đầu tiên hoặc khi selected or type thay đổi chạy vào hàm này reset lại data
    useEffect(() => {
        setDiscover([])
        setPage(1)
        getListGenre()
        getListMovie()
        localStorage.setItem('tab', type)
    }, [selected, type, date, runtime])

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
            to: date.to,
            genres: selection,
            min: runtime.min,
            max: runtime.max
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
            to: date.to,
            genres: selection,
            min: runtime.min,
            max: runtime.max
        }
        apiMovie.getListDiscover(query)
            .then(response => {
                setDiscover((prev) => [...prev, ...response.data.results])
                setPage(page + 1)
            })
            .catch(error => console.log(error))
    }

    // multiple checkbox
    const toggleSelection = (e, id) => {
        e.preventDefault()
        const isChecked = selection.includes(id)
        if (isChecked) {
            setSelection(selection.filter(sel => sel !== id))
            router.push({
                query: {
                    ...router.query,
                    genre: selection.filter(sel => sel !== id)
                },
            })
        }
        else {
            const newValue = [...selection, id]
            setSelection(newValue)
            router.push({
                query: {
                    ...router.query,
                    genre: newValue
                },
            })
        }
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
                        {tabs.map((tab, index) => (
                            <Tab key={index} tab={tab} type={type} setType={setType} />
                        ))}
                    </div>
                    <InfiniteScrollData type={type} discover={discover} handleFetch={handleFetch} loading={loading} />
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
                                <SortBy
                                    selected={selected}
                                    handleOnChangeSelected={handleOnChangeSelected}
                                    listSelectOptions={listSelectOptions}
                                />
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
                            !isOpenFilter &&
                            <div className='py-3 border-t border-gray'>
                                <FilterByGenres genres={genres} selection={selection} toggleSelection={toggleSelection} />
                                <FilterByRuntime min={queryMovieDefault.min} max={queryMovieDefault.max} step={5} runtime={runtime} setRuntime={setRuntime} />
                                <FilterByDate from={date.from} to={date.to} handleOnChangeDate={handleOnChangeDate} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExploreComponent