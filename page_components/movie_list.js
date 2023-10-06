import MovieRating from "../page_components/movie_rating";

const movie_list = [
    "American Beauty",
    "As Good as It Gets",
    "Being John Malkovich",
    "The Big Lebowski",
    "Bruce Almighty",
    "The Butterfly Effect", 
    "Capote",
    "Charade", 
    "The Cider House Rules",
    "Clerks",
    "Crash",
    "Double Indemnity",
    "Forrest Gump",
    "The Godfather",
    "The Graduate",
    "The Hudsucker Proxy",
    "Jackie Brown",
    "Jay and Silent Bob Strike Back",
    "Kids",
    "Light Sleeper",
    "Little Miss Sunshine",
    "Living in Oblivion",
    "Lone Star",
    "Men in Black",
    "The Naked City",
]


function MovieList() {
  return (
    <div>
      {movie_list.map((movie, index) => (
        <MovieRating key={index} snum={index} movie_name={movie} />
      ))}
    </div>
  );
}

export default MovieList;
