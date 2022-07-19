import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getCountryDetails} from '../../redux/actions'
import {useParams} from 'react-router-dom'
import unIcon from '../../images/unIcon.png'
import gMaps from '../../images/gMapsIcon.png'
import {Link} from 'react-router-dom'
import styles from './countryDetail.module.css'


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
    <div className={styles.background} >
        
            <Link to={'/home'}>
                <button className={styles.button} onClick={showWorld}>Back to Rest of the world</button>
            </Link> 
              
            <div className={styles.divCont}>
                <h2>{countryDetails.cName} - {countryDetails.id}</h2>
                <img classname = {styles.flag} src ={countryDetails.flag} alt = 'country flag' /* width='40px' height='20px' *//><br/>
                <p>CAPITAL: {countryDetails.capital}</p>
                <p>CONTINENT: {countryDetails.continent}</p>
                <p>TIMEZONE: {countryDetails.timezones}</p>
                {countryDetails.subregion? <p>SUBREGION: {countryDetails.subregion}</p>:null}
                <p>AREA: {countryDetails.area}</p>
                <p>POPULATION: {countryDetails.populationVirtual}</p>
                        <a className={styles.ico} href={countryDetails.location} target="_blank" rel="noopener noreferrer" ><img  src={gMaps} alt = 'UN SYMBOL'  width='30px' height='30px'/></a><br/><br/>
                {countryDetails.unMember? <a className={styles.ico} href='https://www.un.org/en/about-us/member-states' target="_blank" rel="noopener noreferrer" > <img  src = {unIcon} alt = 'UN SYMBOL'  width='30px' height='30px'/></a>:null}
                
            </div>
        <div className={styles.activities}>
        { countryDetails.activities?.length?countryDetails.activities?.map(a=>(
                  
                        <div className={styles.card} key = {a.id}>
                            
                            <h2 className={styles.title}>{a.aName}</h2>
                            <p className={styles.text}>Difficulty: {a.difficulty}</p>
                            <p className={styles.text}>Duration: {a.duration}</p>
                            <p className={styles.text}>Season: {a.season}</p>
                            
                        </div>
 
                )):
                <div className={styles.noActivities}>
                    <p className={styles.title}>No activities associated...yet</p><br/>
                    <Link to={'/create'}><button >CREATE ACTIVITIES FOR THIS COUNTRY</button></Link>
                </div>  

        }
</div>
        </div>
    
    
  )
}
