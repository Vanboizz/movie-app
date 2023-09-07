import apiMovie from '@/apis/movie.api'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiFillStar, AiTwotoneCalendar } from "react-icons/ai"
import { BiDotsVerticalRounded, BiSolidSend } from "react-icons/bi"
import Season from '@/components/watchFilms/Season'
import Link from 'next/link'
import moment from 'moment'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { UserAuth } from '@/hooks/useAuth'
import { Timestamp, collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { uuid } from 'uuidv4';
import ListComment from '@/components/watchFilms/ListComment'
import { sortBy } from '@/constants'
import Recommendation from '@/components/watchFilms/Recommendation'

const Watch = ({ detailMovie, recommendation, season, id, tab }) => {
    const router = useRouter()
    const { user } = UserAuth()
    const querySeason = router.query.season || 0
    const queryEpisode = router.query.episode || 0
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [tabSortBy, setTabSortBy] = useState('Latest')
    const handleWriteComment = async (e, comment) => {
        e.preventDefault()
        setComment("")
        let temp = {
            comment,
            idComments: uuid(),
            idUser: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            createdAt: Timestamp.fromDate(new Date()),
            updateAt: null,
            parent_id: null
        }
        const docRef = doc(collection(db, "comments", id, "comment"))
        await setDoc(docRef, temp)
    }

    const getDataCommentBySortBy = async (sort) => {
        const collectionComment = collection(db, "comments", id, "comment")
        const q = query(collectionComment, orderBy('createdAt', sort))
        const querySnapshotSortByDesc = await getDocs(q)
        const listComment = []
        querySnapshotSortByDesc.forEach(doc => {
            listComment.push({
                ...doc.data(),
                id: doc.id
            })
        })
        setComments(listComment)
    }

    useEffect(() => {
        if (tabSortBy === 'Latest') {
            getDataCommentBySortBy('desc')
        } else {
            getDataCommentBySortBy('asc')
        }
    }, [comment, tabSortBy])

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
                                    <p className='text-[#989898] text-lg'>
                                        {
                                            season[querySeason] && season[querySeason].episodes ?
                                                season[querySeason].episodes[queryEpisode].vote_average : detailMovie.vote_average
                                        }
                                    </p>

                                </div>
                                <div className='flex gap-2 items-center'>
                                    <AiTwotoneCalendar size={24} className='text-blue' />
                                    <p className='text-[#989898] text-lg'>

                                        {season[querySeason] && season[querySeason].episodes ?
                                            season[querySeason].episodes[queryEpisode] && moment(season[querySeason].episodes[queryEpisode].air_date, 'YYYY-MM-DD').format('YYYY')
                                            : detailMovie.release_date
                                        }
                                    </p>
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
                            <h2 className='uppercase text-right italic text-[#d4d4d4] text-xl'>
                                {season[querySeason] && season[querySeason].episodes ?
                                    season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].name : detailMovie.original_title}
                            </h2>
                            <p className='text-right mt-2 text-[#989898] text-lg'>
                                Season {season[querySeason] && season[querySeason].episodes ? season[querySeason].episodes[queryEpisode] && season[querySeason].episodes[queryEpisode].season_number : detailMovie.vote_count} - Episode {season[querySeason] && season[querySeason].episodes ? season[querySeason].episodes[queryEpisode].episode_number : detailMovie.runtime}
                            </p>
                        </div>
                    </div>
                    <div className='text-xl font-medium text-white mt-5'>
                        Overview:
                    </div>
                    <span className='text-lg mt-1 text-[#989898]'>
                        {season[querySeason] && season[querySeason].episodes ?
                            season[querySeason].episodes[queryEpisode].overview : detailMovie.overview}
                    </span>
                </div>
                <div className='my-8'>
                    <div className='flex items-center justify-between'>
                        <div className='relative '>
                            <p className='text-2xl text-white font-medium'>Comments</p>
                            <p className='absolute left-28 top-0 bg-[#333335] w-3 h-3 text-sm rounded-full flex justify-center items-center text-white'>{comments.length}</p>
                        </div>
                        <div className='flex'>
                            {
                                sortBy.map((item, index) => (
                                    <button key={index}
                                        className={
                                            ` border border-[#4b5563] px-3 py-1  hover:text-white 
                                            transition duration-300 
                                            ${item === "Latest" ? "rounded-l-xl" : "rounded-r-xl"} 
                                            ${item === tabSortBy ?
                                                'text-white bg-[#333335] font-semibold' :
                                                'text-[#989898]'}`
                                        }
                                        onClick={() => {
                                            setTabSortBy(item)
                                        }}
                                    >
                                        {item}
                                    </button>
                                ))
                            }
                        </div>
                    </div>
                    <div className='px-1'>
                        <div className='my-5'>
                            <form action="" onSubmit={(e) => handleWriteComment(e, comment)} className='flex gap-4 items-center'>
                                {user && user.photoURL && (
                                    <Image
                                        className="rounded-full w-10 h-10 shrink-0 object-cover"
                                        src={user.photoURL}
                                        width={200}
                                        height={28}
                                        alt="user"
                                    />
                                )}
                                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} className='py-2 flex-1 bg-[#333335] outline-none rounded-full px-4 text-white' placeholder='Write comment...' required />
                                <button type='submit'>
                                    <BiSolidSend size={30} className='text-blue' />
                                </button>
                            </form>
                            <ul className='mt-5'>
                                {
                                    comments.map((item, index) => (
                                        <div key={index}>
                                            {
                                                item.parent_id === null &&
                                                <ListComment
                                                    key={index}
                                                    item={item}
                                                    user={user}
                                                    id={id}
                                                    getDataCommentBySortBy={getDataCommentBySortBy} />
                                            }

                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
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
                            season.length > 0 ?
                                season.map((item, index) => (
                                    <Season key={index} i={index} item={item} />
                                ))
                                :
                                recommendation.results.map((recommend, index) => (
                                    <Recommendation key={index} recommend={recommend} tab={tab} />
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
    if (detailMovie.data.seasons) {

        detailMovie.data.seasons.map((season) => {
            // push promise to array
            listPromise.push(apiMovie.getSeason(query, season.season_number))
        })
    }

    const listSeason = await Promise.all(listPromise)
    const season = listSeason.map((list) => {
        return list.data
    })

    const recommendation = await apiMovie.getRecommendation(query)

    return {
        props: {
            detailMovie: detailMovie.data,
            season: season,
            recommendation: recommendation.data,
            id: id,
            tab: tab
        }
    }
}