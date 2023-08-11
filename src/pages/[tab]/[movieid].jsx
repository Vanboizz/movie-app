import apiMovie from '@/apis/movie.api';
import React, { useState } from 'react'
import { appRouter, tabsDetailMovie } from '@/constants';
import { AiOutlineSearch } from "react-icons/ai"
import { BiDotsVerticalRounded } from "react-icons/bi"
import Reviews from '@/components/detailFilms/reviews/Reviews';
import Credits from '@/components/detailFilms/credits/Credits';
import Overall from '@/components/detailFilms/overall/Overall';
import Seasons from '@/components/detailFilms/seasons/Seasons';
import Head from 'next/head';
import Videos from '@/components/detailFilms/Videos';
import Similar from '@/components/detailFilms/Similar';
import { useRouter } from 'next/router';
import Poster from '@/components/detailFilms/Poster';
import TabsDetailMovie from '@/components/detailFilms/TabsDetailMovie';
import ScoreRated from '@/components/detailFilms/ScoreRated';

const MovieDetail = ({ detailMovie, creditsMovie, reviewsMovie, videosMovie, similarMovie }) => {
  const [type, setType] = useState("Overall")
  const router = useRouter()

  const navigatePage = () => {
    router.push(appRouter.explore)
  }

  return (
    <>
      <Head>
        <title>{detailMovie.original_name || detailMovie.original_title} | TbtWorld</title>
        <meta name='description' content='Web devlopment' />
      </Head>
      <div className='grid grid-cols-5 bg-gray'>
        <div className='col-span-4'>
          <Poster detailMovie={detailMovie} />
          <div className='flex relative'>
            <ScoreRated detailMovie={detailMovie} />
            <div className='flex-grow px-12 flex-1 border-r border-[#3f3f46]'>
              <ul className='flex gap-10 text-lg pt-3 justify-center'>
                {
                  tabsDetailMovie.map((tabs, index) => (
                    <TabsDetailMovie key={index} tabs={tabs} type={type} setType={setType} />
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
              <ul id='customize' className='mt-4  flex flex-col gap-4 '>
                {
                  videosMovie.results.length !== 0 ? videosMovie.results.slice(0, 2).map((video, index) => (
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
                  <Similar key={index} similar={similar} />
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
  const type = context.params.tab
  const query = {
    movieid,
    type
  }
  if (!query.movieid) {
    return {
      notFound: true
    }
  }
  const [detailMovie, creditsMovie, reviewsMovie, videosMovie, similarMovie] =
    await Promise.all(
      [
        apiMovie.getDetailMovie(query),
        apiMovie.getCredits(query),
        apiMovie.getReviews(query),
        apiMovie.getVideos(query),
        apiMovie.getSimilar(query)
      ])
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