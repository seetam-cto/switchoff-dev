import { Button, Col, Row, Space } from 'antd'
import Link from 'next/link'
import React from 'react'

const Destinations = ({data}) => {
  return (
    <section id="destinations" className='section destinations'>
        <div className="container">
            <Row>
              <Col md={12} xs={24}>
                <h2 dangerouslySetInnerHTML={{__html: data?.destinations?.heading}} />
              </Col>
              <Col md={12} xs={24}>
                <p>{data?.destinations?.description}</p>
                <div className="destinations-cta">
                  <Link href={`/${data?.destinations?.link}`} size='large' shape='round' className='so-button primary-dark'>Lets Explore</Link>
                  {/* <Button size='large' shape='round' className='so-button ghost-dark'>Read More</Button> */}
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <div className="destinations-destination-grid">
            <Row gutter={[30,30]}>
              {data?.destinations?.items.map((dest, i) => (
                <Col md={i == 0 ? 16 : 8}>
                  <div className="destinations-desination">
                  <div className="destinations-destination-bg">
                    <img className='destinations-destination-bg-img' src={dest.coverImage.url} />
                  </div>
                    <div className="destinations-destination-overlay" />
                    <div className="destinations-destination-content">
                      <h4>{dest.subHeading}</h4>
                      <h2>{dest.heading}</h2>
                      <div className="tag">
                        {dest.tag}
                      </div>
                    </div> 
                  </div>
                </Col>
              ))}
            </Row>
            </div>
        </div>
    </section>
  )
}

export default Destinations