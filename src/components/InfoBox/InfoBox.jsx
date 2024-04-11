import './InfoBox.css'
import { MdEmail } from "react-icons/md";
import { FaDollarSign, FaCloudSun, FaClock, FaMapPin, FaPhoneAlt, FaGlobe } from 'react-icons/fa';

const InfoBox = ({restaurant}) => {
  return (
      <div className="InfoBox">
        <h3 className='info-card-text'>{restaurant.name}</h3>
        <p className='icon-and-number'>
          <FaClock className="icon"/> 
          { restaurant.openingHours && restaurant.closingHours ?
          <span>{restaurant.openingHours} - {restaurant.closingHours}</span>
            :
            <span>Opening hours are not registered</span>
          }
        </p>
        <p className='icon-and-number'>
          <FaMapPin className="icon"/> 
          { restaurant.address ?
          <span className='info-card-text'>{restaurant.address}</span>
          :
          <span>No address is registered</span>
        }
        </p>
        { restaurant.outdoorSeating &&

        <p className='icon-and-number'>
          <FaCloudSun className="icon"/> 
          <span>Outdoor seating</span>
        </p>
        }
        { restaurant.priceRange &&
        <p className='icon-and-number'>
          <FaDollarSign className="icon"/> 
          <span className='info-card-text'>{restaurant.priceRange}</span>
        </p>
        }
        <p className='icon-and-number'>
          <FaPhoneAlt className="icon"/> 
          { restaurant.phoneNumber ?
          <span>{restaurant.phoneNumber}</span>
          :
          <span>No phone number is registered</span>
        }
        </p>
        <p className='icon-and-number'>
          <MdEmail className="icon"/> 
          { restaurant.email ?
          <span><a href={`mailto:${restaurant.email}`}>{restaurant.email}</a></span>
          :
          <span>No email is registered</span>
        }
        </p>
        <p className='icon-and-number'>
          <FaGlobe className="icon"/> 
          <span><a href={restaurant.website} target="_blank" rel="noopener noreferrer">To Restaurant Webpage</a></span>
        </p>
      </div>
  )
}

export default InfoBox