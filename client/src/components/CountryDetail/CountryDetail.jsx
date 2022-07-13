import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getCountryDetails} from '../../redux/actions'
import {useParams} from 'react-router-dom'
import unIcon from '../../images/unIcon.png'
import gMaps from '../../images/gMapsIcon.png'
import {Link} from 'react-router-dom'


export default function CountryDetail() {

    const dispatch = useDispatch();
    const country = useParams()//match.params

    useEffect(()=>{
        dispatch(getCountryDetails(country.id));
        
    },[dispatch, country.id]) 

    let countryDetails = useSelector(state => state.countryDetails);
    
    const showWorld = ()=>{
        return <img src={unIcon} alt='icon'/>
    }

    
  return (
    <div>
        <Link to={'/'}>
            <button onClick={showWorld}>Back to Rest of the world</button>
        </Link>
        <div>
            <h2>{countryDetails.cName} - {countryDetails.id}</h2>
            <img classname = {'cardFlag'} src ={countryDetails.flag} alt = 'country flag' width='40px' height='20px'/><br/>
            <p>CAPITAL: {countryDetails.capital}</p>
            <p>CONTINENT: {countryDetails.continent}</p>
            <p>TIMEZONE: {countryDetails.timezones}</p>
            {countryDetails.subregion? <p>SUBREGION: {countryDetails.subregion}</p>:null}
            <p>AREA: {countryDetails.area}</p>
            <p>POPULATION: {countryDetails.populationVirtual}</p>
            <a href={countryDetails.location} target="_blank" rel="noopener noreferrer" ><img src={gMaps} alt = 'UN SYMBOL'  width='30px' height='30px'/></a><br/><br/>
            {countryDetails.unMember? <a href='https://www.un.org/en/about-us/member-states' target="_blank" rel="noopener noreferrer" > <img src = {unIcon} alt = 'UN SYMBOL'  width='30px' height='30px'/></a>:null}
            
        </div><br/><br/><br/>
     { countryDetails.activities?.length?countryDetails.activities?.map(a=>(
            <div key = {a.id}>
                <h2>{a.aName}</h2>
                <p>Difficulty: {a.difficulty}</p>
                <p>Duration: {a.duration}</p>
                <p>Season: {a.season}</p>
            </div>)):
            <div>
                'No activities associated...yet'<br/>
                <Link to={'/create'}><button >CREATE ACTIVITIES FOR THIS COUNTRY</button></Link>
            </div>
        
            
     

     }

    </div>
    
  )
}
