
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import defaultImage from '../../assets/default-image.jpg'
import { formatDate } from '../../helper';
import './RatedRestaurantCard.css'

const RatedRestaurantCard = ({ ratedRestaurant }) => {

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
        
        <p>On {formatDate(ratedRestaurant.createdAt)} you gave it <b>{ratedRestaurant.rating}
        {ratedRestaurant.rating == 1 ? ' star.' : ' stars.'}</b></p>

        <Link to={`/restaurants/${ratedRestaurant.id}`}> Go to restaurant</Link>
      </div>
    </div>
  )
}

RatedRestaurantCard.propTypes = {
  ratedRestaurant: PropTypes.object,
}

export default RatedRestaurantCard