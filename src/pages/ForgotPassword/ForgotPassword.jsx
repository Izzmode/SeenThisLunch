import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, setError } from '../../store/features/auth/authSlice'
import ConfirmationModal from '../../components/Modals/ConfirmationModal'
import { closeModal, openLoginModal, openConfirmationModal } from '../../store/features/modal/modalSlice'
import './ForgotPassword.css'

const ForgotPassword = () => {

  const { loading, error } = useSelector(state => state.modal)
  const { confirmationModalOpen } = useSelector(state => state.modal)

  const dispatch = useDispatch()
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
      // dispatch(closeModal())
      dispatch(openConfirmationModal())
    }
  }

  useEffect(() => {
    dispatch(setError(''))
  }, [])

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  const handleOpenLoginModal = () => {
    dispatch(closeModal())
    dispatch(openLoginModal())
  }

  return (
    <div className='ForgotPassword padding-top-navbar'>
       { confirmationModalOpen && <ConfirmationModal text="Check your inbox for an email!"/> }
      <div className='btn-and-form'>
      <div className='form-container'>
        <h1>Reset Password</h1>
        <form noValidate className='reset-form'>
          <label htmlFor="email">Email</label>
          <input type="email" className='form-control' id="email" value={formData.email} onChange={handleChange}/>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <div 
          className='link-to-login' 
          onClick={handleOpenLoginModal}
          >
            Go back to login
          </div>
          <button className='btn' onClick={handleReset}>Reset Password</button>
        </form>
      </div>
      <button className="btn btn-close-modal" onClick={handleCloseModal}>Close</button>
      </div>
    </div>
  )
}

export default ForgotPassword