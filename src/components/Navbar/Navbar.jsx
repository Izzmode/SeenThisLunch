import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout } from "react-icons/md";
import { logoutUser } from '../../store/features/auth/authSlice'
import './Navbar.css'
import { useEffect, useState } from 'react';


const Navbar = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [openHamburgerMenu, setOpenHamburgerMenu] = useState(false)

  const closeHamburgerMenu = () => {
    setOpenHamburgerMenu(false)
  }

  const handleLogout = async () => {
    navigate('/')
    dispatch(logoutUser())
    setOpenHamburgerMenu(false)
  }

  const handleToggleMenu = () => {
    setOpenHamburgerMenu(!openHamburgerMenu)
  };

  useEffect(() => {
    const storedVerifiedEmail = localStorage.getItem(`verifiedEmail${user?.uid}`);
    if (storedVerifiedEmail) {
      setVerifiedEmail(JSON.parse(storedVerifiedEmail));
    }
  }, [user]);

  return (
    <nav className="Navbar">
      <div className="container">
        <div className={`hamburger-menu ${openHamburgerMenu ? 'active' : ''}`} onClick={handleToggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <Link to="/">
        <div className='logo'>
          <p>SEENTHIS</p>
          <p>LUNCH</p>
        </div>
        </Link>
        <ul className={`ul-list ${openHamburgerMenu ? 'active' : ''}`}>
          { user && !verifiedEmail &&
            <p className='not-verified-prompt'>
            To get full access, please verify your emailadress
            </p>}
          <li className='list-item' onClick={closeHamburgerMenu}>
            <NavLink to="/">Restaurants</NavLink>
          </li>
          { user && verifiedEmail
            &&
            <>
            <li className='list-item' onClick={closeHamburgerMenu}>
            <NavLink to="/add">Add Restaurant</NavLink>
            </li>
          <li className='list-item' onClick={closeHamburgerMenu}>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          </>
          }
          { user ?
            <>
            <li 
            className='list-item list-item-logout' 
            onClick={handleLogout}>
              Logout <span className='logout-icon'><MdLogout /></span>
            </li>
            </>
            :
            <li className='list-item' onClick={closeHamburgerMenu}>
            <NavLink to="/login">Login</NavLink>
            </li>
          }

        </ul>
      </div> 
    </nav>
  )
}

export default Navbar