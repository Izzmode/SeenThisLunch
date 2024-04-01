import './Add.css'
import { useEffect, useState } from 'react'
import { addRestaurant } from '../../store/features/restaurants/restaurantSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select';
import Hero from '../../components/Hero/Hero'
import Checkbox from '../../components/Checkbox/Checkbox'
import FoodOptions from '../../components/FoodOptions/FoodOptions'

const Add = () => {
  //TBD ta bort checkbox? ta bort outdoor seating från foodoptions? ändra namn på foodoptions?

  const { user } = useSelector(state => state.auth)
  const { error } = useSelector(state => state.restaurants)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isDisabled, setIsDisabled] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageURL, setErrorMessageURL] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    imageURL: '',
    area: '',
    address: '',
    email: '',
    phoneNumber: '',
    priceRange: '',
    foodOption_Buffet: false,
    foodOption_Fish: false,
    foodOption_Hamburger: false,
    foodOption_Other: false,
    foodOption_Pasta: false,
    foodOption_Pizza: false,
    foodOption_Ramen: false,
    foodOption_Sallad: false,
    foodOption_Sausage: false,
    foodOption_Schnitzel: false,
    foodOption_Soup: false,
    foodOption_Sushi: false,
    foodOption_Tacos: false,
    foodOption_Vegan: false,
    foodOption_Vegetarian: false,
    outdoorSeating: false,
    openingHours: '',
    closingHours: '',
  })

  useEffect(() => {
    if(formData.name && formData.website) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }

  }, [formData.name, formData.website])

  const handleChange = (e) => {
  const { id, value, type, checked } = e.target;

  if (id === 'phoneNumber') {
    const formattedPhoneNumber = value.replace(/[^0-9\-–\s]/g, '');

    setFormData(form => ({
      ...form,
      [id]: formattedPhoneNumber,
    }));
  } else {
    if (type === 'checkbox') {
      setFormData(form => ({
        ...form,
        [id]: checked
      }));
    } else if (type === 'button') { 
      //this checks for the foodoption buttons, if so toggle between true and false
      setFormData(prev => ({
        ...prev,
        [id]: !prev[id] 
      }));
           } else {
      if(formData.name){
        setErrorMessage('')
      }
      if(formData.website){
        setErrorMessageURL('')
      }
      setFormData(form => ({
        ...form,
        [id]: value,
      }));
    }
  }
  };

  const onSubmit = (e) => {
    e.preventDefault()
    let websiteIsValid = true;
    try {
      new URL(formData.website);
    } catch (error) {
      websiteIsValid = false;
    }

    if(!formData.name && !websiteIsValid) {
      setErrorMessage('You need to enter the restaurants name')
      setErrorMessageURL('Invalid website URL')
      return
    }

    if (!websiteIsValid) {
      setErrorMessageURL('Invalid website URL')
      return;
    }

    if(!formData.name) {
      setErrorMessage('You need to enter the restaurants name')
      return
    }


    if(formData.name && formData.website && websiteIsValid) {
      setErrorMessage('')
      setErrorMessageURL('')
      dispatch(addRestaurant(formData))
      .then(() => {
        navigate('/');
      })

    } else {
      return
    }

  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '1px solid grey' : '1px solid grey', 
      height: '3rem',
      boxShadow: 'none', 
      '&:hover': {
        borderColor: 'grey',
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ffccb3;' : state.isFocused ? '#ffefe7' : 'transparent', 
      color: state.isSelected ? '#000000' : '#000000',
    }),
  };

  const areaOptions = [
    { value: 'Hammarby Sjöstad', label: 'Hammarby Sjöstad' },
    { value: 'Skanstull', label: 'Skanstull' },
    { value: 'Medborgarplatsen', label: 'Medborgarplatsen' }
  ];

  return (
    <div className="Add padding-top-navbar">
      <Hero header='Add Restaurant'/>
      <div className='add-text'>
      <h2>Lunchtime hero needed!</h2>
      <p>Think you've found the best spot in town? <br/>
      Add a restaurant below! <br/></p>
      <p className='margin-p'>The more details you provide, the easier it will be for others to find their next favorite lunch spot.</p>
      </div>
      <form className="add-resturant-form">
      <p className='error'>{errorMessage && errorMessage}</p>
        <label htmlFor="name">Resturant name *
          <input type="text" id="name" className='resturant-input' autoComplete="off" value={formData.name} onChange={handleChange}/>
        </label>
        <p className='error'>{errorMessageURL && errorMessageURL}</p>
        <label htmlFor="website">Website URL *
          <input type="text" id="website" className='resturant-input' autoComplete="off" value={formData.website} onChange={handleChange}/>
        </label>
        <label htmlFor="imageURL">Image URL
          <input type="text" id="imageURL" className='resturant-input' autoComplete="off" value={formData.imageURL} onChange={handleChange}/>
        </label>
        <label htmlFor="area">Area
          <Select
            id="area"
            value={areaOptions.find(option => option.value === formData.area)}
            options={areaOptions}
            onChange={(selectedOption) => handleChange({ target: { id: 'area', value: selectedOption.value } })}
            className='select-input'
            styles={customStyles}
          />
        </label>
        <label htmlFor="address">Address
          <input type="text" id="address" className='resturant-input' autoComplete="off" placeholder="Street name and number only (e.g., Hammarby kaj 10d)" value={formData.address} onChange={handleChange}/>
        </label>
        <label htmlFor="address">Restaurant email
          <input type="email" id="email" className='resturant-input' autoComplete="off" value={formData.email} onChange={handleChange}/>
        </label>
        <label htmlFor="address">Restaurant phone number
          <input type="text" id="phoneNumber" className='resturant-input' autoComplete="off" value={formData.phoneNumber} onChange={handleChange} />
        </label>
        <label htmlFor="address">Approximate price range
          <input type="text" id="priceRange" className='resturant-input' autoComplete="off" placeholder='150-200kr' value={formData.priceRange} onChange={handleChange}/>
        </label>
        <label htmlFor="openingHours">What time do they open for lunch?
          <input type="time" id="openingHours" className='resturant-input' placeholder="Hammarbykaj 10d" value={formData.openingHours} onChange={handleChange}/>
        </label>
        <label htmlFor="closingHours">What time do they close for lunch?
          <input type="time" id="closingHours" className='resturant-input' value={formData.closingHours} onChange={handleChange}/>
        </label>
        <Checkbox label='Does the restaurant offer outdoor seating?' initState={formData.outdoorSeating} handleChange={handleChange} id="outdoorSeating"/>
        <FoodOptions handleChange={handleChange} heading="What amenities does this restaurant offer?" filters={formData}/>
        {error && <p className='error'>{ error }</p>}
        <button className={`btn btn-submit ${isDisabled && `disabled`}`} onClick={onSubmit}>Add Resturant</button>
      </form>
    </div>
  )
}

export default Add