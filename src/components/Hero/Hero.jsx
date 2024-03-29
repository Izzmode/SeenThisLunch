import PropTypes from 'prop-types';
import './Hero.css'

const Hero = ({header}) => {
  return (
    <div className='Hero'>{header ? header : 'ello mate'}</div>
  )
}
Hero.propTypes = {
  header: PropTypes.string
  }

export default Hero