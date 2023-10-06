import { Col, Row } from 'antd'
import React from 'react'
import logo from "../../assets/images/logo_v1.svg"
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='footer'>
        <div className="container">
            <Row>
                <Col md={12}>
                    <Link href={'/'}><Image width={200} height={46.7} src={logo.src} alt={'SwitchOFF Logo'} /></Link>
                    <div className='footer-address'>
                        <h2>LITBIT TECHNOLOGIES PVT. LTD.</h2>
                        <p>Bengaluru, INDIA</p>
                        <ul className='footer-socials'>
                            <li>INST</li>
                            <li>FB</li>
                            <li>TW</li>
                            <li>G+</li>
                            <li>LI</li>
                        </ul>
                    </div>
                </Col>
                <Col md={12}>
                    <Row>
                        <Col md={8}>
                            <h4>ABOUT SWITCHOFF</h4>
                            <ul>
                                <li>ABOUT US</li>
                                <li>CAREERS</li>
                                <li>BLOGS</li>
                                <li>SITE MAP</li>
                            </ul>
                        </Col>
                        <Col md={8}>
                            <h4>INFORMATION</h4>
                            <ul>
                                <li>MY ACCOUNT</li>
                                <li>HELP & CONTACT</li>
                                <li>CAREERS</li>
                                <li>GETTING ONBOARD</li>
                            </ul>
                        </Col>
                        <Col md={8}>
                            <h4>T&CS</h4>
                            <ul>
                                <li><Link href={'/terms-conditions'}>TERMS & CONDITIONS</Link></li>
                                <li>YOUR DATA</li>
                                <li><Link href={'/privacy-policy'}>PRIVACY POLICY</Link></li>
                                <li>TRUST & SAFETY</li>
                                <li>FAQ</li>
                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    </footer>
  )
}

export default Footer