import { useDispatch } from 'react-redux'
import { closeModal } from '../../store/features/modal/modalSlice'
import './ConfirmationModal.css'

const ConfirmationModal = ({ text }) => {
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(closeModal())
  }

  return (
    <div className='ConfirmationModal'>
      <div className='inner-modal'>
        <p>{text}</p>  
        <button className="btn" onClick={handleCloseModal}>Got it!</button>
      </div>
    </div>
  )
}

export default ConfirmationModal