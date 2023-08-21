import { Form, Select, Button, Slider, Radio, Popover } from 'antd'
import React, {useState} from 'react'
import { atom, useAtom } from 'jotai'
import {BsArrowLeft} from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import luxury from '../../assets/icons/diamond.png'
import experience from '../../assets/icons/experience.png'
import { logoState } from '@/templates/Hero'
import Lottie from 'react-lottie'
import * as animationData from '../../assets/lottie/help.json'
import Filters from './Filters'

const GooglePlacesSelect = ({data, setData}) => {
    const [options, setOptions] = useState([])
    const [coordinates, setCoordinates] = useState(null)

    const handleSearch = (value) => {
        const autocomplete = new window.google.maps.places.AutocompleteService();
        if (value) {
          autocomplete.getPlacePredictions({ 
            input: value, 
            types: ['(regions)'],
            componentRestrictions: { country: 'IN' }
        }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
              setOptions(predictions);
            }
          });
        } else {
          setOptions([]);
        }
    };
    const handleSelect = (value, option) => {
        // const geocoder = new window.google.maps.Geocoder();
        // geocoder.geocode({ address: value }, (results, status) => {
        //   if (status === window.google.maps.GeocoderStatus.OK) {
        //     const location = results[0].geometry.location;
        //     setCoordinates({ lat: location.lat(), lng: location.lng() });
        //     setData({...data, location: value, coordinates: [location.lat(), location.lng()], error_location: null})
        //     console.log('Coordinates:', coordinates);
        //   }
        // });
        const placeId = option.key
        const request = {
        placeId,
        fields: ['name', 'geometry', 'photos']
        };
        const service = new window.google.maps.places.PlacesService(document.createElement('div'));
        service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const location = place.geometry.location;
            setCoordinates({ lat: location.lat(), lng: location.lng() });
            setData({...data, location: value, coordinates: [location.lat(), location.lng()], error_location: null})
            if (place.photos && place.photos.length > 0) {
                setData({...data, locationImg: place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 }), location: value, coordinates: [location.lat(), location.lng()], error_location: null})
            }
        }
        });

    };
    const handleClear = () => {
        setData({...data, location: null, coordinates: ['','']})
    }
    return (
        <Select
          showSearch
          defaultValue={data.location}
          bordered={false}
          placeholder="Select you destination"
          onSearch={handleSearch}
          onSelect={handleSelect}
          notFoundContent={null}
          filterOption={false}
          allowClear
          onClear={handleClear}
          style={{
            width: '100%'
          }}
          options={options.map((option) => {return {
            key: option.place_id,
            value: option.description,
            label: option.description
          }})}
        />
    );
}

export const searchFilters =  atom({
    location: null,
    locationImg: '',
    coordinates: ['',''],
    resortType: 'luxury',
    budgetMax: 60000,
    budgetMin: 10000,
    error_location: null,
    error_amenities: null,
    isFinal: false,
    state: true
})

const FilterForm = ({submit, res}) => {
    const [filterStep, setFilterStep] = useState(0)
    const [filters, setFilters] = useAtom(searchFilters)
    const [logo, setLogo] = useAtom(logoState)

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    const handleNext = () => {
        if(filterStep == 0 && !filters.location){
            setFilters({...filters, error_location: true})
            return
        }else{
            setFilters({...filters, error_location: null})
        }

        if(filterStep == 2){
            setFilters({...filters, isFinal: true})
        }else{
            setFilters({...filters, isFinal: false})
        }

        if(filterStep < 3){
            let current = filterStep
            setFilterStep(-1)
            setTimeout(() => {
                setFilterStep(current + 1)
            },500)
        }
    }
    const handlePrev = () => {
        if(filterStep > 0){
            let current = filterStep
            setFilterStep(-1)
            setTimeout(() => {
                setFilterStep(current - 1)
            },500)
        }
    }

    const onFilterSubmit = async (values) => {
        console.log(values)
    }
    const [form] = Form.useForm()
    return (
        <div className="search-results-filter-main">
            {filters.state ? (
                <div className="search-results-filter-quiz">
                    <div onClick={() => setFilters({...filters, state: false})} className="search-results-filter-quiz-close">
                        <span className="material-icons">close</span>
                    </div>
                    {filters && filters.isFinal ? <h2>Fantastic! Here&lsquo;s a quick summary of your preferences.</h2> : <h2>Let Us Help you with shortlisting your stay</h2>}
                <div className="search-results-filter-quiz-container">
                    <AnimatePresence>
                        {filterStep == 0 && 
                        <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: -100, opacity: 0}}
                        transition={{duration: .5, type: "spring", bounce: .2}}
                        key={`quiz-step1`}
                        className="search-results-filter-quiz-question">
                            <h3>
                                Let&lsquo;s start with the basics. Where are you dreaming of going on your next vacation?
                            </h3>
                            <div className="search-results-filter-quiz-select">
                                <GooglePlacesSelect data={filters} setData={setFilters} />
                            </div>
                            {filters.error_location && 
                                <motion.p
                                key={'error-message-location'}
                                initial={{y: -30, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={{y: -30, opacity: 0}}
                                className='error-message'>
                                    Please select a location
                            </motion.p>}
                        </motion.div>}
                        {filterStep == 1 && 
                        <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: -100, opacity: 0}}
                        transition={{duration: .5, type: "spring", bounce: .2}}
                        key={`quiz-step2`}
                        className="search-results-filter-quiz-question">
                            <h3>
                            Great choice! Now, could you tell us your budget range for the resort stay? Don&lsquo;t worry, we&lsquo;ll find the best options within your budget.
                            </h3>
                            <div className="search-results-filter-quiz-slider">
                                <span className='budget-tag'>₹1K</span>
                                <Slider style={{flex: 1}} i max={150000} min={1000} step={1000} range value={[filters.budgetMin, filters.budgetMax]} defaultValuevalue={[filters.budgetMin, filters.budgetMax]} onChange={(value) => setFilters({...filters, budgetMin: value[0], budgetMax: value[1]})} />
                                <span className='budget-tag'>₹1.5L+</span>
                            </div>
                        </motion.div>}
                        {filterStep == 2 && 
                        <motion.div
                        initial={{x: 100, opacity: 0}}
                        animate={{x: 0, opacity: 1}}
                        exit={{x: -100, opacity: 0}}
                        transition={{duration: .5, type: "spring", bounce: .2}}
                        key={`quiz-step3`}
                        className="search-results-filter-quiz-question">
                            <h3>
                            Almost there! Are you looking for a luxurious retreat or an experiential stay? <br />
                            <span>Luxury resorts offer high-end amenities and services, while experiential resorts focus on unique experiences and activities.</span>
                            </h3>
                            <div className="search-results-filter-quiz-radio">
                                <Radio.Group
                                style={{
                                    width: '100%'
                                }}
                                options={[
                                    {
                                        label: <p><img src={luxury.src} /> Luxurious Retreat</p>,
                                        value: 'luxury'
                                    },
                                    {
                                        label: <p><img src={experience.src} /> Experiential Stay</p>,
                                        value: 'experience'
                                    }
                                ]}
                                defaultValue={filters.resortType}
                                onChange={(e) => {
                                    setFilters({...filters, resortType: e.target.value});
                                    setLogo(e.target.value == 'luxury')
                                }}
                                size='large'
                                optionType="button"
                                buttonStyle="solid"
                                />
                            </div>
                        </motion.div>}
                        {filterStep == 3 && 
                        <div className='search-results-filter-quiz-summary'>
                            <Popover content={<img src={filters.locationImg} style={{width: 200, height: 140, objectFit: 'cover', objectPosition: 'center'}} />}>
                                <motion.div
                                initial={{y: 50, opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                transition={{delay: .5}}
                                className="summary-block nor">
                                    <img src={filters.locationImg} className='summary-block-img' />
                                    <p><span>Destination</span>{filters.location}</p>
                                </motion.div>
                            </Popover>
                            <motion.div
                            initial={{y: 50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 1}}
                            className="summary-block">
                                <span className="material-icons">sell</span>
                                <p><span>Budget</span>₹{filters.budgetMin.toLocaleString()} - ₹{filters.budgetMax.toLocaleString()}</p>
                            </motion.div>
                            <motion.div
                            initial={{y: 50, opacity: 0}}
                            animate={{y: 0, opacity: 1}}
                            transition={{delay: 1.5}}
                            className="summary-block">
                                <img className='summary-block-icon' src={filters.resortType == 'luxury' ? luxury.src : experience.src} />
                                <p><span>Resort Type</span>{filters.resortType == 'luxury' ? 'Luxurious Retreat' : 'Experiential Stay'}</p>
                            </motion.div>
                        </div>}
                    </AnimatePresence>
                </div>
                <div className="search-results-filter-quiz-footer">
                    <Button style={{visibility: filterStep == 0 ? 'hidden' : 'visible'}} onClick={() => handlePrev()} size='large' className='search-results-filter-quiz-footer-btn-back' prefix={<BsArrowLeft />}>Back</Button>
                    {filterStep < 3 ? (
                        <Button onClick={() => handleNext()} type='primary' size='large' className='search-results-filter-quiz-footer-btn'>Continue</Button>
                    )
                    : (
                        <Button onClick={() => {setFilters({...filters, state: false}); submit(`${filters.resortType} stay in ${filters.location.split(',')[0]} within budget of Rs.${filters.budgetMin} to Rs.${filters.budgetMax}`)}} type='primary' size='large' className='search-results-filter-quiz-footer-btn'>Lets Explore</Button>
                    )}
                </div>
            </div>
            ) : (
                <div className='search-filters-container'>
                <Filters res={res} />
                <div onClick={() => setFilters({...filters, state: true})} className="search-results-filter-button">
                    <Lottie options={defaultOptions}
                    height={60}
                    width={60}/>
                </div>
                </div>
            )}
        </div>
  )
}

export default FilterForm