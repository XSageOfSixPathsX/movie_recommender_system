import React, {useEffect,useState} from 'react'
import "../styles/movieRatingStyles.scss"
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Card, Icon, Image } from 'semantic-ui-react'

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

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: 'white', 
    fontSize: '28px',
  },
  '& .MuiRating-iconFilled .MuiSvgIcon-root': {
    fontSize: '28px',
  },
}));
  
const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" fontSize='36px' />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" fontSize='36px' />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="yellow" fontSize='36px' />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" fontSize='36px' />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" fontSize='36px' />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function MovieRating(props) {
  const [imgsrc, setImgsrc]=useState(null);

  useEffect(() => {
    fetchMovieData(props.movie_name)
      .then((data) => {
        setImgsrc(`https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.movie_name]);

  const handleChange = (e) => {
    localStorage.setItem(props.id,e.target.value);
  }
  

  return (
    <Card className='movie_rating_card'>
        <Image className='img' src={imgsrc}  />
        <Card.Header className='header'>{props.snum+1}. {props.movie_name}</Card.Header>
        <Card.Description className='rating'> 
          <StyledRating
            name="highlight-selected-only"
            defaultValue={3}
            onChange={handleChange}
            IconContainerComponent={(props) => (
              <IconContainer style={{ fontSize: '36px' }} {...props} />
            )}
            getLabelText={(value) => customIcons[value].label}
            highlightSelectedOnly
          />
        </Card.Description>
    </Card>
  )
}

export default MovieRating