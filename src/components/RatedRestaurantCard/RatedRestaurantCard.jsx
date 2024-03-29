
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import defaultImage from '../../assets/default-image.jpg'
import './RatedRestaurantCard.css'

const RatedRestaurantCard = ({ ratedRestaurant }) => {

  //move to helper?
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    let day = date.getDate();
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    }
    return formattedDate.replace(/\b\d+\b/, `${day}${suffix}`);
  };

  return (
    <div className='RatedRestaurantCard'>
      <img 
      src={ratedRestaurant.imageURL ? ratedRestaurant.imageURL : defaultImage} 
      alt="image of food" 
      className='card-image'
      onError={(e) => {
        e.target.src = defaultImage; 
      }}
      />
      <div className='rated-card-info'>
        <h2>{ratedRestaurant.name}</h2>
        <div className='rating-circle'><p className='text-rating-circle'>{ratedRestaurant.rating}/5</p></div>
        {
          ratedRestaurant.rating >= 4 &&
          <p>You really enjoyed this restaurant!</p>
        }
        {
          ratedRestaurant.rating == 3 &&
          <p>You thought this place was alright, but you weren't blown away.</p>
        }
        {
          ratedRestaurant.rating <= 2 &&
          <p>This place did not meet your expectations at all unfortunately.</p>
        }
        
        <p>On {formatDate(ratedRestaurant.createdAt)} you gave it {ratedRestaurant.rating} 
        {ratedRestaurant.rating == 1 ? ' star.' : ' stars.'}</p>

        <Link to={`/restaurants/${ratedRestaurant.id}`}> Go to restaurant</Link>
      </div>
    </div>
  )
}

RatedRestaurantCard.propTypes = {
  ratedRestaurant: PropTypes.object,
  }

export default RatedRestaurantCard