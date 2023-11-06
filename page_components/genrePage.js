import React, {useState} from 'react'
import MovieRating from '@/page_components/movie_rating';

const comedy = {
    "The Mask": 3,
    "Carlito's Way": 3,
    "Braveheart": 3,
    "The Big Lebowski": 3,
  };

function GenrePage(props) {
  
  return (
    <div>
        <div className='genre_name'>{props.genre}</div>
        {Object.keys(props.genre).map((movie, index) => {
          console.log("hi");
        return (
          <MovieRating
            key={index}
            snum={index}
            movie_name={movie}
          />
        );
      })}
    </div>
  )
}

export default GenrePage