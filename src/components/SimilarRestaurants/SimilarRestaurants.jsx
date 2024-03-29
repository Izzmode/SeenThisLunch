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

    const checkboxesFromAllRestaurants = [];
    const checkboxesFromThisRestaurant = [];

    for (const key in restaurant) {
      if (key.startsWith('checkbox') && restaurant[key]) {
        checkboxesFromThisRestaurant.push(key);
      }
    }
    for (const key in res) {
      if (key.startsWith('checkbox') && res[key]) {
        checkboxesFromAllRestaurants.push(key);
      }
    }
    const hasCommonCheckboxes = checkboxesFromThisRestaurant.some(checkbox => checkboxesFromAllRestaurants.includes(checkbox));
    return hasCommonCheckboxes
   }) 

  const sortByCommonCheckboxes = (a, b) => {
    const checkboxesFromThisRestaurant = Object.keys(restaurant).filter(key => key.startsWith('checkbox') && restaurant[key]);
    const checkboxesA = Object.keys(a).filter(key => key.startsWith('checkbox') && a[key]);
    const checkboxesB = Object.keys(b).filter(key => key.startsWith('checkbox') && b[key]);
    
    const commonCheckboxesA = checkboxesA.filter(checkbox => checkboxesFromThisRestaurant.includes(checkbox));
    const commonCheckboxesB = checkboxesB.filter(checkbox => checkboxesFromThisRestaurant.includes(checkbox));

    return commonCheckboxesB.length - commonCheckboxesA.length; // Sort in descending order of common checkboxes
  };

  const sortedSimilarRestaurants = similarRestaurants.sort(sortByCommonCheckboxes);

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