import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../store/features/auth/authSlice'
import './Login.css'

const Login = () => {
  //TBD gör till modal? logga in krav för allt?

  const { user, loading, error } = useSelector(state => state.auth)
  const navigate = useNavigate();
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
    if(user && submitted) {
      navigate('/')
    }
  }, [submitted, user])

  return (
    <div className='Login padding-top-navbar'>
      <div className='login-form-container'>
        <p className='register-link'>Don't have an account? <Link to="/register">Register</Link></p>
        <form noValidate className='login-form'>
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control' id="email" value={formData.email} onChange={handleChange}/>
          <label htmlFor="password">Password</label>
          <input type="password" className='form-control' id="password" value={formData.password} onChange={handleChange}/>
          {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
          <button className='btn' onClick={handleLogin}>Log in to your account</button>
        </form>
      </div>
    </div>
  )
}

export default Login