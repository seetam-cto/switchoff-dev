import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {BiSearchAlt} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import { AutoComplete, Tag, DatePicker, Select, Divider } from 'antd'
import SearchResultCard from '../Results'
import ReactTypingEffect from 'react-typing-effect'
import nlp from 'compromise';
import WebSocket from "isomorphic-ws";
import { atom, useAtom } from 'jotai'
import moment from 'moment'
const { RangePicker } = DatePicker
import mapicon from '../../assets/icons/location.png'
import dayjs from 'dayjs';
import { motion } from 'framer-motion'
import Map from './Map'

export const searchParams = atom({
  adults_number: '1',
  checkout_date: moment(new Date()).add(1,'d').format("YYYY-MM-DD"),
  checkin_date: moment(new Date()).format("YYYY-MM-DD"),
  children_ages: '0',
  coordinates: ['0','0']
})

export const getSearchParams = atom((get) => get(searchParams))

const Search = () => {
    const [query, setQuery] = useState("")
    const [resP, setResP] = useState(null)
    const [properties, setProperties] = useState([])
    const [message, setMessage] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [command, setCommand] = useState("search")
    const [searchFocus, setSearchFocus] = useState(false)
    const [location, setLocation] = useState("")
    const socketRef = useRef(null)
    const maplistRef = useRef(null)
    const [resultsPage, setResultsPage] = useState(false)
    const [searchPs, setSearchPs] = useAtom(searchParams)
    const [dates, setDates] = useState(null)
    const [mapView, setMapView] = useState(false)
    const [mapListConnected, setMapListConnected] = useState(false)
    const [mapMarkers, setMapMarkers] = useState([])
    const [isTextSearch, setIsTextSearch] = useState(true)
    const [center, setCenter] = useState({
      latitude: 12.4244,
      longitude: 75.7382,
      zoom: 5,
    })
    const [mapLoading, setMapLoading] = useState(false)
    const disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < dayjs().endOf('day');
    };
  
    const fetchReuslts = async(q) => {
      let doc = nlp(q)
      setLocation(doc.places().text())
      try{
        await axios.get(`https://nuura.switchoff.in/search?q=${q.trim()}&top_k=20`).then((response) => {
          setResP(response.data)
          setProperties(response.data.hits)
          // let coords = response.data.hits.map((h) => {return {latitude: h.labels.location.coordinates.latitude, longitude: h.labels.location.coordinates.longitude}})
          setIsTextSearch(true)
          setMapMarkers(response.data.hits)
        })
      }catch(err){
        console.log(err)
      }
    }

    useEffect(() => {
      if (message.length > 0){
        setTimeout(() => {
          setMessage("")
        },3000)
      }
    },[message])

    const handleSubmit = async (e) => {
        if(e !== null){
            e.preventDefault()
        }
        if(query.trim().length > 2){
          fetchReuslts(query.trim())
          setResultsPage(true)
        }else{
          setResP(null);
          setProperties([])
          setResultsPage(false)
          setMapMarkers([])
        }
    }

    const checkCommand = (value) => {
        if(value[0] === "/"){
            setQuery(value)
            switch(value){
                case "/resort": setCommand("resort");break;
                case "/villa": setCommand("villa");break;
            }
        }else{
            setCommand("search")
            setQuery(value)
        }
    }

    const handleSelect = async (value) => {
        if(value.trim().length > 2){
          fetchReuslts(value.trim())
          setResultsPage(true)
        }else{
          setResP(null);
          setResultsPage(false)
          setProperties([])
        }
    }

    const handleDates = (vals) => {
      setDates(vals)
      if(vals !== null){
        setSearchPs({
          ...searchPs,
          checkin_date: moment(new Date(vals[0])).format("YYYY-MM-DD"),
          checkout_date: moment(new Date(vals[1])).format("YYYY-MM-DD")
        })
      }
    }

    useEffect(() => {
      if (query.length == 0){
        setResP(null);
        setProperties([])
      }
      if (query.length > 2){
        socketRef.current.send(query)
      }
    },[query])

    const searchFocused = () => {
      setSearchFocus(true)
      //establish a Websocket connection when the component mounts
      socketRef.current = new WebSocket("wss://nuura.switchoff.in/ws/suggest");
      socketRef.current.onopen = () => console.log("WebSocket connected!");
      socketRef.current.onclose = () => console.log("WebSocket disconnected!");
    }

    useEffect(() => {
        if(mapView){
          maplistRef.current = new WebSocket("wss://nuura.switchoff.in/ws/maplist")
          maplistRef.current.onopen = () => {setMapListConnected(true); console.log("MapWS Connected!")};
          maplistRef.current.onclose = () => {setMapListConnected(false);console.log("MaplistWS disconnected!")};
        }
        return () => {
          mapListConnected && maplistRef.current.close()
        }   
    },[mapView])

    const searchBlurred = async () => {
      setSearchFocus(false);
      await socketRef.current.close();
    }

    const closeSearchPage = () => {
      setResP(null);
      setProperties([])
      setResultsPage(false)
      setMapView(false)
    }

    useEffect(() => {
      if(searchFocus){
        socketRef.current.onmessage = (event) => {
          const data = event.data
          setSuggestions(JSON.parse(data).map((txt, i) => {return {value: txt.text}}))
        }
      }
    },[socketRef.current])

    useEffect(() => {
      if(mapListConnected){
        setTimeout(async () => {
          let data = {
            latitude: center.latitude,
            longitude: center.longitude,
            radius: 200*(21 - center.zoom),
            zoom: center.zoom
          }
          setMapLoading(true)
          await maplistRef.current.send(JSON.stringify(data))
        }, 500)
      }
    },[center])

    useEffect(() => {
      if(mapView){
        maplistRef.current.onmessage = (event) => {
          const data = event.data
          setMapMarkers(JSON.parse(data))
          setMapLoading(false)
        }
      }
    },[maplistRef.current])
    
    return (
        <div className={`search ${resultsPage ? 'active' : ''}`}>
            <div className="search-wrapper">
              <div className={`search-container ${(query.length > 2 && resP !== null) || resultsPage ? 'active' : ''}`}>
                  <form onSubmit={(ev) => handleSubmit(ev)} className={`search-box`}>
                      <BiSearchAlt className='icons' />
                      {command !== "search" && <Tag color='blue'>/{command}</Tag>}
                      {!searchFocus && query.length == 0 && 
                        <div className="search-placeholder">
                          <ReactTypingEffect
                          eraseSpeed={10}
                          eraseDelay={1000}
                          speed={50}
                          typingDelay={500}
                          cursor='|'
                          text={['find me a resort near coorg with a private pool','where in kerala will I get the best sunset shots and hill views','if I visit ooty in December, which resorts will have the best view']}
                          />
                        </div> }
                      <AutoComplete
                      value={query}
                      options={suggestions}
                      className='search-input'
                      // onSearch={(text) => getSuggestions(text)}
                      onSelect={(value) => {setQuery(value); handleSelect(value)}}
                      onChange={(value) => checkCommand(value)}
                      bordered={false}
                      backfill={true}
                      autoFocus={true}
                      style={{height: 30}}
                      >
                      <input 
                      onFocus={() => searchFocused()} 
                      onBlur={() => searchBlurred()}
                      autoComplete={true} className='search-input' />
                      </AutoComplete>
                      <IoIosCloseCircle style={{visibility: query.length > 0 ? 'visible' :'hidden'}} className='icons' onClick={() => {setQuery("")}} />
                  </form>
              </div>
              {resultsPage && <div className="search-dates">
                  <RangePicker
                  value={dates}
                  placeholder={['Check In','Check Out']}
                  onChange={(val) => handleDates(val)}
                  disabledDate={disabledDate}
                  clearIcon={false} suffixIcon={null} size='large' className='search-dates-inputs' bordered={false} />
              </div>}
              {resultsPage && <div className="search-guests">
                Guests
                <Select
                value={searchPs.adults_number}
                options={['1','2','3','4','5'].map((num) => {return {value: num, label: num}})}
                onChange={(value) => setSearchPs({...searchPs, adults_number: value})}
                bordered={false}
                />
                <Divider style={{backgroundColor: '#FFFFFF'}} type='vertical' />
                Children
                <Select
                value={searchPs.children_ages == "0" ? 0 : searchPs.children_ages.split(",").length}
                options={[0,1,2,3].map((num) => {return {value: num, label: num}})}
                onChange={(value) => setSearchPs({...searchPs, children_ages: value == 0 ? '0' : Array.from({length: parseInt(value)}, () => '4').join(',')})}
                bordered={false}
                />
              </div>}
              {resultsPage && <div className="search-mapbox" onClick={() => setMapView(!mapView)}>
                <img style={{filter: `saturate(${mapView ? 1.5 : 0.5})`}} src={mapicon.src} alt="" />
              </div>}
              {resultsPage && <IoIosCloseCircle onClick={() => closeSearchPage()} className='search-close' />}
            </div>
            {resultsPage && <div className={`search-results ${query.length > 2 && resP !== null ? 'active' : ''}`}>
                  {!mapView && <div className="search-results-filter">
                        
                  </div>}
                  <div className={`search-results-properties ${mapView ? 'active' : ''}`}>
                    {properties && properties.map((p, i) =>
                      <SearchResultCard mapv={mapView} key={i} property={p} />
                    )}
                  </div>
                  {mapView && <div className={`search-results-map`}>
                      <Map center={center}
                      mapLoading={mapLoading}
                      setCenter={setCenter}
                      properties={mapMarkers}
                      isText={isTextSearch}
                      setIsText={setIsTextSearch}
                      />
                      </div>}
            </div>}
        </div>
    )
}

export default Search