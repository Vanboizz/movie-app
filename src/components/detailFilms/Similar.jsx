import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiTwotoneStar } from "react-icons/ai"

const Similar = (props) => {
  const { similar, type } = props
  console.log(similar);
  return (
    <li>
      <Link href={{
        pathname: `/${type}/${similar.id}`,
      }} className="flex gap-3 items-start hover:brightness-75 transition duration-300">
        <div>
          <Image
            src={`https://image.tmdb.org/t/p/w154${similar.poster_path || '/kG5mhhIZrpYDySz1tLGtVx1muO.jpg'}`}
            width={100}
            height={150}
            alt="image"
            className="rounded-lg max-w-none"
          />
        </div>
        <div className="flex-grow">
          <p className="text-white text-lg mb-3">{similar.name}</p>
          <p className="mb-4 text-[#989898]">{similar.first_air_date}</p>
          <div className="absolute border border-blue flex items-center gap-1 px-1 py-0.5 rounded-xl">
            <span className="text-blue">{similar.vote_average}</span>
            <AiTwotoneStar className="text-blue" />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Similar