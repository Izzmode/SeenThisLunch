import './Checkbox.css'
import { useState } from 'react'
import PropTypes from 'prop-types';

const Checkbox = ({ label, initState, handleChange, id}) => {

  const [isChecked, setIsChecked] = useState(initState);

  const handleCheckboxChange = () => {
    // Update state based on the current state
    setIsChecked((prevChecked) => !prevChecked);
  };

  return (
    <div className="checkbox-wrapper">
    <label>
      <input 
      type="checkbox" 
      checked={isChecked} 
      onChange={handleChange}
      onClick={handleCheckboxChange}
      className={isChecked ? 'checked' : ''}
      id={id}
      />
      
      <span>{label}</span>
    </label>
  </div>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string,
  initState: PropTypes.bool,
  handleChange: PropTypes.func,
  id: PropTypes.string
  }

export default Checkbox