import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {faFacebook, faInstagram, faLinkedin, faTwitter} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
    <footer>
      <h3>©2021 Digital Booking</h3>
      <div className='redes'>
        <FontAwesomeIcon icon={faFacebook}/>
        <FontAwesomeIcon icon={faLinkedin}/>
        <FontAwesomeIcon icon={faTwitter}/>
        <FontAwesomeIcon icon={faInstagram}/>
      </div>
    </footer>
  )
}

export default Footer