import './FoodOptions.css'
import { useState } from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


//ändra så filters blir typ foodoptions? eller bättre namn
//also ändra så det blir med understreck och det är efter det man hämtar ut namnet.
//så foodOption_Pasta: true typ.
const FoodOptions = ({ filters, handleChange, heading, randomRestaurantId }) => {

  const [rotateArrow, setRotateArrow] = useState(false)
  return (
    <div className="filter-checkboxes-container">
      <h2 className='heading-for-filtering-food'>{heading}</h2>
      <MdOutlineKeyboardArrowDown className={`icon-arrow-down ${rotateArrow ? 'arrow-down' : 'arrow-up'}`} onClick={() => setRotateArrow(!rotateArrow)}/>
      <div className={`filter-checkboxes-and-btn ${rotateArrow ? '' : 'hide-checkboxes'}`}>
        <div className="filter-checkboxes">
          <button type="button" className={filters.checkboxBuffet ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxBuffet" name="checkboxBuffet">Buffet</button>
          <button type="button" className={filters.checkboxFish ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxFish" name="checkboxFish">Fish</button>
          <button type="button" className={filters.checkboxHamburger ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxHamburger">Hamburger</button>
          <button type="button" className={filters.checkboxOther ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxOther">Other</button>
          <button type="button" className={filters.checkboxPasta ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxPasta">Pasta</button>
          <button type="button" className={filters.checkboxRamen ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxRamen">Ramen</button>
          <button type="button" className={filters.checkboxSallad ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxSallad">Sallad</button>
          <button type="button" className={filters.checkboxSausage ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxSausage">Sausage</button>
          <button type="button" className={filters.checkboxSchnitzel ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxSchnitzel">Schnitzel</button>
          <button type="button" className={filters.checkboxSushi ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxSushi">Sushi</button>
          <button type="button" className={filters.checkboxTacos ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxTacos">Tacos</button>
          <button type="button" className={filters.checkboxVegan ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxVegan">Vegan</button>
          <button type="button" className={filters.checkboxVegetarian ? 'btn' : 'btn-disabled'} onClick={handleChange} id="checkboxVegetarian">Vegetarian</button>
          <button type="button" className={filters.outdoorSeating ? 'btn' : 'btn-disabled'} onClick={handleChange} id="outdoorSeating">Outdoor Seating</button>
        </div>
        {randomRestaurantId &&
        <Link to={`/restaurants/${randomRestaurantId}`}>
          <button className="btn-light btn-random">
          Can't decide? Discover a random restaurant!
          </button>
        </Link>}
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