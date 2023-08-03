import { Col, Modal, Popover, Row, Skeleton, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { propertyModalState } from '@/pages'
import { useAtom } from 'jotai'
import { getHotelOffers } from '@/api/hotelsCom'
import { searchParams } from '@/components/Search'
import {Image} from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import { BsImages } from 'react-icons/bs'
import { registerLead } from '@/api/server'

const PropertyModal = () => {
    const [propertyState, setPropertyState] = useAtom(propertyModalState)
    const [searchPs, setSearchPs] = useAtom(searchParams)
    const [active, setActive] = useState(true)
    const [hotelData, setHotelData] = useState(null)
    const [galleryView, setGalleryView] = useState(false)
    const [price, setPrice] = useState('')
    const [userData, setUserData] = useState({
        name: '',
        phone: ''
    })
    const [urlParams, setUrlParams] = useState({
        expediaPropertyId: propertyState.hotelId,
        tspid: '',
        roomTypeCode: '',
        rateCode: '',
        arrivalDate: '',
        departureDate: '',
        numberOfAdults: '',

    })

    useEffect(() => {
        setUrlParams({...urlParams,
        arrivalDate: searchPs.checkin_date,
        departureDate: searchPs.checkout_date,
        numberOfAdults: searchPs.adults_number,
        expediaPropertyId: propertyState.hotelId,
        tspid: 24
        })
    },[searchPs])
    const onCancel = () => {
        setPropertyState({
            open: false,
            propertyId: '',
            hotelId: ''
        })
        setHotelData(null)
        setActive(true)
    }
    const fetchHotelData = async () => {
        try{
            let res = await getHotelOffers(propertyState.hotelId, propertyState.propertyId, searchPs)
            setHotelData(res)
            setPrice(hotelData?.offers?.stickyBar?.displayPrice)
            setActive(false)
        }catch(err){
            console.log(err)
            message.error("Something went wrong!")
        }
    }

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                setSearchPs({
                    ...searchPs,
                    coordinates: [latitude, longitude]
                }, (error) => {
                    console.log('Error getting location:', error.message)
                })
            })
        }else{
            console.log('Geolocation is not available in this browser!')
        }
    },[])

    const registerData = async () => {
        let newUser = {
            name: userData.name,
            phone: userData.phone,
            propertyId: propertyState.propertyId,
            hotelId: propertyState.hotelId,
            roomCode: urlParams.roomTypeCode,
            rateCode: urlParams.rateCode,
            dates: urlParams.arrivalDate + ":" + urlParams.departureDate,
            atPrice: price,
            location: searchPs.coordinates.map(lt => lt.toString()).join(",")
        }
        try{
            let res = await registerLead(newUser)
            let {data} = res
            message.success(data.message)
            setTimeout(() => {
                window.open(`https://in.hotels.com/booking/details.html?bookingRequest.bookingApiVersion=v3&init=true&pos=HCOM_IN&locale=en_IN&bookingRequest.currency=INR&bookingRequest.expediaPropertyId=${propertyState.hotelId}&bookingRequest.tspid=${urlParams.tspid}&bookingRequest.items[0].roomTypeCode=${urlParams.roomTypeCode}&bookingRequest.items[0].rateCode=${urlParams.rateCode}&bookingRequest.items[0].arrivalDate=${urlParams.arrivalDate}&bookingRequest.items[0].departureDate=${urlParams.departureDate}&bookingRequest.items[0].businessModel=MERCHANT&bookingRequest.items[0].roomOccupancies[0].numberOfAdults=${urlParams.numberOfAdults}&rateUpsell=false&additionalAmount=0&roomUpsell=false&propertyUpsellAmount=0&rateUpgradeEligible=true&roomUpgradeEligible=true&swpApplied=false`,'_blank','noreferrer')
            },2000)
        }catch(err){
            console.log(err)
            message.error("Cant Register User")
        }
    }
    useEffect(() => {
        propertyState.open && propertyState.hotelId && propertyState.propertyId && fetchHotelData()
    },[propertyState])
    return (
        <Modal
        onCancel={onCancel}
        centered
        open={propertyState.open}
        className='property-modal'
        footer={null}
        >
            <div className="property-container">
                <div className="property-info">
                    <div className="property-info-data">
                        <div className="property-info-data-gallery" onClick={() => setGalleryView(true)}>
                            <div className="cover">
                                {active ? <Skeleton.Image active={active} className='skeleton-image' />
                                : <img
                                src={hotelData?.info?.hotelData?.propertyGallery?.images[0].image.url}
                                alt={hotelData?.info?.hotelData?.propertyGallery?.images[0].image.description}
                                className='cover-image' />}
                            </div>
                            <div className="thumbs">
                                <div className="thumbs-image">
                                    {active ? <Skeleton.Image active={!active} className='skeleton-image' />
                                    : <img
                                    src={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.url}
                                    alt={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.description}
                                    className='thumbs-image-block' />}
                                </div>
                                <div className="thumbs-image">
                                    {active ? <Skeleton.Image active={!active} className='skeleton-image' />
                                    : <img
                                    src={hotelData?.info?.hotelData?.propertyGallery?.images[2].image.url}
                                    alt={hotelData?.info?.hotelData?.propertyGallery?.images[2].image.description}
                                    className='thumbs-image-block' />}
                                </div>
                                <div className="thumbs-image">
                                    {active ? <Skeleton.Image active={!active} className='skeleton-image' />
                                    : <img
                                    src={hotelData?.info?.hotelData?.propertyGallery?.images[3].image.url}
                                    alt={hotelData?.info?.hotelData?.propertyGallery?.images[3].image.description}
                                    className='thumbs-image-block' />}
                                </div>
                                <div className="thumbs-image">
                                    {active ? <Skeleton.Image active={!active} className='skeleton-image' />
                                    : <img
                                    src={hotelData?.info?.hotelData?.propertyGallery?.images[4].image.url}
                                    alt={hotelData?.info?.hotelData?.propertyGallery?.images[4].image.description}
                                    className='thumbs-image-block' />}
                                    <div className="thumbs-image-block-total">
                                        <BsImages  /> {hotelData?.info?.hotelData?.propertyGallery?.images.length - 6}+
                                    </div>
                                </div>
                            </div>
                            {/* <Image.PreviewGroup>
                                <Image width={1080} height={720} style={{objectFit: 'contain'}} className='thumbs-image-block' src={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.url}
                                    alt={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.description} />
                                <Image width={1080} height={720} style={{objectFit: 'contain'}} className='thumbs-image-block' src={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.url}
                                alt={hotelData?.info?.hotelData?.propertyGallery?.images[1].image.description} />
                            </Image.PreviewGroup> */}
                        </div>
                        <div className="property-info-data-content">
                            <Row>
                                <Col md={16}>
                                    <div className="property-info-data-content-scroll">
                                        <h1>{hotelData?.info?.hotelData?.summary?.name}</h1>
                                        <p className="tagline">{hotelData?.info?.hotelData?.summary?.tagline}</p>
                                        <div className="review-rating">
                                            {hotelData?.info?.hotelData?.reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value && `Rated ${hotelData?.info?.hotelData?.reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value}`}
                                        </div>
                                        <div className="highlights">
                                            <h2>{hotelData?.info?.hotelData?.summary?.amenities?.topAmenities?.header?.text}</h2>
                                            <div className="highlights-amenities">
                                                {hotelData?.info?.hotelData?.summary?.amenities?.topAmenities?.items.map((am,i) => 
                                                    <div className="amenity">
                                                        <div className="amenity-icon">
                                                            <span className="material-icons">
                                                                {am.icon.id}
                                                            </span>
                                                        </div>
                                                        <div className="amenity-text">
                                                            {am.text}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="about">
                                            <p>{hotelData?.info?.hotelData?.propertyContentSectionGroups?.aboutThisProperty?.sections[0]?.bodySubSections[0]?.elements[0]?.items[0]?.content?.text}</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={8}>
                                    <img className='mapimage' map src={hotelData?.info?.hotelData?.summary?.location?.staticImage?.url} />
                                    <ul className='whatsaround'>{hotelData?.info?.hotelData?.summary?.location?.whatsAround?.editorial?.content.map((txt) => 
                                        <li>{txt}</li>
                                    )}</ul>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <div className="property-info-offers">
                        <h2>Rooms</h2>
                        <div className="offer">
                        {hotelData?.offers?.errorMessage !== null && 
                            <p className="offer-error">
                                {hotelData?.offers?.errorMessage?.title?.text.replace(' on Hotels.com.', '.')}
                            </p>
                        }
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={20}
                            modules={[Navigation]}
                            loop
                            navigation
                            >
                        {hotelData?.offers?.units.map((unit) => 
                                <SwiperSlide key={unit.id}>
                                    <div className="offer-room">
                                        <div className="offer-room-gallery">
                                            <div className="offer-room-gallery-nav">
                                                <div className={`offer-room-gallery-nav-prev nav-k${unit.id}`}>
                                                    <BsFillArrowLeftCircleFill />
                                                </div>
                                                <div className={`offer-room-gallery-nav-next nav-k${unit.id}`}>
                                                    <BsFillArrowRightCircleFill />
                                                </div>
                                            </div>
                                            <Swiper
                                            slidesPerView={1}
                                            modules={[Navigation]}
                                            className='offer-room-gallery-slider'                                    loop
                                            navigation={{
                                                nextEl: `.offer-room-gallery-nav-next.nav-k${unit.id}`,
                                                prevEl: `.offer-room-gallery-nav-prev.nav-k${unit.id}`,
                                                // disabledClass: 'swiper-button-disabled'
                                            }}
                                            >
                                                {unit?.unitGallery?.gallery.map((gi,i) => 
                                                    <SwiperSlide key={i}>
                                                        <img className='offer-room-gallery-image' src={gi.image.url} alt={gi.image.description} />
                                                    </SwiperSlide>
                                                )}
                                            </Swiper>
                                            <div className="offer-room-gallery-overlay" />
                                        </div>
                                        <div className="offer-room-content">
                                            <h2>{unit.header.text}</h2>
                                            {/* {propertyState.hotelId} */}
                                            <div className="offer-room-content-features">
                                                <h3>Room Features</h3>
                                                {/* {JSON.stringify(unit.features)} */}
                                                {unit.features.filter((ft) => ft.text != "Collect and Redeem").map((feat, i) => 
                                                <div key={i} className="offer-room-content-features-feature">
                                                    { (feat?.icon?.id || feat?.graphic?.token) &&<span className="material-icons">{(feat?.icon?.id || feat?.graphic?.token) && (feat?.icon?.id == "dimension" ? "select_all" : feat?.icon?.id)}</span>}
                                                    {feat.text}
                                                </div>
                                                )}
                                            </div>
                                            {/* <p dangerouslySetInnerHTML={{__html: unit.description}} className="offer-room-content-openroom" /> */}
                                            <div className="offer-room-packages">
                                            {unit.ratePlans.length > 0 ? unit?.ratePlans?.map((rp,i) => 
                                                <div className='offer-room-content-subprice' key={i}>
                                                    {rp.priceDetails?.map((pd,i) => 
                                                        <div key={`offer-room-${rp.id}-${i}`} className='offer-room-content-subprice-li' onClick={() => {setUrlParams({...urlParams, roomTypeCode: pd.roomTypeId, rateCode: rp.id}); setPrice(`₹${pd.price.total.amount}`);}}>
                                                            <p className="offer-room-content-subprice-li-price">
                                                                ₹{parseInt(pd.price.total.amount)}
                                                            </p>
                                                            <p className="offer-room-content-subprice-li-content">
                                                                {rp.amenities.map((rpam) => rpam.description).join(", ")}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="sold-out">
                                                    Sold Out
                                                </p>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            
                        )}</Swiper>
                        </div>
                    </div>
                    <div className="property-info-extras">
                        {hotelData.info?.hotelData?.summary?.amenities?.amenities?.map((amsec, i) => (
                            <div className="property-info-extras-amenities">
                                <h2>{amsec?.header?.text}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="property-container-footer">
                    <div className="property-container-footer-form">
                        <h3>Book Now</h3>
                        <input placeholder='Your Name' className='property-container-footer-form-item' value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})} type='text' />
                        <input placeholder='Your Phone No.' className='property-container-footer-form-item' value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} type='tel' />
                    </div>
                    <div className={`property-container-footer-button ${!userData.name || !userData.phone || !propertyState.hotelId || !urlParams.rateCode ? 'disabled' : ''}`}><span className='so-button-price'>from {price}</span>
                        <div className='so-button cta' onClick={() => registerData()}>
                            Continue
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PropertyModal