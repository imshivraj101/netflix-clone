import React from 'react'

import './Footer.css';
import facebook_icon from '../../assets/facebook_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import instagram_icon from '../../assets/instagram_icon.png';
import youtube_icon from '../../assets/youtube_icon.png';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        <img src={
          facebook_icon} 
          className='footer-icon' 
          style={{ width: '24px', height: '24px' }
        }alt="Facebook" />
        <img src={twitter_icon}alt="Twitter" />
        <img src={instagram_icon}alt="Instagram" />
        <img src={youtube_icon}alt="YouTube" />
      </div>

      <ul>

          <li>Audio Description</li>
          <li> Help Centre</li>
        <li>Gift Cards</li>
         <li> Investor Relations</li> 
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
        <li>Speed Test</li>
        <li>Legal Notices</li>
      </ul>


      <p className='copyright-text'>
        © 2023 TrailerPark, Inc. All rights reserved.
        </p>
      </div>
  )
}

export default Footer