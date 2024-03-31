import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUserRatings } from '../../store/features/ratings/ratingsSlice';
import { getRestaurantsById } from '../../store/features/restaurants/restaurantSlice';
import Select from 'react-select';
import RatedRestaurantCard from '../../components/RatedRestaurantCard/RatedRestaurantCard';
import Hero from '../../components/Hero/Hero';
import Loader from '../../components/Loader/Loader';
import './Profile.css'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { restaurantsById } = useSelector(state => state.restaurants)
  const { userRatings, loading, error } = useSelector(state => state.ratings)

  const restaurantsIds = userRatings?.map(val => val.restaurant);
  const [previousRestaurantsIds, setPreviousRestaurantsIds] = useState([]);
  const [sortRatedRestaurantsBy, setSortRatedRestaurantsBy] = useState('created')

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid grey' : '1px solid grey', 
      height: '2rem',
      boxShadow: 'none', 
      '&:hover': {
        borderColor: 'grey',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ffccb3;' : state.isFocused ? '#ffefe7' : 'transparent', 
      color: '#000000',
    }),
  };

  const sortingOptions = [
    { value: 'rating', label: 'Highest rated restaurant' },
    { value: 'created', label: 'Latest rated restaurant' },
  ];

  const combinedData = [];
  userRatings?.forEach(rating => {
    // Find the corresponding restaurant object
    const restaurant = restaurantsById.find(restaurant => restaurant.id === rating.restaurant);
    
    // If restaurant is found, add combined object to the array
    if (restaurant) {
        combinedData.push({
          rating: rating.rating,
          createdAt: rating.createdAt,
          ...restaurant
        });   
    }
  });

  const handleChange = (selectedOption) => {
    setSortRatedRestaurantsBy(selectedOption.value)
  }

  useEffect(() => {
    dispatch(getUserRatings({ userId: user.uid }));
   }, [dispatch, user]);

   useEffect(() => {
    if(!user) {
      navigate('/login')
    }

  }, [user, navigate])

   useEffect(() => {
    // Check if restaurantsIds has changed
    if (!arraysEqual(restaurantsIds, previousRestaurantsIds)) {
      // Dispatch the action only if restaurantsIds has changed
      dispatch(getRestaurantsById({ ids: restaurantsIds || [] }));
      // Update the previousRestaurantsIds with the current value
      setPreviousRestaurantsIds(restaurantsIds);
    }
  }, [dispatch, restaurantsIds, previousRestaurantsIds]);
   
  // Helper function to compare arrays
  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  if (loading ) {
    return <Loader />
  }

  if (error) {
    return <p>Something went wrong</p>
  }

  // tbd lägg till så det inte blir inifinty scroll

  return (
    <div className='Profile padding-top-navbar'>
      <Hero header='Your Profile'/>
      <div className='profile-content-container'>
        <div className='welcome-user-text'>
          <h2>Welcome!</h2>
          <p>You are logged in as {user.email}</p>
          <p>Below are all the restaurants that you have rated.</p>
          <Select
              id="sort"
              value={sortingOptions.find(option => option.value === sortRatedRestaurantsBy)}
              options={sortingOptions}
              onChange={handleChange}
              className='select-input'
              styles={customStyles}
            />
        </div>
        <div className='rated-restaurants-container'>
          {combinedData
            .slice()
            .sort((a, b) => {
              if (sortRatedRestaurantsBy === 'rating') {
                return b.rating - a.rating;
              } else {
                return new Date(b.createdAt) - new Date(a.createdAt);
              }
            })
            .map(ratedRestaurant => (
              <div key={ratedRestaurant.id} className='rated-restauarant-container'>
                <RatedRestaurantCard ratedRestaurant={ratedRestaurant}/>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Profile