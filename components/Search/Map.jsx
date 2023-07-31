import React, { useEffect, useRef, useState, useCallback } from 'react'
import ReactMapGL, {Marker, Popup, NavigationControl } from "react-map-gl"
import Supercluster from 'supercluster'
import {RiHotelFill} from 'react-icons/ri'
import { motion } from 'framer-motion'
import mapboxgl from 'mapbox-gl'

const Map = ({center, setCenter, properties, mapLoading, isText, setIsText}) => {
    const [viewport, setViewport] = useState({
        latitude: 12.4244,
        longitude: 75.7382,
        zoom: 6.5,
        transitionDuration: 1000,
        padding: {
            top: 100
        }
    })

    const [tempViewport, setTempViewport] = useState(viewport)

    const mapRef = useRef()

    const getMapBounds = (markers) => {
        const bounds = new mapboxgl.LngLatBounds()

        markers.forEach(marker => {
            bounds.extend([marker.labels.location.coordinates.longitude, marker.labels.location.coordinates.latitude])
        })

        return bounds
    }

    const supercluster = new Supercluster({
        radius: 40,
        maxZoom: 16,
    });

    // Load the data into Supercluster
    supercluster.load(properties.map((item) => ({ geometry: { coordinates: [item.labels.location.coordinates.longitude, item.labels.location.coordinates.latitude] }, properties: item })));
    // Cluster the data based on the current map viewport
    const clusters = supercluster.getClusters([-180, -85, 180, 85], Math.round(viewport.zoom));
    
    // Function to handle cluster clicks
    const handleClusterClick = (cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        setViewport({
        ...viewport,
        latitude,
        longitude,
        zoom: viewport.zoom + 3,
        });
    };

    const handleViewport = (sts) => {
        const {width, height, ...etc} = sts
        setViewport(...etc)
    }
    
    useEffect(() => {
        setViewport({...center})
    },[center])

    useEffect(() => {
        if(isText && mapRef.current && properties.length > 0){
            const bounds = getMapBounds(properties)
            mapRef.current.fitBounds(bounds, {
                padding: 50,
                maxZoom: 15
            })
            setIsText(false)
        }
    }, [isText])

    return (
        <div className="map">
            {mapLoading && <motion.div
            key={"map-loading"}
            initial={{y: -100, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: -100, opacity: 0}}
            className="map-loading">
                Loading...
            </motion.div>}
            <ReactMapGL
            ref={mapRef}
            minZoom={3.5}
            maxZoom={19}
            width={780}
            height={'72vh'}
            onViewportChange={(viewport) => handleViewport(viewport)}
            className="map-wrapper"
            mapStyle={'mapbox://styles/seetam-divkar/cli8gnwl200ro01qu1k3v62bs?optimize=true'}
            mapboxAccessToken={process.env.mapbox_key}
            onMove={(e) => {setTempViewport(e.viewState);}}
            onMoveEnd={(e) => {setCenter(e.viewState)}}
            {...tempViewport}
            > 
            {/* Render the clustered markers */}
            {clusters.map((cluster) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                if (cluster.properties.cluster) {
                return (
                    <Marker key={cluster.id} longitude={longitude} latitude={latitude}>
                    <div
                        className="cluster-marker"
                        onClick={() => handleClusterClick(cluster)}
                        style={{
                        width: `${10 + (cluster.properties.point_count / properties.length) * 20}px`,
                        height: `${10 + (cluster.properties.point_count / properties.length) * 20}px`,
                        }}
                    >
                        <span className='map-price'>{cluster.properties.point_count} <RiHotelFill /></span>
                    </div>
                    </Marker>
                );
                }
                return (
                <Marker key={cluster.properties.id} longitude={longitude} latitude={latitude}>
                    
                    <span className='map-price'>₹{cluster.properties.price.toLocaleString()}</span>
                </Marker>
                );
            })}
                <NavigationControl position='bottom-right' />
            </ReactMapGL>
        </div>
    )
}

export default Map