import React, { memo } from 'react'

const Videos = (props) => {
    const { video } = props

    return (
        <li >
            <div>
                <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${video.key}`} />
            </div>
        </li>
    )
}

export default memo(Videos)