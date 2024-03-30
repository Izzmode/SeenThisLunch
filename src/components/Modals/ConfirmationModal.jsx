import './ConfirmationModal.css'

const ConfirmationModal = ({setShowModal, text}) => {
  return (
    <div className='ConfirmationModal'>
        <p>{text}</p>
    
    <button className="btn" onClick={() => setShowModal(false)}>Close</button>
    </div>
  )
}

export default ConfirmationModal