import apiMovie from '@/apis/movie.api';
import React, { useState } from 'react'
import Image from 'next/image';
import { appRouter, background, tabsDetailMovie } from '@/constants';
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai"
import { BiSolidShareAlt, BiDotsHorizontalRounded, BiDotsVerticalRounded } from "react-icons/bi"
import { BsFillPlayFill } from "react-icons/bs"
import Link from 'next/link';
import Reviews from '@/components/detailFilms/reviews/Reviews';
import Credits from '@/components/detailFilms/credits/Credits';
import Overall from '@/components/detailFilms/overall/Overall';
import Seasons from '@/components/detailFilms/seasons/Seasons';
import Head from 'next/head';
import Videos from '@/components/detailFilms/Videos';
import Similar from '@/components/detailFilms/Similar';
import { useRouter } from 'next/router';

const MovieDetail = ({ detailMovie, creditsMovie, reviewsMovie, videosMovie, similarMovie }) => {
  const [type, setType] = useState("Overall")
  const router = useRouter()

  const navigatePage = () => {
    router.push(appRouter.explore)
  }

  return (
    <>
      <Head>
        <title>{detailMovie.name} | TbtWorld</title>
        <meta name='description' content='Web devlopment' />
      </Head>
      <div className='grid grid-cols-5 bg-gray'>
        <div className='col-span-4'>
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
                <h1 className='text-white text-4xl font-bold mt-6'>{detailMovie.name}</h1>
                <ul className='flex gap-3 flex-wrap item mt-5'>
                  {
                    detailMovie.genres.slice(0, 3).map(genre => (
                      <li key={genre.id} className='mb-3'>
                        <Link href="" className='px-3 py-1 rounded-full uppercase font-medium border border-white text-white 
                        hover:brightness-75 transition duration-300'>{genre.name}</Link>
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
          <div className='flex relative pt-'>
            <div className='mt-20 pt-16 border-r border-[#3f3f46] w-full max-w-[120px] flex flex-col gap-16'>
              <div className='flex flex-col items-center gap-6'>
                <p className='text-white font-medium text-lg'>RATING</p>
                <p className='text-white'>{detailMovie.vote_average}</p>
              </div>
              <div className='flex flex-col items-center gap-3'>
                <p className='text-white font-medium text-lg'>EP LENGTH</p>
                <div className='flex gap-2 justify-center items-center'>
                  <p className='text-[#989898] text-2xl'>{detailMovie.episode_run_time[0]}</p>
                  <span className='text-[#989898]'>min</span>
                </div>
              </div>
            </div>
            <div className='flex-grow px-12 flex-1 border-r border-[#3f3f46]'>
              <ul className='flex gap-10 text-lg pt-3 justify-center'>
                {
                  tabsDetailMovie.map((tabs, index) => (
                    <li key={index} className='hover:text-white'>
                      <button
                        href=""
                        className={`${type === tabs ?
                          'text-white border-b-2 border-blue -translate-y-1  font-bold pb-2 transition duration-300' :
                          'text-[#989898] hover:text-white transittion duration'}`}
                        onClick={() => {
                          setType(tabs);
                        }}
                      >
                        {tabs}
                      </button>
                    </li>
                  ))
                }
              </ul>
              <div className={`${type === "Overall" ? 'show-content' : 'content'} text-lg mt-16 flex flex-col gap-4`}>
                <Overall detailMovie={detailMovie} />
              </div>
              <div className={`${type === "Cast" ? 'show-content' : 'content'}`}>
                <Credits creditsMovie={creditsMovie} />
              </div>
              <div className={`${type === "Reviews" ? 'show-content' : 'content'} mt-10 text-lg`}>
                <Reviews reviewsMovie={reviewsMovie} />
              </div>
              <div className={`${type === "Seasons" ? 'show-content' : 'content'} mt-10 text-lg`}>
                <Seasons detailMovie={detailMovie} />
              </div>
            </div>
            <div className='w-full max-w-[300px] px-4 pt-2'>
              <p className='text-white font-medium text-xl'>MEDIA</p>
              <ul id='customize' className='mt-4  max-h-[400px] overflow-y-auto flex flex-col gap-4 pr-4'>
                {
                  videosMovie.results.length !== 0 ? videosMovie.results.map((video, index) => (
                    <Videos key={index} video={video} />
                  )) :
                    <p className='text-white text-lg mt-10 text-center'>There is no videos yet.</p>
                }
              </ul>
            </div>
          </div>
        </div>
        <div className='col-span-1 shrink-0 px-4 mt-4'>
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
          <div className="mt-4">
            <p className="flex justify-between mb-3.5 text-xl items-center font-medium">
              <span className="text-white">Trending</span>
              <BiDotsVerticalRounded size={24} className="text-[#989898]" />
            </p>
            <ul className="flex flex-col gap-5">
              {
                similarMovie.results.slice(0, 4).map((similar, index) => (
                  <Similar key={index} similar={similar} type={type} />
                ))
              }
            </ul>
          </div>
          <button className='bg-[#333335] w-full mt-8 py-1 rounded-full text-white hover:brightness-90 transition duration-300' onClick={navigatePage}>See more</button>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const movieid = context.params.movieid
  const tab = context.params.tab
  const query = {
    movieid,
    tab
  }

  if (!query.movieid) {
    return {
      notFound: true
    }
  }
  const [detailMovie, creditsMovie, reviewsMovie, videosMovie, similarMovie] =
    await Promise.all([apiMovie.getDetailMovie(query), apiMovie.getCredits(query), apiMovie.getReviews(query), apiMovie.getVideos(query), apiMovie.getSimilar(query)])
  return {
    props: {
      detailMovie: detailMovie.data,
      creditsMovie: creditsMovie.data.cast,
      reviewsMovie: reviewsMovie.data,
      videosMovie: videosMovie.data,
      similarMovie: similarMovie.data
    }
  }
}

export default MovieDetail