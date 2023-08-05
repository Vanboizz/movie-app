import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from './MovieList';

const InfiniteScrollData = (props) => {
    const { discover, handleFetch, loading } = props

    return (
        <InfiniteScroll
            dataLength={discover && discover.length ? discover.length : 0}
            next={handleFetch}
            hasMore={true}
            loader={null}
            endMessage={
                <p className='text-center text-white'>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className='grid grid-cols-5 gap-4 mt-4' >
                {loading && discover.map((items, index) => (
                    <MovieList.Loading key={index} />
                ))}
            </div>
            <div className='grid grid-cols-5 gap-4 mt-4' >
                {!loading && discover.map((items, index) => (
                    <MovieList key={index} items={items} />
                ))}
            </div>
        </InfiniteScroll>
    )
}

export default InfiniteScrollData