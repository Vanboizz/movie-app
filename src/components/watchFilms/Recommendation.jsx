import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { AiTwotoneStar } from "react-icons/ai"

const Recommendation = (props) => {
    const { recommend, tab } = props
    return (
        <li>
            <Link href={{
                pathname: `/${tab}/${recommend.id}`,
            }} className="flex gap-4 items-center hover:brightness-75 transition duration-300">
                <div className='shrink-0'>
                    <Image
                        src={`https://image.tmdb.org/t/p/w92${recommend.poster_path || '/kG5mhhIZrpYDySz1tLGtVx1muO.jpg'}`}
                        width={100}
                        height={150}
                        alt="image"
                        className="rounded-lg"
                    />
                </div>
                <div className="flex-grow">
                    <p className="text-white text-lg mb-3 t-ellipsis-2">{recommend.original_title}</p>
                    <p className="mb-4 text-[#989898]">{recommend.release_date}</p>

                    <div className="inline-flex border text-sm border-blue items-center gap-1 px-1 py-0.5 rounded-xl">
                        <span className="text-blue">{recommend.vote_average}</span>
                        <AiTwotoneStar className="text-blue" />
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default Recommendation