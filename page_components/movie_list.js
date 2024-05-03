import React, { useState,useEffect, useRef } from 'react';
import MovieRating from "../page_components/movie_rating";
import "../styles/movieListStyles.scss"

export let recomovie="Annihilation"

const Comedy = {
  "Groundhog Day": 3,
  "Airplane!": 3,
  "Rushmore": 3,
  "Duck Soup": 3,
  "Borat": 3,
};

const Romance = {
  "Titanic": 3,
  "Notting Hill": 3,
  "Pretty Woman": 3,
  "The Notebook": 3,
  "Pride and Prejudice": 3,
};
const Horror = {
  "Saw": 3,
  "The Babadook": 3,
  "28 Days Later": 3,
  "The Woman in Black": 3,
  "Insidious": 3,
};
const Thriller = {
  "Gone Girl": 3,
  "The Usual Suspects": 3,
  "Se7en": 3,
  "The Silence of the Lambs": 3,
  "Fight Club": 3,
};
const Animated = {
  "The Lion King": 3,
  "Toy Story": 3,
  "The Iron Giant": 3,
  "Shrek": 3,
  "Finding Nemo": 3,
};

const Action = {
  "Casino Royale": 3,
  "The Bourne Supremacy": 3,
  "Kill Bill: Vol. 1": 3,
  "The Fugitive": 3,
  "Taken": 3,
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

  const [genre1,setGenre1] = useState("");
  const [genre2,setGenre2] = useState("");
  const [genre3,setGenre3] = useState("");
  const [list1, setList1]=useState(null);
  const [list2, setList2]=useState(null);
  const [list3, setList3]=useState(null);
  const [load, setLoad]=useState(0);

  useEffect(() => {
    for (let i = 1; i <= 12; ++i) {
      localStorage.setItem(i, 3);
    }
  }, []);  

  useEffect(() => {
    setTimeout(() => {
      setLoad(1);
    }, 3000);
  },[])

  useEffect(() => {
    setGenre1(localStorage.getItem("genre1"))
    setGenre2(localStorage.getItem("genre2"))
    setGenre3(localStorage.getItem("genre3"))
  },[]);

  useEffect(()=>{
    if(genre1==="Romance")
    {
      setList1(Romance);
    }
    else if (genre1==="Thriller")
    {
      setList1(Thriller);
    }
    else if (genre1==="Horror")
    {
      setList1(Horror);
    }
    else if (genre1==="Animated")
    {
      setList1(Animated);
    }
    else if (genre1==="Comedy")
    {
      setList1(Comedy);
    }
    else
    {
      setList1(Action);
    }
  },[genre1])

  useEffect(()=>{
    if(genre2==="Romance")
    {
      setList2(Romance);
    }
    else if (genre2==="Thriller")
    {
      setList2(Thriller);
    }
    else if (genre2==="Horror")
    {
      setList2(Horror);
    }
    else if (genre2==="Animated")
    {
      setList2(Animated);
    }
    else if (genre2==="Comedy")
    {
      setList2(Comedy);
    }
    else
    {
      setList2(Action);
    }
  },[genre2])

  useEffect(()=>{
    if(genre3==="Romance")
    {
      setList3(Romance);
    }
    else if (genre3==="Thriller")
    {
      setList3(Thriller);
    }
    else if (genre3==="Horror")
    {
      setList3(Horror);
    }
    else if (genre3==="Animated")
    {
      setList3(Animated);
    }
    else if (genre3==="Comedy")
    {
      setList3(Comedy);
    }
    else
    {
      setList3(Action);
    }
  },[genre3])

  return (
    <div>
      <div className='tip'>Please rate movies from this list of the genres <span>{genre1}</span>, <span>{genre2}</span>, and <span>{genre3}</span> that you selected and get the perfect recommendation</div>
  
      {load && list1 !== null && list2 !== null && list3 !== null ? (
        <>
          {Object.keys(list1).slice(0, 5).map((movie, index) => (
            <MovieRating
              key={index}
              snum={index}
              movie_name={movie}
              genre={genre1}
              id={index + 1}
            />
          ))}
  
          {Object.keys(list2).slice(0, 4).map((movie, index) => (
            <MovieRating
              key={index}
              
              snum={index}
              movie_name={movie}
              genre={genre2}
              id={index + 6}
            />
          ))}
  
          {Object.keys(list3).slice(0, 3).map((movie, index) => (
            <MovieRating
              key={index}
              snum={index}
              movie_name={movie}
              genre={genre3}
              id={index + 10}
            />
          ))}
        </>
      ):(<div className='load'>Loading....</div>)}
    </div>
  );
          }

export default MovieList;