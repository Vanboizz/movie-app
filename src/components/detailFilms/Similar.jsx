import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiTwotoneStar } from "react-icons/ai"
import { useRouter } from 'next/router'

const Similar = (props) => {
  const { similar } = props
  const router = useRouter()
  const type = router.query.tab
  return (
    <li>
      <Link href={{
        pathname: `/${type}/${similar.id}`,
      }} className="flex gap-4 items-center hover:brightness-75 transition duration-300">
        <div className='shrink-0'>
          <Image
            src={`https://image.tmdb.org/t/p/w154${similar.poster_path || '/kG5mhhIZrpYDySz1tLGtVx1muO.jpg'}`}
            width={100}
            height={150}
            alt="image"
            className="rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <p className="text-white text-lg mb-3 t-ellipsis-2">{similar.original_name || similar.original_title}</p>
          {
            similar.first_air_date ?
              <p className="mb-4 text-[#989898]">{similar.first_air_date}</p>
              :
              <p className="mb-4 text-[#989898]">{similar.release_date}</p>

          }
          <div className="inline-flex border text-sm border-blue items-center gap-1 px-1 py-0.5 rounded-xl">
            <span className="text-blue">{similar.vote_average}</span>
            <AiTwotoneStar className="text-blue" />
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Similar