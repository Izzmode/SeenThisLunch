import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { MdDinnerDining, MdEmail, MdOutlineFoodBank, MdOutlineRestaurant } from "react-icons/md";
import { GiBowlOfRice, GiSteak, GiSausage, GiSushis, GiTacos, GiCook } from "react-icons/gi";
import { FaRegStar, FaFish, FaStar, FaUser, FaDollarSign, FaCloudSun, FaClock, FaHamburger, FaLeaf, FaCarrot, FaPizzaSlice, FaMapPin, FaPhoneAlt, FaGlobe } from 'react-icons/fa';
import { FaBowlFood } from "react-icons/fa6";
import { getRestaurant, getRestaurants } from "../../store/features/restaurants/restaurantSlice";
import { addRating, getRatingsByRestaurant, getUserRatings } from '../../store/features/ratings/ratingsSlice';
import defaultImage from '../../assets/default-image.jpg'
import Map from '../../components/Map/Map';
import SimilarRestaurants from '../../components/SimilarRestaurants/SimilarRestaurants';
import Loader from '../../components/Loader/Loader';
import './RestaurantDetails.css';

const RestaurantDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams()

  const [initialLoad, setInitialLoad] = useState(true)
  const [averageRatingDisplayed, setAverageRatingDisplayed] = useState(null)
  const [numberOfRatings, setNumberOfRatings] = useState(0)
  const [ratedValue, setRatedValue] = useState(null)
  const [thankYouForRating, setThankYouForRating] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { restaurant, error, loading } = useSelector(state => state.restaurants)
  const { user } = useSelector(state => state.auth)
  const { ratings } = useSelector(state => state.ratings)
  const { userRatings } = useSelector(state => state.ratings)
  const { restaurants } = useSelector(state => state.restaurants)

const previousRatingObject = userRatings?.find(rating => restaurant.id === rating.restaurant)
const usersPreviousRatingOfRestaurant = previousRatingObject?.rating

  const foodOptions = Object.keys(restaurant || {}).filter(key => {
    const value = restaurant[key];
    return typeof value === 'boolean' && key.includes('checkbox');
  }).map(key => ({
    name: key,
    value: restaurant[key]
  }));
  const trueFoodOptions = foodOptions.filter(option => option.value);  

  const foodIcons = {
    Buffet: <GiCook />,
    Fish: <FaFish />,
    Hamburger: <FaHamburger />,
    Vegan: <FaLeaf />,
    Vegetarian: <FaCarrot />,
    Pizza: <FaPizzaSlice />,
    Pasta: <MdDinnerDining />,
    Ramen: <GiBowlOfRice />,
    Schnitzel: <GiSteak />,
    Buffe: <MdOutlineFoodBank />,
    Sausage: <GiSausage />,
    Sallad: <FaBowlFood />,
    Sushi: <GiSushis />,
    Tacos: <GiTacos />,
    Other: <MdOutlineRestaurant />
  };
  
  useEffect(() => {
    dispatch(getRestaurant({ collection: 'restaurants', id }))
    .then(() => setInitialLoad(false))
    .catch(() => setInitialLoad(false))
  }, [dispatch, id])

  useEffect(() => {
   dispatch(getRatingsByRestaurant({ restaurantId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUserRatings({ userId: user?.uid }));
   }, [dispatch, user]);

  useEffect(() => {
    dispatch(getRestaurants());
   }, [dispatch]);


  useEffect(() => {
    // Set ratedValue to the user's previous rating when the component mounts
    setRatedValue(usersPreviousRatingOfRestaurant);
  }, [usersPreviousRatingOfRestaurant]); 

  const handleRating = async (value) => {
    setRatedValue(value)
    setThankYouForRating(true)
    
    try {
      await dispatch(addRating({ userId: user.uid, restaurantId: id, rating: value }));
    } catch (error) {
      console.log(error)
    }
  };
    
  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  useEffect(() => {
    setTimeout(() => {
    if (initialLoad) return;
    if (!restaurant || ratings.length === 0) {
      setAverageRatingDisplayed(null);
      setNumberOfRatings(0);
    } else {
      const totalRating = ratings.reduce((acc, rating) => {
        if (typeof rating === 'number') {
          return acc + rating;
        } else {
          return acc + rating.rating;
        }
      }, 0);
      const averageRating = totalRating / ratings.length;
      setAverageRatingDisplayed(Math.round(averageRating * 100) / 100);
      setNumberOfRatings(ratings.length);
    }
  }, 250);
  }, [restaurant, ratings, initialLoad]);

  
  if (loading ) {
    return <Loader />;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className='RestaurantDetails'>
      {restaurant && (
      <div className='details-container'>
        <div className="image-container">
          <img 
          src={restaurant.imageURL ? restaurant.imageURL : defaultImage} 
          className='restaurant-image'
          onError={(e) => {
            e.target.src = defaultImage; 
          }}
          alt='Picture of food'
          />
          <h2 className='image-text'>{restaurant.name} {restaurant.area && restaurant.area}</h2>
          {/* <h3 className='image-text-area'>{restaurant.area && restaurant.area}</h3> */}
          <div className="current-rating">
            {averageRatingDisplayed !== null && !initialLoad ? (
            <div className='inner-current-rating'>
              <div className='icon-and-number icon-and-number-no-gap'>
                <span><FaStar className='icon'/></span> 
                <span className='rating-number'>{averageRatingDisplayed.toFixed(1)}/5</span> 
              </div> 
            </div>
            ) : (
            <div>These are not the ratings you're looking for</div>
            )} 
          </div>
        </div>
        <div className='info-container'>
          <div className='top-container'>
            <h3>This restaurant offers</h3>
            <div className='website-button-and-food-options'>
              <div className='food-options'>
                {trueFoodOptions.map(option => (
                <div key={option.name} className='food-option'>
                  {foodIcons[option.name.replace('checkbox', '')]}
                  {option.name.replace('checkbox', '')}
                </div>
                ))}
              </div>
              <a href={restaurant && restaurant.website} target="_blank" rel="noopener noreferrer"><button className='website-btn'>Visit their website</button></a>
            </div>
          </div>

          <div className="middle-container">
            <div className="map-and-contact-info">
              {restaurant && restaurant.address ? 
              <div className='map-container'>
                <Map initialAddress={`${restaurant.address}, Stockholm`}/>
              </div>
              :
              <div className='map-container'>
                <Map initialAddress="Hammarby kaj 10d, Stockholm"/>
              </div>
              }

            <div className="contact-container">
            <div className="contact-info">
                <h3 className='info-card-text'>{restaurant.name}</h3>
                <p className='icon-and-number'>
                  <FaClock/> 
                  { restaurant.openingHours && restaurant.closingHours ?
                  <span>{restaurant.openingHours} - {restaurant.closingHours}</span>
                    :
                    <span className='info-card-text'>Opening hours are not registered</span>
                  }
                </p>
                <p className='icon-and-number'>
                  <FaMapPin/> 
                  { restaurant.address ?
                  <span className='info-card-text'>{restaurant.address}</span>
                  :
                  <span>No address is registered</span>
                }
                </p>
                { restaurant.outdoorSeating &&

                <p className='icon-and-number'>
                  <FaCloudSun/> 
                  <span>Outdoor seating</span>
                </p>
                }
                { restaurant.priceRange &&
                <p className='icon-and-number'>
                  <FaDollarSign/> 
                  <span className='info-card-text'>{restaurant.priceRange}</span>
                </p>
                }
                <p className='icon-and-number'>
                  <FaPhoneAlt/> 
                  { restaurant.phoneNumber ?
                  <span>{restaurant.phoneNumber}</span>
                  :
                  <span>No phone number is registered</span>
                }
                </p>
                <p className='icon-and-number'>
                  <MdEmail/> 
                  { restaurant.email ?
                  <span><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></span>
                  :
                  <span>No email is registered</span>
                }
                </p>
                <p className='icon-and-number'>
                  <FaGlobe/> 
                  <span><a href={restaurant.website} target="_blank" rel="noopener noreferrer">To Restaurant Webpage</a></span>
                </p>
            </div>
                { user &&
            <div className="ratings-container">
              <div className="stars-wrapper">
                {thankYouForRating ? 
                <p>Thank you for your rating!</p>
                :
                usersPreviousRatingOfRestaurant ?
                <>
                <p>You previously gave this restaurant {usersPreviousRatingOfRestaurant}/5 stars.</p>
                <p>Do you wish to update your rating?</p>
                </>
                :
                <p>Rate your dining experience!</p>
                }

                <div className='rating-stars'>
                  {[5, 4, 3, 2, 1].map((starIndex) => (
                    usersPreviousRatingOfRestaurant ? (
                      <FaStar
                        key={starIndex}
                        className={`icon icon-star icon-star-full ${
                          hoveredIndex !== null && hoveredIndex >= starIndex || (starIndex <= ratedValue) ? 'yellow' : ''
                        }`}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleRating(starIndex)} // Assuming handleRating function
                      />
                    ) : (
                      <FaRegStar
                        key={starIndex}
                        className={`icon icon-star ${
                          hoveredIndex !== null && hoveredIndex >= starIndex || (starIndex <= ratedValue) ? 'yellow' : ''
                        }`}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleRating(starIndex)} // Assuming handleRating function
                      />
                    )
                  ))}
                </div>
              </div>
            </div>}
            </div>
          </div>
        </div>
        </div>
      </div>
      )}
      <SimilarRestaurants restaurant={restaurant} restaurants={restaurants}/>
    </div>
  );
};

export default RestaurantDetails;
