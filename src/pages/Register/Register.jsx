import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { registerUser, setError } from '../../store/features/auth/authSlice'
import { closeModal, openLoginModal } from '../../store/features/modal/modalSlice'
import './Register.css'


const Register = () => {

  //tbd error message follow from regsiter/login/forgot password, fix that

  const { user, loading, error } = useSelector(state => state.auth)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: '', 
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(initState => ({
      ...initState,
      [id]: value
    }))
  }

  useEffect(() => {
    dispatch(setError(''))
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.password != formData.confirmPassword) {
      dispatch(setError('The passwords do not match'))
      return
    }
    if(!formData.email.endsWith('@seenthis.se') ) {
      dispatch(setError('This is only for SeenThis employes (and their emails).'))
      return
    }

    await dispatch(registerUser(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    if(user && submitted) {
      navigate('/')
    }
  }, [submitted, user])

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleOpenLoginModal = () => {
    dispatch(closeModal())
    dispatch(openLoginModal())
  }

  return (
    <div className='Register padding-top-navbar'>
      <div className='btn-and-form'>
      <div className="register-form-container">
      <p>Already registered?
        <span 
        onClick={handleOpenLoginModal}
        className='underline'>
          Login
        </span>
      </p>
      <form noValidate className='register-form'>
        <label htmlFor="email">Email</label>
        <input type="email" className='form-control' id="email" value={formData.email} onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" className='form-control' id="password" value={formData.password} onChange={handleChange}/>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input type="password" className='form-control' id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}/>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        <button className='btn' onClick={handleSubmit}>Register</button>
      </form>
      </div>
      <button className="btn btn-close-modal" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  )
}

export default Register