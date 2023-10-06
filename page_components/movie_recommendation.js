import React, {useEffect, useState} from 'react'
import axios from 'axios'
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


function MovieRecommendation(props) {
  const [movieData, setMovieData] = useState(null);

  const [imgsrc, setImgsrc]=useState(null);

  useEffect(() => {
    fetchMovieData(props.movie_name)
      .then((data) => {
        setMovieData(data);
        setImgsrc(`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movie_name]);


  
  console.log(imgsrc);
  return (
    <div>
        {movieData ? (
          <div className='recommended'>
            <div className='image'>
              <img src={imgsrc} />
            </div>
            <div className='about'>
              <div className='title'>{movieData.results[0].original_title}</div>
              <div className='description'>{movieData.results[0].overview}</div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
    </div>
  );
}

export default MovieRecommendation