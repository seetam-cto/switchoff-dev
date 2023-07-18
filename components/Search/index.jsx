import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {BiSearchAlt} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import { AutoComplete, Select, Tag } from 'antd'
import SearchResultCard from '../Results'
const {Option} = Select

const Search = () => {
    const [query, setQuery] = useState("")
    const [resP, setResP] = useState(null)
    const [properties, setProperties] = useState([])
    const [message, setMessage] = useState("")
    const [selectedProps, setSelectedProps] = useState([])
    const [history, setHistory] = useState([])
    const [suggestions, setSuggestions] = useState([]);
    const [command, setCommand] = useState("search")

    const getSuggestions = async value => {
        try{
            await axios.get(`https://nuura.switchoff.in/suggest?partial_query=${value}`)
            .then(async (response) => {
                let tmp = await response.data
                setSuggestions(tmp.suggestions)
            })
        }catch(err){
            console.log(err)
        }
    }

     // When suggestion is clicked or selected via keyboard, Autosuggest needs to populate the input field
     const getSuggestionValue = suggestion => suggestion;

     // Use your own style or import it
     const renderSuggestion = suggestion => <div>{suggestion}</div>;

     const inputProps = {
        placeholder: 'Search...',
        value: query,
        onChange: (_, { newValue, method }) => {
            if (method === 'down' || method === 'up') {
                event.preventDefault();
            }
            setQuery(newValue)
        },
        onKeyPress: (event) => {
            if (event.key === 'Tab' && suggestions.length > 0) {
                event.preventDefault();
                setQuery(suggestions[0]);
            }
        }
    };
  
    const fetchReuslts = async(q) => {
      try{
        await axios.get(`https://nuura.switchoff.in/search?q=${q.trim()}&top_k=10`).then((response) => {
          setResP(response.data)
          setProperties(response.data.hits)
          setSelectedProps([])
        })
      }catch(err){
        console.log(err)
      }
    }
  
    const fetchHistory = async () => {
      try{
        await axios.get(`https://nuura.switchoff.in/history`).then((response) => {
          setHistory(response.data.history)
        })
      }catch(err){
        console.log(err)
      }
    }
  
    const strikeText = (nt, ot) => {
      let newText = nt.split(" ")
      let oldText = ot.split(" ")
      let striked = []
      for(var i = 0; i < oldText.length;i++){
        if(newText[i] === oldText[i]){
          striked.push(oldText[i])
        }else{
          striked.push(`<s>${oldText[i]}</s>`)
        }
      }
      return striked.join(" ")
    }
  
    const handleSelectProperty = (p_id) => {
      if(!selectedProps.includes(p_id)){
        setSelectedProps([...selectedProps, p_id])
      }else{
        setSelectedProps([...selectedProps.filter((p) => p !== p_id)])
      }
    }
  
    const submitResultsClick = async (q) => {
      let newData = {
        data: {
          query: q,
          selected: [...properties.filter((p) => selectedProps.includes(p.id))]
        }
      }
      try{
        await axios.post(`https://nuura.switchoff.in/event`, newData).then((response) => {
          setMessage(`Perfect! Keep Searching...`)
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
        }else{
          setResP(null);
          setSelectedProps([])
          setProperties([])
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
        }else{
          setResP(null);
          setSelectedProps([])
          setProperties([])
        }
    }
    
    useEffect(() => {
    fetchHistory()
    },[])
    return (
        <div className="search">
            <div className={`search-container ${query.length > 0 ? 'active' : ''}`}>
                <form onSubmit={(ev) => handleSubmit(ev)} className={`search-box ${query.length > 2 ? 'active' : ''}`}>
                    <BiSearchAlt className='icons' />
                    {command !== "search" && <Tag color='blue'>/{command}</Tag>}
                    <AutoComplete
                    value={query}
                    options={suggestions.map((txt, i) => {return {value: txt.text}})}
                    className='search-input'
                    onSearch={(text) => getSuggestions(text)}
                    onSelect={(value) => {setQuery(value); handleSelect(value)}}
                    onChange={(value) => checkCommand(value)}
                    bordered={false}
                    backfill={true}
                    autoFocus={true}
                    style={{height: 30}}
                    >
                    <input autoComplete={true} placeholder='search...' className='search-input' />
                    </AutoComplete>
                    <IoIosCloseCircle style={{visibility: query.length > 0 ? 'visible' :'hidden'}} className='icons' onClick={() => {setQuery("");setResP(null);setProperties([]);setSelectedProps([]);}} />
                </form>
                <div className={`search-results ${query.length > 0 ? 'active' : ''}`}>
                    <div className="search-results-properties">
                      {properties && properties.map((p, i) => 
                        <SearchResultCard key={i} property={p} />
                      )}
                    </div>
                    <div className="search-results-footer">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search