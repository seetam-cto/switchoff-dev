import { Tag, Tooltip } from 'antd'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchWeather } from '@/api/weather'
import { propertyModalState } from '@/pages'
import { useAtom } from 'jotai'

const SearchResultCard = ({property, mapv}) => {
    const colorOptions = ['green', 'blue', 'red', 'yellow'];
    const [propertyState, setPropertyState] = useAtom(propertyModalState)
    const [weather, setWeather] = useState(null)
    const getWeatherData = async (location) => {
        try{
            let res = await fetchWeather(location)
            let {data} = res
            setWeather(data)
        }catch(err){
            console.log(err)
        }
    }
    const handleOpenModal = () => {
        setPropertyState({
            open: true,
            propertyId: property.id,
            hotelId: property.hotelId
        })
    }
    useEffect(() => {
        let coords = property?.labels?.location?.coordinates
        getWeatherData(`${coords.latitude},${coords.longitude}`)
    },[])
    return (
        <motion.div
        key={property.id}
        initial={{y: 100, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        onClick={() => handleOpenModal(property.hotelId)}
        className="result-property-card">
            <div className={`result-property-card-image ${mapv ? 'short' : ''}`}>
                <Image src={property.image} width={300} height={100} alt={property.name} />
            </div>
            <div className="result-property-card-content">
                <div className="info">
                    <h2 className={`card-title ${mapv ? 'short' : ''}`}>{property.name}</h2>
                    <p className="card-address">
                        {property.labels.location.address.city}, {property.labels.location.address.province}
                    </p>
                    <div className="card-amenities">
                        {property?.labels?.topAmenities.slice(0,mapv ? 3 : 5).map((amn, i) => (
                            <div key={i} className="card-amenities-amenity">
                                <span className="material-icons">
                                    {amn.icon}
                                </span>
                                <span className="text">
                                    {amn.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="result-property-card-weather">
                        <Tooltip title={weather?.current?.condition?.text}>
                            <img src={`https:${weather?.current?.condition?.icon}`} alt="" width={30} height={30} />
                        </Tooltip>
                    </div>
                </div>
                <div className="result-property-card-price">
                        starts from<br />
                        <span>₹{property.price.toLocaleString()}</span>/night
                </div>
            </div>
        </motion.div>
    )
}

export default SearchResultCard