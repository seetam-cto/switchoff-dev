import Search from '@/components/Search'
import React from 'react'
import bg from '../../assets/images/hero-bg-2.jpg'
import expbg from '../../assets/images/experience-bg.jpg'
import {TbRoute} from 'react-icons/tb'
import {CiUser} from 'react-icons/ci'
import { atom, useAtom } from 'jotai'

export const logoState = atom(true)

const Hero = () => {
  const [logo, setLogo] = useAtom(logoState)
  return (
    <div className="hero">
        <img src={logo ? bg.src : expbg.src} className='hero-bg' />
        <div className="hero-overlay" />
        <div className="container">
            <div className="hero-searchbox">
                <Search />
            </div>
            <div className={`hero-headings ${logo ? 'darkbg' : 'lightbg'}`}>
              <h1>{logo ? 'Luxury' : 'Experiential'} Stays Redefined</h1>
              <h2>Book Your Dream Stay with <span>AI-Enabled</span> Simplicity</h2>
            </div>
            <div className="hero-quicks">
              
            </div>
            <div className="hero-info">
              <div className='hero-info-sub'>
                {/* <div className="hero-info-box">
                  <div className="icon">
                    <TbRoute />
                  </div>
                  <div className="text">
                    Provides a visual representation of<br />
                    destinations, attractions, and activities.
                  </div>
                </div>
                <div className="hero-info-box">
                  <div className="icon">
                    <CiUser />
                  </div>
                  <div className="text">
                    Provides travelers with more accurate<br />
                    and reliable perspective of the destination.
                  </div>
                </div> */}
              </div>
              <div className="hero-info-sub">
                
              </div>
            </div>
        </div>
    </div>
  )
}

export default Hero