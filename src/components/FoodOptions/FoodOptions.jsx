import './FoodOptions.css'
import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaCloudSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Checkbox from '../../components/Checkbox/Checkbox'

// tbd ändra så filters blir typ foodoptions? eller bättre namn
//tbd styling randomknapp
const FoodOptions = ({ filters, handleChange, heading, randomRestaurantId, showSeatingCheckbox }) => {

  const [rotateArrow, setRotateArrow] = useState(false)

  return (
    <div className="FoodOptions">
      <h2 className='heading-for-filtering-food'>{heading}</h2>
      <MdOutlineKeyboardArrowDown className={`icon-arrow-down ${rotateArrow && 'arrow-down'}`} onClick={() => setRotateArrow(!rotateArrow)}/>
      <div className={`foodoptions-and-btn ${rotateArrow ? '' : 'hide-foodoptions'}`}>
         { showSeatingCheckbox &&
          <div className='test'>
          {/* <button type="button" className={filters.outdoorSeating ? 'btn' : 'btn-disabled'} onClick={handleChange} id="outdoorSeating">Outdoor Seating <FaCloudSun/></button> */}

          <Checkbox label="The restaurant should offer outdoor seating" handleChange={handleChange} id="outdoorSeating" initState={false}/>
          </div>
          }
        <div className="foodoptions-wrapper">
          <button type="button" className={filters.foodOption_Buffet ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Buffet" name="foodOption_Buffet">Buffet</button>
          <button type="button" className={filters.foodOption_Fish ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Fish" name="foodOption_Fish">Fish</button>
          <button type="button" className={filters.foodOption_Hamburger ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Hamburger">Hamburger</button>
          <button type="button" className={filters.foodOption_Other ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Other">Other</button>
          <button type="button" className={filters.foodOption_Pasta ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Pasta">Pasta</button>
          <button type="button" className={filters.foodOption_Pizza ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Pizza">Pizza</button>
          <button type="button" className={filters.foodOption_Ramen ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Ramen">Ramen</button>
          <button type="button" className={filters.foodOption_Sallad ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Sallad">Sallad</button>
          <button type="button" className={filters.foodOption_Sausage ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Sausage">Sausage</button>
          <button type="button" className={filters.foodOption_Schnitzel ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Schnitzel">Schnitzel</button>
          <button type="button" className={filters.foodOption_Soup ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Soup">Soup</button>
          <button type="button" className={filters.foodOption_Sushi ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Sushi">Sushi</button>
          <button type="button" className={filters.foodOption_Tacos ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Tacos">Tacos</button>
          <button type="button" className={filters.foodOption_Vegan ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Vegan">Vegan</button>
          <button type="button" className={filters.foodOption_Vegetarian ? 'btn' : 'btn-disabled'} onClick={handleChange} id="foodOption_Vegetarian">Vegetarian</button>
          {/* <button type="button" className={filters.outdoorSeating ? 'btn' : 'btn-disabled'} onClick={handleChange} id="outdoorSeating">Outdoor Seating</button> */}
        </div>
        {randomRestaurantId &&
        <div className='random-link-wrapper'>
          <Link to={`/restaurants/${randomRestaurantId}`}>
            <button className="btn-light btn-random">
            Can't decide? Discover a random restaurant!
            </button>
          </Link>
        </div>
        }
      </div>
    </div>
  )
}

FoodOptions.propTypes = {
filters: PropTypes.object,
handleChange: PropTypes.func,
heading: PropTypes.string,
randomRestaurantId: PropTypes.string
}

export default FoodOptions