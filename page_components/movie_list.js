import React, { useState,useEffect } from 'react';
import Link from 'next/link'
import MovieRating from "../page_components/movie_rating";
import "../styles/movieListStyles.scss"

// eslint-disable-next-line react-hooks/rules-of-hooks
export let recomovie="Annihilation"

const movie_list = {
  "The Mask": 6,
  "Carlito's Way": 6,
  "Braveheart": 6,
  "The Big Lebowski": 6,
  "Guantanamera": 6,
  "Nightwatch": 6,
  "Ridicule": 6,
  "Charade": 6,
  "Jude": 6,
  "Clerks": 6,
  "Crash": 6,
  "Anaconda": 6,
  "Forrest Gump": 6,
  "The Godfather": 6,
  "The Graduate": 6,
  "The Hudsucker Proxy": 6,
  "Jackie Brown": 6,
  "Titanic": 6,
  "Kids": 6,
  "Fled": 6,
  "Black Beauty": 6,
  "Living in Oblivion": 6,
  "Lone Star": 6,
  "Men in Black": 6,
  "True Lies": 6
};

const movie_list_id = {
  "The Mask": 72,
  "Carlito's Way":76,
  "Braveheart": 22,
  "The Big Lebowski": 902,
  "Guantanamera": 1600,
  "Nightwatch": 1625,
  "Ridicule": 224,
  "Charade": 945,
  "Jude": 149,
  "Clerks": 42,
  "Crash": 325,
  "Anaconda": 1013,
  "Forrest Gump": 69,
  "The Godfather": 127,
  "The Graduate": 197,
  "The Hudsucker Proxy": 81,
  "Jackie Brown": 346,
  "Titanic": 313,
  "Kids": 772,
  "Fled": 829,
  "Black Beauty": 389,
  "Living in Oblivion": 1070,
  "Lone Star": 124,
  "Men in Black": 257,
  "True Lies": 385
};

const id_rating = {
  "rating":{
  "72": 6,
  "76": 6,
  "22": 6,
  "902": 6,
  "1600": 6,
  "1625": 6,
  "224": 6,
  "945": 6,
  "149": 6,
  "42": 6,
  "325": 6,
  "1013": 6,
  "69": 6,
  "127": 6,
  "197": 6,
  "81": 6,
  "346": 6,
  "313": 6,
  "772": 6,
  "829": 6,
  "973": 6,
  "1070": 6,
  "124": 6,
  "257": 6,
  "385": 6
  },
  "number_of_movie": 1
}


async function fetchMovieData(raw) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  try {
    const response = await fetch("http://16.16.58.189:8000/", requestOptions);
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

function MovieList() {
  const [movies, setMovies] = useState(movie_list);
  const [rating, setRating] = useState(6);
  const [mname, setMname] = useState("");
  const [currMovie,setCurrMovie]=useState("Avatar")

  function UpdateMovieRating(movieName, newRating) {
    const updatedMovies = { ...movies }; 
    updatedMovies[movieName] = newRating;
    setMovies(updatedMovies);
    console.log("rating updated : "+updatedMovies[movieName]);  
  }
  
  useEffect(() => {
    recomovie=currMovie;
  },[currMovie])

  useEffect(() => {
    UpdateMovieRating(mname, rating);
  }, [rating]);

  function handleSubmit() {
    console.log("hi");
    const updatedrating = { ...id_rating };
  
    for (const movie_name in movies) {
      if (movies.hasOwnProperty(movie_name)) {
        const movie_id = movie_list_id[movie_name];
        updatedrating["rating"][movie_id] = movies[movie_name];
      }
    }
    const raw = JSON.stringify(updatedrating);
    fetchMovieData(raw)
    .then((cdata)=> {
      console.log(cdata);
      const ans=cdata.data.indexof(',');
      setCurrMovie(cdata.data.substring(0,ans-1));
    })
    .catch((err) => {
      console.log(err);
    });
    console.log("new arr" + updatedrating["rating"]["1070"]);
    console.log('Updated Ratings:', updatedrating);
  }
  return (
    <div>
      {Object.keys(movie_list).map((movie, index) => {
        return (
          <MovieRating
            key={index}
            snum={index}
            movie_name={movie}
            setRating={setRating}
            setMname={setMname}
          />
        );
      })}
       <div className='button_container'>
           <Link href={`/recommendation`}> <button onClick={handleSubmit}>Submit Preferences</button></Link>
    </div>
    </div>
  );
}

export default MovieList;