import { Button, Col, Modal, Row } from 'antd'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import {ArrowRightOutlined} from '@ant-design/icons' 
import {TiLocation} from 'react-icons/ti'
import { atom, useAtom } from 'jotai'
import Logo from '@/components/Elements/Logo'

export const userLocation = atom({
    latitude: 0
})

export const subsModal = atom({
    open: false,
    email: '',
    phone: ''
})

const Header = () => {
    const [location, setLocation] = useState("Destination")
    const [scrolled, setScrolled] = useState(false)
    const [data, setData] = useAtom(subsModal)

    const onSubmit = () => {
        console.log("Done")
        setData({...data, open: false})
    }

    const listenScrollEvent = () => {
        if (window.scrollY > window.innerHeight){
            setScrolled(true)
        }else{
            setScrolled(false)
        }
    }

    useEffect(() => {
        if(window){
            window.addEventListener('scroll', listenScrollEvent)
        }
        return () => {
            window.removeEventListener('scroll', listenScrollEvent)
        }
    },[])

    return (
        <>
        <header className={`header ${scrolled ? 'active' : ''}`}>
            <div className="container">
                <div className="header-desktop">
                    <div className="header-logo">
                        <Logo />
                    </div>
                    <div className="header-menu">
                        <ul>
                            <li><a href={'#destinations'}>Destinations</a></li>
                            <li>Features</li>
                            <li>About</li>
                            <li>Blog</li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                    <div className="header-user">
                        <button className='so-button ghost'><TiLocation /> {location}</button>
                        <button className='so-button primary' onClick={() => setData({...data, open: true})}>Stay Updated</button>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header