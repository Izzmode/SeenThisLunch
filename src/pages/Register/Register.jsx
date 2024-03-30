import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, setError } from '../../store/features/auth/authSlice'
import { useEffect, useState } from 'react'

const Register = () => {

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(formData.password != formData.confirmPassword) {
      dispatch(setError('The passwords do not match'))
      return
    }
    // if(!formData.email.endsWith('@seenthis.se') ) {
    //   dispatch(setError('This is only for SeenThis employes (and their emails)'))
    //   return
    // }
    //lägg till så det måste vara seenthis mail? bekräftelse mail?

    await dispatch(registerUser(formData))
    setSubmitted(true)
  }

  useEffect(() => {
    if(user && submitted) {
      navigate('/')
    }
  }, [submitted, user])

  return (
    <div className='Register padding-top-navbar'>
      <div className="register-form-container">
      <p>Already registered? <Link to="/login">Login</Link></p>
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
    </div>
  )
}

export default Register