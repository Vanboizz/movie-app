import React from 'react'

const TabsDetailMovie = (props) => {
    const { tabs, type, setType } = props
    return (
        <li className='hover:text-white'>
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
    )
}

export default TabsDetailMovie