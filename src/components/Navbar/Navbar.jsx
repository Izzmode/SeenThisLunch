import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout } from "react-icons/md";
import { logoutUser } from '../../store/features/auth/authSlice'
import './Navbar.css'


const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate('/')
    dispatch(logoutUser())
  }
  
  return (
    <nav className="Navbar">
      <div className="container">
        <div className='logo'><p>SEENTHIS</p><p>LUNCH</p></div>
        <ul className='ul-list'>
          <li className='list-item'>
            <NavLink to="/">Restaurants</NavLink>
          </li>
          { user
            ?
            <>
            <li className='list-item'>
            <NavLink to="/add">Add Restaurant</NavLink>
            </li>
          <li className='list-item'>
            <NavLink to="/profile">Profile</NavLink>
          </li>
            <li 
            className='list-item list-item-logout' 
            onClick={handleLogout}>
              Logout <span className='logout-icon'><MdLogout /></span>
            </li>
            </>
            :
            <li className='list-item'>
            <NavLink to="/login">Login</NavLink>
            </li>
          }

        </ul>
      </div> 
    </nav>
  )
}

export default Navbar