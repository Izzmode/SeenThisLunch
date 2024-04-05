import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import PropTypes from 'prop-types';
import RestaurantCard from '../RestaurantCard/RestaurantCard'
import { getAllRatings } from '../../store/features/ratings/ratingsSlice'
import './SimilarRestaurants.css'

const SimilarRestaurants = ({ restaurant, restaurants }) => {

  const dispatch = useDispatch()
  const { allRatings } = useSelector(state => state.ratings)

  useEffect(() => {
    dispatch(getAllRatings());
  }, []);

  const similarRestaurants = restaurants?.filter(res => {

    if (res.id === restaurant?.id) {
      return false; 
    }

    const foodOptionsFromAllRestaurants = [];
    const foodOptionsFromThisRestaurant = [];

    for (const key in restaurant) {
      if (key.startsWith('foodOption_') && restaurant[key]) {
        foodOptionsFromThisRestaurant.push(key);
      }
    }
    for (const key in res) {
      if (key.startsWith('foodOption_') && res[key]) {
        foodOptionsFromAllRestaurants.push(key);
      }
    }
    const hasCommonFoodOptions = foodOptionsFromThisRestaurant.some(option => foodOptionsFromAllRestaurants.includes(option));
    return hasCommonFoodOptions
  }) 

  const sortByCommonFoodOptions = (a, b) => {
    const foodOptionsFromThisRestaurant = Object.keys(restaurant).filter(key => key.startsWith('foodOption_') && restaurant[key]);
    const foodOptionsA = Object.keys(a).filter(key => key.startsWith('foodOption_') && a[key]);
    const foodOptionsB = Object.keys(b).filter(key => key.startsWith('foodOption_') && b[key]);
    
    const commonFoodOptionsA = foodOptionsA.filter(foodOption => foodOptionsFromThisRestaurant.includes(foodOption));
    const commonFoodOptionsB = foodOptionsB.filter(foodOption => foodOptionsFromThisRestaurant.includes(foodOption));

    return commonFoodOptionsB.length - commonFoodOptionsA.length; // Sort in descending order of common foodoptions
  };

  const sortedSimilarRestaurants = similarRestaurants.sort(sortByCommonFoodOptions);

   const getRatingsForRestaurant = (restaurantId) => {
    
    const matchedRatingToRestaurant = allRatings?.filter(rating => {
      return rating.restaurantId === restaurantId;
    })
    
    return matchedRatingToRestaurant
  };

  return (
    <div className='SimilarRestaurants'>
      <p>You might also be interested in these restaurants</p>

      {similarRestaurants &&
      <div className='similar-restaurants'>
      {sortedSimilarRestaurants.slice(0, 3).map((res) => (
        <RestaurantCard
        restaurant={res} 
        key={res.id} 
        ratings={getRatingsForRestaurant(res.id)}/>
        ))}

      </div>
      }
    </div>
  )
}

SimilarRestaurants.propTypes = {
  restaurant: PropTypes.object,
  restaurants: PropTypes.array,
  }

export default SimilarRestaurants