import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../../store/features/auth/authSlice'
import ConfirmationModal from '../../components/Modals/ConfirmationModal'
import './ForgotPassword.css'

const ForgotPassword = () => {

    const { user, loading, error } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
      email: '', 
    })
  
    const handleChange = (e) => {
      const { id, value } = e.target
      setFormData(initState => ({
        ...initState,
        [id]: value
      }))
    }
  
    const handleReset = async (e) => {
      e.preventDefault()
      await dispatch(resetPassword(formData.email))
      if(formData.email) {
        setShowModal(true)
      }
    }

  return (
    <div className='ForgotPassword padding-top-navbar'>
       { showModal && <ConfirmationModal setShowModal={setShowModal} text="Check your inbox for an email!"/> }
    <div className='login-form-container'>
        <h1>Reset Password</h1>
      <form noValidate className='login-form'>
        <label htmlFor="email">Email</label>
        <input type="email" className='form-control' id="email" value={formData.email} onChange={handleChange}/>
        {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div className='link-to-login'><Link to="/login">Go back to login</Link></div>

        <button className='btn' onClick={handleReset}>Reset Password</button>
      </form>
    </div>
  </div>
  )
}

export default ForgotPassword