import React, {useEffect, useState} from 'react'
import axios from 'axios'
import "../styles/movieRecommendationStyles.scss"

async function fetchMovieData(movieName) {
    const options = {
        method: 'GET',
        url: 'https://moviesdatabase.p.rapidapi.com/titles/series/{movieName}',
        headers: {
          'X-RapidAPI-Key': 'a957bc1e78mshdb390aea124becbp1750a6jsna0e4a0a88268',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
      };
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data; 
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  

function MovieRecommendation(props) {
    const [movieData,setMovieData]=useState([]);
    useEffect(() => {
        const promises =  fetchMovieData(props.movie_name);
        Promise.all(promises)
          .then((movieDataArray) => {
            setMovieData(movieDataArray);
            console.log(movieData)
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);
  return (
    <div>
        <div className='image'><img src='https://miro.medium.com/v2/resize:fit:720/format:webp/1*LCe8E2oBkMAJAgmHL0fr7A.png'/></div>
        <div className='movie_name'>{props.movie_name}</div>
        <div className='about'>mocmioeviuenlvuiqnvipnviqpnrpvipqeviqpnvipnqipernvpqernvqpirnvqionrvijqnpvnqrnvnqeijrnvqjipnvpqvjnnapinv</div>
    </div>
  )
}

export default MovieRecommendation