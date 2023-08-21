import { Button, Col, Row, Space } from 'antd'
import React from 'react'

const destinations = [
  {
    image: '/images/ooty.jpg',
    category: 'EXPERIENCIAL STAYS IN',
    name: 'Ooty, India',
    tag: 'Experience'
  },
  {
    image: '/images/ooty.jpg',
    category: 'EXPERIENCIAL STAYS IN',
    name: 'Ooty, India',
    tag: 'Experience'
  },
  {
    image: '/images/ooty.jpg',
    category: 'EXPERIENCIAL STAYS IN',
    name: 'Ooty, India',
    tag: 'Experience'
  },
  {
    image: '/images/ooty.jpg',
    category: 'EXPERIENCIAL STAYS IN',
    name: 'Ooty, India',
    tag: 'Experience'
  },
  {
    image: '/images/ooty.jpg',
    category: 'EXPERIENCIAL STAYS IN',
    name: 'Ooty, India',
    tag: 'Experience'
  }
]

const Destinations = () => {
  return (
    <section className='section destinations'>
        <div className="container">
            <Row>
              <Col md={12} xs={24}>
                <h2>A header for the destinations</h2>
              </Col>
              <Col md={12} xs={24}>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className="destinations-cta">
                  <Button size='large' shape='round' className='so-button primary-dark'>Lets Explore</Button>
                  <Button size='large' shape='round' className='so-button ghost-dark'>Read More</Button>
                </div>
              </Col>
            </Row>
            <br />
            <div className="destinations-destination-grid">
            <Row gutter={30}>
              <Col md={16}>
                <div className="destinations-desination">
                <div className="destinations-destination-bg">
                  <img className='destinations-destination-bg-img' src={destinations[0].image} />
                </div>
                  <div className="destinations-destination-overlay" />
                  <div className="destinations-destination-content">
                    <h4>{destinations[0].category}</h4>
                    <h2>{destinations[0].name}</h2>
                    <div className="tag">
                      {destinations[0].tag}
                    </div>
                  </div> 
                </div>
              </Col>
              <Col md={8}>
              <div className="destinations-desination">
                  <div className="destinations-destination-bg">
                    <img className='destinations-destination-bg-img' src={destinations[0].image} />
                  </div>
                  <div className="destinations-destination-overlay" />
                  <div className="destinations-destination-content">
                    <h4>{destinations[0].category}</h4>
                    <h2>{destinations[0].name}</h2>
                    <div className="tag">
                      {destinations[0].tag}
                    </div>
                  </div> 
                </div>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col md={8}>
                <div className="destinations-desination">
                  <div className="destinations-destination-bg">
                    <img className='destinations-destination-bg-img' src={destinations[0].image} />
                  </div>
                  <div className="destinations-destination-overlay" />
                  <div className="destinations-destination-content">
                    <h4>{destinations[0].category}</h4>
                    <h2>{destinations[0].name}</h2>
                    <div className="tag">
                      {destinations[0].tag}
                    </div>
                  </div> 
                </div>
              </Col>
              <Col md={8}>
                <div className="destinations-desination">
                  <div className="destinations-destination-bg">
                    <img className='destinations-destination-bg-img' src={destinations[0].image} />
                  </div>
                  <div className="destinations-destination-overlay" />
                  <div className="destinations-destination-content">
                    <h4>{destinations[0].category}</h4>
                    <h2>{destinations[0].name}</h2>
                    <div className="tag">
                      {destinations[0].tag}
                    </div>
                  </div> 
                </div>
              </Col>
              <Col md={8}>
                <div className="destinations-desination">
                  <div className="destinations-destination-bg">
                    <img className='destinations-destination-bg-img' src={destinations[0].image} />
                  </div>
                  <div className="destinations-destination-overlay" />
                  <div className="destinations-destination-content">
                    <h4>{destinations[0].category}</h4>
                    <h2>{destinations[0].name}</h2>
                    <div className="tag">
                      {destinations[0].tag}
                    </div>
                  </div> 
                </div>
              </Col>
            </Row>
            </div>
        </div>
    </section>
  )
}

export default Destinations