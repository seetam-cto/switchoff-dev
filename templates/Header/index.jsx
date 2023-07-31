import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {ArrowRightOutlined} from '@ant-design/icons' 
import {TiLocation} from 'react-icons/ti'
import { atom } from 'jotai'
import Logo from '@/components/Elements/Logo'

export const userLocation = atom({
    latitude: 0
})

const Header = () => {
    const [location, setLocation] = useState("Destination")
    return (
        <header className='header'>
            <div className="container">
                <div className="header-desktop">
                    <div className="header-logo">
                        <Logo />
                    </div>
                    <div className="header-menu">
                        <ul>
                            <li>Destinations</li>
                            <li>Features</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="header-user">
                        <button className='so-button ghost'><TiLocation /> {location}</button>
                        <button className='so-button primary'>Sign In</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header