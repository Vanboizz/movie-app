import apiMovie from '@/apis/movie.api'
import React from 'react'
import { AiOutlineSearch, AiFillStar, AiTwotoneCalendar } from "react-icons/ai"
import { BiDotsVerticalRounded } from "react-icons/bi"
import Season from '@/components/watchFilms/Season'
import Link from 'next/link'
import moment from 'moment'
import { useRouter } from 'next/router'

const Watch = ({ detailMovie, season, id, tab }) => {
    const router = useRouter()
    const querySeason = router.query.season || 0
    const queryEpisode = router.query.episode || 0

    return (
        <div className='grid grid-cols-4 pt-6'>
            <div className='col-span-3 px-5'>
                <div>
                    <iframe
                        src={`https://www.2embed.to/embed/tmdb/${tab}?id=${id}&s=1&e=1`}
                        className='w-full h-[560px]' >
                    </iframe>
                </div>
                <div className='mt-4'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-white text-3xl font-medium'>
                                <Link href={{
                                    pathname: `/${tab}/${id}`,
                                }} className='hover:brightness-75 transition duration-300'>
                                    {detailMovie.original_name || detailMovie.original_title}
                                </Link>
                            </h1>
                            <div className='flex gap-5 mt-4'>
                                <div className='flex gap-2 items-center'>
                                    <AiFillStar size={24} className='text-blue' />
                                    <p className='text-[#989898] text-lg'>{season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].vote_average}</p>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <AiTwotoneCalendar size={24} className='text-blue' />
                                    <p className='text-[#989898] text-lg'> {season[querySeason].episodes[queryEpisode] && moment(season[querySeason].episodes[queryEpisode].air_date, 'YYYY-MM-DD').format('YYYY')}</p>
                                </div>
                            </div>
                            <ul className='flex flex-wrap gap-2 mt-3'>
                                {
                                    detailMovie.genres.map((genres, index) => (
                                        <li key={index}>
                                            <Link href={{
                                                pathname: '/explore',
                                                query: { genre: genres.id }
                                            }} className='px-3 py-1 bg-[#333335] rounded-full hover:brightness-90 duration-300 transition text-white'>
                                                {genres.name}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div>
                            <h2 className='uppercase text-right italic text-[#d4d4d4] text-xl'>{season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].name}</h2>
                            <p className='text-right mt-2 text-[#989898] text-lg'>
                                Season {season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].season_number} - Episode {season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].episode_number}
                            </p>
                        </div>
                    </div>
                    <div className='text-xl font-medium text-white mt-5'>
                        Overview:
                    </div>
                    <span className='text-lg mt-1 text-[#989898]'>
                        {season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].overview}
                    </span>
                </div>
            </div>
            <div className='col-span-1 px-4'>
                <div>
                    <form className="relative">
                        <button className="absolute top-2 left-3" onClick={(e) => e.preventDefault()}>
                            <AiOutlineSearch size={25} className="text-[#989898]" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full outline-none text-white bg-[#333335] rounded-full pr-7 pl-14 py-2"
                        />
                    </form>
                </div>
                <div className='flex justify-between items-center mt-4 text-white'>
                    <p className='text-xl font-medium '>Seasons</p>
                    <BiDotsVerticalRounded size={24} className='text-[#989898]' />
                </div>
                <div>
                    <ul id='customize' className='flex flex-col gap-4 max-h-[750px] mt-4 overflow-y-auto'>
                        {
                            season.map((item, index) => (
                                <Season key={index} i={index} item={item} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Watch

export const getServerSideProps = async (context) => {
    const id = context.params.watchid
    const tab = context.params.tab
    const query = {
        id, tab
    }

    if (!query.id) {
        return {
            notFound: true
        }
    }

    let listPromise = [];
    const detailMovie = await apiMovie.getDetailMovie(query)
    detailMovie.data.seasons.map((season) => {
        // push promise to array
        listPromise.push(apiMovie.getSeason(query, season.season_number))
    })

    const listSeason = await Promise.all(listPromise)
    const season = listSeason.map((list) => {
        return list.data
    })

    return {
        props: {
            detailMovie: detailMovie.data,
            season: season,
            id: id,
            tab: tab
        }
    }
}