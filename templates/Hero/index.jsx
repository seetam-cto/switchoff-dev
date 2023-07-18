import Search from '@/components/Search'
import React from 'react'
import bg from '../../assets/images/hero-bg.jpg'

const Hero = () => {
  return (
    <div className="hero" style={{backgroundImage: `url(${bg.src})`}}>
        <div className="hero-overlay" />
        <div className="container">
            <div className="hero-searchbox">
                <Search />
            </div>
        </div>
    </div>
  )
}

export default Hero