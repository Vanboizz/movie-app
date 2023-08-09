import React from 'react'
import Image from 'next/image';
import BannerSwiper from '@/components/base/swiper/BannerSwiper';
import { logo, tabs } from '@/constants';
import MovieSwiper from '@/components/base/swiper/MovieSwiper';
import Filter from '@/components/base/navbar/navbarRight';
import { useEffect, useState } from 'react';
import { handleFetchData, handleGetGener } from '@/helpers';
import Head from 'next/head';
import { UserAuth } from '@/hooks/useAuth';
import { BiUserCircle } from 'react-icons/bi';
import Tab from '../base/tab/Tab';

const HomeLayout = () => {
    const { user } = UserAuth();
    const [popular, setPopular] = useState([]);
    const [top_rated, setTop_rated] = useState([]);
    const [trending, setTreding] = useState([]);
    const [genres, setGenres] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [upComing, setUpComing] = useState([]);
    let types;
    const [type, setType] = useState(types);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
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
                handleFetchData(`/3/${type}/popular`),
                handleFetchData(`/3/${type}/top_rated`),
                handleFetchData(`/3/trending/${type}/week`),
                handleFetchData(`/3/genre/${type}/list`),
                handleFetchData(`/3/tv/on_the_air`),
                handleFetchData(`/3/movie/upcoming`),
            ])
                .then((response) => {
                    setPopular(
                        response[0].results.map((item) => ({
                            ...item,
                            name: item.name || item.title,
                            release_date: item.release_date || item.first_air_date,
                        })),
                    );
                    setTop_rated(
                        response[1].results.map((item) => ({
                            ...item,
                            name: item.name || item.title,
                            release_date: item.release_date || item.first_air_date,
                        })),
                    );
                    setTreding(
                        response[2].results.map((item) => ({
                            ...item,
                            name: item.name || item.title,
                            release_date: item.release_date || item.first_air_date,
                            genre_ids: handleGetGener(item.genre_ids, response[3].genres),
                        })),
                    );
                    setGenres(response[3].genres);
                    setOnTheAir(
                        response[4].results.map((item) => ({
                            ...item,
                            name: item.name || item.title,
                            release_date: item.release_date || item.first_air_date,
                        })),
                    );
                    setUpComing(
                        response[5].results.map((item) => ({
                            ...item,
                            name: item.name || item.title,
                            release_date: item.release_date || item.first_air_date,
                        })),
                    );
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [type]);

    return (
        <>
            <Head>
                <title>TbtWorld | Watch Films You Like</title>
                <meta name="description" content="Genered by create next app" />
                <link rel="icon" href={logo} />
            </Head>
            <main className="p-5 border-x border-[#3f3f46]">
                <div className="flex justify-between">
                    <div className="flex gap-5 pb-3 border-b border-[#3f3f46] relative">
                        {tabs.map((tab, index) => (
                            <Tab key={index} tab={tab} type={type} setType={setType} />
                        ))}
                    </div>
                    <div className="flex gap-1 items-center text-[#989898] pr-4">
                        <p>{user && user?.displayName}</p>
                        {user && user.photoURL ? (
                            <Image
                                className="rounded-full"
                                src={user.photoURL}
                                width={28}
                                height={28}
                                alt="user"
                            />
                        ) : (
                            <>
                                <span>Anonymous</span>
                                <BiUserCircle size={24} />
                            </>
                        )}
                    </div>
                </div>
                <div className="flex">
                    <div>
                        {loading && <BannerSwiper.Loading></BannerSwiper.Loading>}
                        {!loading && <BannerSwiper trending={trending}></BannerSwiper>}
                        {loading && <MovieSwiper.Loading data={popular}></MovieSwiper.Loading>}
                        {!loading && <MovieSwiper type={type} data={popular} name="Popular"></MovieSwiper>}
                        {loading && <MovieSwiper.Loading data={top_rated}></MovieSwiper.Loading>}
                        {!loading && <MovieSwiper type={type} data={top_rated} name="Top Rated"></MovieSwiper>}
                        {type === 'tv' ? (
                            <>
                                {loading && <MovieSwiper.Loading data={onTheAir}></MovieSwiper.Loading>}
                                {!loading && <MovieSwiper type={type} data={onTheAir} name="On The Air"></MovieSwiper>}
                            </>
                        ) : (
                            <>
                                {loading && <MovieSwiper.Loading data={upComing}></MovieSwiper.Loading>}
                                {!loading && <MovieSwiper type={type} data={upComing} name="Up Coming"></MovieSwiper>}
                            </>
                        )}
                    </div>
                    <div>
                        {loading && <Filter.Loading data={genres} trending={trending} />}
                        {!loading && <Filter data={genres} trending={trending} type={type} />}
                    </div>
                </div>
            </main>
        </>
    );
}

export default HomeLayout