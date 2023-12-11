import React, {useEffect, useState} from 'react'
import {recomovie} from './movie_list';
import "../styles/movieRecommendationStyles.scss"

const Comedy = {
  "Step Brothers": 3,
  "Raising Arizona": 3,
  "Withnail And I": 3,
  "Lady Ballers": 3,
  "Home Alone": 3,
  "Back To The Future": 3,
  "Blazing Saddles": 3,
  "Dr. Strangelove": 3,
  "Shaun Of The Dead": 3,
  "Bridesmaids": 3,
};

const Romance = {
  "Eternal Sunshine of the Spotless Mind": 3,
  "When Harry Met Sally": 3,
  "Sense and Sensibility": 3,
  "The Fault in Our Stars": 3,
  "A Walk to Remember": 3,
  "Brokeback Mountain": 3,
  "Silver Linings Playbook": 3,
  "Before Sunset": 3,
  "500 Days of Summer": 3,
  "The Princess Bride": 3,
};
const Horror = {
  "The Sixth Sense": 3,
  "The Silence of the Lambs": 3,
  "The Others": 3,
  "The Ring": 3,
  "The Blair Witch Project": 3,
  "Sinister": 3,
  "The Conjuring": 3,
  "The Descent": 3,
  "Let the Right One In": 3,
  "The Cabin in the Woods": 3,
};
const Thriller = {
  "Heat": 3,
  "The Bourne Identity": 3,
  "Memento": 3,
  "Pulp Fiction": 3,
  "The Departed": 3,
  "L.A. Confidential": 3,
  "Primal Fear": 3,
  "Zodiac": 3,
  "Inside Man": 3,
  "The Girl with the Dragon Tattoo": 3,
};
const Animated = {
  "The Little Mermaid": 3,
  "The Princess and the Frog": 3,
  "Spirited Away": 3,
  "Ratatouille": 3,
  "How to Train Your Dragon": 3,
  "Up": 3,
  "Frozen": 3,
  "The Incredibles": 3,
  "Kung Fu Panda": 3,
  "Wreck-It Ralph": 3,
};

const Action = {
  "Lethal Weapon": 3,
  "Speed": 3,
  "Terminator": 3,
  "Gladiator": 3,
  "The Rock": 3,
  "Top Gun": 3,
  "Mad Max: Fury Road": 3,
  "The Dark Knight": 3,
  "The Matrix": 3,
  "Mission: Impossible": 3,
}

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
  const [genrename, setGenrename]=useState("Action");
  const [genre, setGenre]=useState(null);
  const [times,setTimes]=useState(0);
  const [t2, setT2]=useState(0);


  useEffect(() => {
    let one=(localStorage.getItem(1)+localStorage.getItem(2)+localStorage.getItem(3)+localStorage.getItem(4)+localStorage.getItem(5));
    let two=(localStorage.getItem(6)+localStorage.getItem(7)+localStorage.getItem(8)+localStorage.getItem(9));
    let three=(localStorage.getItem(10)+localStorage.getItem(11)+localStorage.getItem(12));
    let g1=localStorage.getItem("genre1");
    let g2=localStorage.getItem("genre2");
    let g3=localStorage.getItem("genre3");
    if(one>=two && one>=three)
    {
      console.log("1");
      setGenrename(g1);
    }
    else if(two>=one && two>=three)
    {
      console.log("2");
      setGenrename(g2);
    }
    else
    {
      console.log("3");
      setGenrename(g3);
    }
  },[])

  useEffect(()=>{
    console.log(genrename);
    if(t2===0)
    {
      setT2(1);
    }
    else{
    if(genrename==="Romance")
    {
      setGenre(Romance);
    }
    else if (genrename==="Thriller")
    {
      setGenre(Thriller);
    }
    else if (genrename==="Horror")
    {
      setGenre(Horror);
    }
    else if (genrename==="Animated")
    {
      setGenre(Animated);
    }
    else if (genrename==="Comedy")
    {
      setGenre(Comedy);
    }
    else
    {
      setGenre(Action);
    }
  }
  },[genrename])

  useEffect(() => {
    if(genre!=null){
    if(times===0){
    const genreKeys = Object.keys(genre);
    const randomNum = Math.floor(Math.random() * 10);
    const randomMovie = genreKeys[randomNum];
    if (randomMovie !== currmovie) {
      setCurrMovie(randomMovie);
    }
    setTimes(1);
  }
}
  }, [genre]);
  
  

  useEffect(() => {
    console.log(currmovie);
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
    <div className='tip'>Below is the movie we recommend you should watch. Enjoy!</div>
        {currmovie && movieData ? (
          <div className='recommended'>
            <div className='image'>
              <img src={imgsrc} />
            </div>
            <div className='about'>
              <div className='title'>{movieData.results[0].title}</div>
              <div className='release'>Released date : <div className='date'>{movieData.results[0].release_date}</div></div>
              <div className='popularity'>Popularity : <div className='percent'>{movieData.results[0].popularity}</div></div>
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