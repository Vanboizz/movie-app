import Link from 'next/link'
import React from 'react'

const GenresList = (props) => {
    const { value } = props
    return (
        <li className="bg-[#333335] text-[#989898] rounded-full px-2 py-1 border border-white hover:brightness-90 transition duration-300">
            <Link href="">{value.name}</Link>
        </li>
    )
}

export default GenresList