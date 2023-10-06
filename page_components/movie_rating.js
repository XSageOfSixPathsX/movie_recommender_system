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



const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: 'white', 
      fontSize: '36px',
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
  const [rating, setRating] = useState(3); 

  const handleRatingChange = (event, newValue) => {
    setRating(newValue); 
    console.log(newValue);
  };
  return (
    <div className='movie_rating_card'>
        
        <div className='snum'>{props.snum+1}.</div>
        <div className='movie_name'>{props.movie_name}</div>
        <div className='rating'>
            <StyledRating
                name="highlight-selected-only"
                defaultValue={3}
                IconContainerComponent={(props) => (
                    <IconContainer style={{ fontSize: '36px'}} {...props} />
                )}
                getLabelText={(value) => customIcons[value].label}
                onChange={handleRatingChange}
                highlightSelectedOnly
            />
        </div>
    </div>
  )
}

export default MovieRating