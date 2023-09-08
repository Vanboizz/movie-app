const { useState } = require("react")


const useComment = () => {
    const [comment, setComment] = useState(false)
    return {
        comment, setComment
    }
}


export default useComment
