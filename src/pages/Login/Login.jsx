import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setError } from '../../store/features/auth/authSlice'
import { closeModal, openForgotPasswordModal, openRegisterModal } from '../../store/features/modal/modalSlice'

import './Login.css'

const Login = () => {
  // logga in krav för allt?
  //vad för typ av felmeddelanden?

  const { user, loading, error } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(initState => ({
      ...initState,
      [id]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    await dispatch(loginUser(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    dispatch(setError(''))
  }, [])

  useEffect(() => {
    if(user && submitted) {
      dispatch(closeModal())
    }
  }, [submitted, user])

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleOpenModal = (modal) => {
    if(modal === 'forgot') {
      dispatch(closeModal())
      dispatch(openForgotPasswordModal())
    }else if(modal === 'register'){
      dispatch(closeModal())
      dispatch(openRegisterModal())
    }
  }

  return (
    <div className='Login padding-top-navbar'>
      <div className='btn-and-form'>
        <div className='login-form-container'>
          <p className='register-link'>Don't have an account?  
            <span 
            onClick={() => handleOpenModal('register')}
            className='underline'>
              Register
            </span>
          </p>
          <form noValidate className='login-form'>
            <label htmlFor="email">Email</label>
            <input type="email" className='form-control' id="email" value={formData.email} onChange={handleChange}/>
            <label htmlFor="password">Password</label>
            <input type="password" className='form-control' id="password" value={formData.password} onChange={handleChange}/>
            {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}
              <div 
              onClick={() => handleOpenModal('forgot')}
              className='forgot-password'
              >
                Forgot password?
              </div>
            <button className='btn' onClick={handleLogin}>Log in to your account</button>
          </form>
        </div>
        <button className="btn btn-close-modal" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  )
}

export default Login