import { Button, Col, Row } from 'antd'
import Image from 'next/image'
import React from 'react'
import {ArrowRightOutlined} from '@ant-design/icons' 

const Header = () => {
  return (
    <header className='header'>
        <div className="container">
            <div className="header-desktop">
                <div className="header-logo">
                    Logo
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
                    <Button size='large' shape='round'>Sign In <ArrowRightOutlined /></Button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header