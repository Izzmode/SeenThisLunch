import { Link } from 'react-router-dom'
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import defaultImage from '../../assets/default-image.jpg'
import { calcAvarageRating } from '../../helper';
import './RestaurantCard.css'

const RestaurantCard = ({ restaurant, ratings }) => {

  const [averageRatingDisplayed, setAverageRatingDisplayed] = useState(null);

  useEffect(() => {
    setAverageRatingDisplayed(calcAvarageRating(restaurant, ratings))
  }, [restaurant, ratings]);

  return (
    <Link className='RestaurantCard' to={`/restaurants/${restaurant.id}`}>
      <img 
      src={restaurant.imageURL ? restaurant.imageURL : defaultImage} 
      alt="picture of food" 
      className='card-image' 
      onError={(e) => {
        e.target.src = defaultImage; 
      }}
      />
      <div className='restaurant-info'>
        <div className='heading-and-rating'>
          <h2>{restaurant.name ? restaurant.name : restaurant.resturant}</h2>
            {averageRatingDisplayed !== null ? (
            <div className='rating-star'>
              {averageRatingDisplayed.toFixed(1)} <FaStar />
            </div>
            ) : (
            <div className='rating-star'>
              <FaRegStar />
              No ratings</div>
            )}
          </div>
        <p>{restaurant.area && restaurant.area}</p>
        <p>{restaurant.address && restaurant.address}</p>
      </div>
    </Link>
  )
}

RestaurantCard.propTypes = {
  restaurant: PropTypes.object,
  ratings: PropTypes.array
  }

export default RestaurantCard