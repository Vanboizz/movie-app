import React from 'react'
import Link from 'next/link';

const Tab = (props) => {
    const { tab, type, setType } = props

    return (
        <Link
            href=""
            className={`${type === tab
                ? 'text-white font-bold after:absolute after:bottom-0 after:left-0 after:bg-white after:h-0.5 after:w-4 transition duration-300 hover:text-white translate-x-0 after:translate-y-3'
                : 'text-[#989898]'
                } transition duration-300`}
            onClick={() => {
                setType(tab);
                localStorage.setItem('tab', tab);
            }}
        >
            <p>{tab.charAt(0).toUpperCase() + tab.slice(1)}</p>
        </Link>
    )
}

export default Tab