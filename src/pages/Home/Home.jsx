import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getRestaurants } from "../../store/features/restaurants/restaurantSlice"
import { getAllRatings } from "../../store/features/ratings/ratingsSlice"
import Loader from '../../components/Loader/Loader'
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard"
import Hero from "../../components/Hero/Hero"
import FoodOptions from "../../components/FoodOptions/FoodOptions"
import './Home.css'

const Home = () => {

  const dispatch = useDispatch()

  const { restaurants, loading, error } = useSelector(state => state.restaurants)
  const { allRatings } = useSelector(state => state.ratings)

  const [ratings, setRatings] = useState([])
  const [expandedAreas, setExpandedAreas] = useState({});
  const [startedFiltering, setStartedFiltering] = useState(false)
  const [filters, setFilters] = useState({
    foodOption_Pizza: false,
    foodOption_Fish: false,
    foodOption_Pasta: false,
    foodOption_Schnitzel: false,
    foodOption_Buffet: false,
    foodOption_Vegan: false,
    foodOption_Vegetarian: false,
    foodOption_Hamburger: false,
    foodOption_Sallad: false,
    foodOption_Ramen: false,
    foodOption_Sushi: false,
    foodOption_Tacos: false,
    foodOption_Other: false,
    foodOption_Sausage: false,
    outdoorSeating: false,
  })

  useEffect(() => {
    setRatings(allRatings)
  }, [allRatings])

  useEffect(() => {
    dispatch(getRestaurants())
    dispatch(getAllRatings());
  }, [dispatch])

  useEffect(() => {
    // Check if any filter is checked
    const anyFilterChecked = Object.values(filters).some(filter => filter);
  
    // If no filter is checked, reset the state
    if (!anyFilterChecked) {
      setStartedFiltering(false);
    } else {
      setStartedFiltering(true)
    }
  }, [filters]); 

  const handleChange = (e) => {
    const { id } = e.target
  
    setFilters(prev => ({
      ...prev,
      [id]: !prev[id] 
    }));
  };

  const toggleAreaExpansion = (area) => {
    setExpandedAreas(prevState => ({
      ...prevState,
      [area]: !prevState[area]
    }));
  };

  const getRatingsForRestaurant = (restaurantId) => {
    const matchedRatingToRestaurant = ratings?.filter(rating => {
      return rating.restaurantId === restaurantId;
    })
    
    return matchedRatingToRestaurant
  };
  
  //generates random restaurantId for generate random restaurant button
  let randomRestaurantId;
  const generateRandomRestaurantId = () => {
    if(restaurants && restaurants.length > 0){
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      randomRestaurantId = restaurants[randomIndex].id;
    }
  };
  generateRandomRestaurantId()

    //checks restaurants if their foodoptions values are true/false and match with the ones that user filtered
    const filteredRestaurants = restaurants.filter(restaurant => {
      return Object.entries(filters).every(([filterName, filterValue]) => {
        return !filterValue || restaurant[filterName];
      });
    });

    // Get unique areas from filtered restaurants and sort them alphabetically (except for other)
  const uniqueAreas = [...new Set(filteredRestaurants.map(restaurant => restaurant.area))].sort((a, b) => {
    if (a === "Other") return 1; 
    if (b === "Other") return -1; 
    return a.localeCompare(b); 
});


return (
  <div className="Home padding-top-navbar">
    <Hero header='Restaurants'/>
    <FoodOptions 
    filters={filters} 
    handleChange={handleChange} 
    heading="What should the restaurant offer?" 
    randomRestaurantId={randomRestaurantId}
    showSeatingCheckbox={true}
    />
    {loading && <Loader/>}
    {error && <p>Something went wrong</p>}
    {filteredRestaurants && (
    <>
    {filteredRestaurants.length > 1 && startedFiltering &&
      <p className="filtered-text">These {filteredRestaurants.length} restaurants match your criteria!</p>
    }
    {filteredRestaurants.length === 1 && startedFiltering &&
      <p className="filtered-text">This restaurant matched your criteria.</p>
    }
    {filteredRestaurants.length === 0 && startedFiltering &&
      <p className="filtered-text">No restaurants matched your criteria :(</p>
    }
    {uniqueAreas.map(area => (
      <div key={area} className="restaurant-area-container">
        <h2 className="area-heading">{area}</h2>
        <div className="card-container">
          {filteredRestaurants
            .filter(restaurant => restaurant.area === area)
            .slice(0, expandedAreas[area] ? filteredRestaurants.filter(restaurant => restaurant.area === area).length : 3)
            .map(restaurant => (
              <div className="restaurant-card-wrapper">
              <RestaurantCard
                restaurant={restaurant}
                key={restaurant.id}
                ratings={getRatingsForRestaurant(restaurant.id)}
              />
              </div>
          ))}
        </div>
        {filteredRestaurants.filter(restaurant => restaurant.area === area).length > 3 && (
          <div className="view-more-arrow" onClick={() => toggleAreaExpansion(area)}>
            {expandedAreas[area] ? 'Show Less' : 'Show More'}
            {expandedAreas[area] ? 
              <MdKeyboardArrowUp  className="icon-arrow-down"/> : 
              <MdOutlineKeyboardArrowDown className="icon-arrow-down"/>
            }
          </div>
        )}
      </div>
    ))}
    </>
    )}
  </div>
);
  
}

export default Home