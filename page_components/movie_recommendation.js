import React, {useEffect, useState} from 'react'
import {recomovie} from './movie_list';
import "../styles/movieRecommendationStyles.scss"

async function fetchMovieData(movieName) {
  const options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDUxNTY3NGE1NWI2OWViZmI1OWNlNjI4NzQxYzM0NiIsInN1YiI6IjY1MjAwNzM5MDcyMTY2MDBlMmQ5M2RhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c2U37Zp6Up2G0U_Jx3VJGA4GI9V7JloiR-Vt2vm-XiI'
    }
  };

  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json(); 
    
    return responseData;
  } catch (error) {
    console.error(error);
    return null;
  }
}


function MovieRecommendation() {
  const [movieData, setMovieData] = useState(null);
  const [imgsrc, setImgsrc]=useState(null);
  const [currmovie, setCurrMovie]=useState(recomovie);

  useEffect(() => {
    fetchMovieData(currmovie)
      .then((data) => {
        setMovieData(data);
        setImgsrc(`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currmovie]);

  return (
    <div>
        {movieData ? (
          <div className='recommended'>
            <div className='image'>
              <img src={imgsrc} />
            </div>
            <div className='about'>
              <div className='title'>{movieData.results[0].title}</div>
              <div className='release'>Released date : <div className='date'>{movieData.results[0].release_date}</div></div>
              <div className='popularity'>Popularity : <div className='percent'>{movieData.results[0].popularity}%</div></div>
              <div className='description'>Synopsis : <div className='text'>{movieData.results[0].overview}</div></div>
            </div>
          </div>
        ) : (
          <div className='load'>Loading....</div>
        )}
    </div>
  );
}

export default MovieRecommendation