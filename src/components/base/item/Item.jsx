import classNames from 'classnames'
import React from 'react'

const Item = (props) => {
    const { selected, onClick, value } = props

    const liClasses = classNames("style-li", {
        "bg-blue text-white": selected
    })

    return (
        <li className={liClasses} onClick={onClick}>
            {value.name}
        </li>
    )
}

export default Item