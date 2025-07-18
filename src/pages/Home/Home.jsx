import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import TitleCards from '../../components/TitleCards/TitleCards';

import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';

const Home = () => {
  return (
    <div className='home'>
      {/* Top Navigation */}
   

      {/* Hero Banner */}
      <div className='hero'>
        <img src={hero_banner} alt='Banner' className='banner-img' />

        <div className='hero-caption'>
          <img src={hero_title} alt='Hero Title' className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>

          <div className='hero-btns'>
            <button className='btn'>
              <img src={play_icon} alt='Play' />
              Watch Now
            </button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt='Info' />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Movie Rows */}
      <TitleCards title="Only on TrailerPark" category="popular" />
      <TitleCards title="Trending Now" category="upcoming" />
      <TitleCards title="Top Rated Movies" category="top_rated" />

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};

export default Home;
