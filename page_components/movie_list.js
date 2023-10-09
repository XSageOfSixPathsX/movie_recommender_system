import React, { useState,useEffect } from 'react';
import Link from 'next/link'
import MovieRating from "../page_components/movie_rating";
import "../styles/movieListStyles.scss"

export let recomovie="Annihilation"

const movie_list = {
  "The Mask": 3,
  "Carlito's Way": 3,
  "Braveheart": 3,
  "The Big Lebowski": 3,
  "Guantanamera": 3,
  "Nightwatch": 3,
  "Ridicule": 3,
  "Charade": 3,
  "Jude": 3,
  "Clerks": 3,
  "Crash": 3,
  "Anaconda": 3,
  "Forrest Gump": 3,
  "The Godfather": 3,
  "The Graduate": 3,
  "The Hudsucker Proxy": 3,
  "Jackie Brown": 3,
  "Titanic": 3,
  "Kids": 3,
  "Fled": 3,
  "Black Beauty": 3,
  "Living in Oblivion": 3,
  "Lone Star": 3,
  "Men in Black": 3,
  "True Lies": 3
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
  "72": 3,
  "76": 3,
  "22": 3,
  "902": 3,
  "1600": 3,
  "1625": 3,
  "224": 3,
  "945": 3,
  "149": 3,
  "42": 3,
  "325": 3,
  "1013": 3,
  "69": 3,
  "127": 3,
  "197": 3,
  "81": 3,
  "346": 3,
  "313": 3,
  "772": 3,
  "829": 3,
  "973": 3,
  "1070": 3,
  "124": 3,
  "257": 3,
  "385": 3
  },
  "number_of_movie": 10
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
  const [showButton,setShowButton]=useState(false);

  function UpdateMovieRating(movieName, newRating) {
    const updatedMovies = { ...movies }; 
    updatedMovies[movieName] = newRating;
    setMovies(updatedMovies);
    console.log("rating updated : "+updatedMovies[movieName]);  
  }
  
  function handle(mov){
    recomovie=mov;
    console.log("helsds");
  }
  useEffect(() => {
    UpdateMovieRating(mname, rating);
  }, [rating]);

  function HandleSubmit() {
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
  .then((cdata) => {
    let x = Math.floor((Math.random() * 10));
    console.log(cdata.data[x]);
    const myArray = cdata.data[x].split(" ");
    const movieName = myArray[0];
    recomovie = movieName;
    setShowButton(true);
    setCurrMovie(movieName);
    handle(myArray[0]);
    console.log("hello " + myArray[0]);
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
      {!showButton ? (
       <div className='button_container'>
       <button onClick={HandleSubmit}>Submit Preferences</button>
    </div>):null}
    <div className='secbutton'>
    {showButton ?
(           <Link href={`/recommendation`}> <button className='numbutton'>open page</button></Link>)
       :null}
       </div>
    </div>
  );
}

export default MovieList;