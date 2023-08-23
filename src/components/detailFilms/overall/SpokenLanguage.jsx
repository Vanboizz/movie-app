import React from 'react'

const SpokenLanguage = (props) => {
    const { spoken } = props
    return (
        <span >{spoken.english_name},</span>
    )
}

export default SpokenLanguage