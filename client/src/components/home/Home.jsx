import  React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderAllCountries, getContinents, filteredByContinent, getActivities, filteredByActivity, orderByPopulation, orderByAlphabet } from '../../redux/actions';

import Nav from '../nav/Nav';
import Pagination from '../pagination/Pagination'
import Countries from '../countries/Countries';
import SearchBar from '../SearchBar/SearchBar';
import styles from './home.module.css'

    
function Home(){
    const dispatch = useDispatch();

    let theCountries = useSelector(state=> state.countries)
    let theContinents = useSelector(state=> state.continents)
    let theActivities = useSelector(state=> state.activities)
    
    const [filtered, setFiltered]=useState(false)
    const [order, setOrder]=useState('')//definir ordenamientos
    const [currentPage, setCurrentPage]= useState(1);
    const [countriesPerPage]= useState(10);
    const indexOfNextPageFirstCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfNextPageFirstCountry - countriesPerPage;// arranca por el 0
    const currentCountries = theCountries.slice(indexOfFirstCountry, indexOfNextPageFirstCountry)
    const pagination = (pageNumber)=>{ 
        setCurrentPage(pageNumber)
    }
    

   
    const nextPage = () => {
        setCurrentPage((page) => page + 1);
     }
   
    const previousPage= () => {
        setCurrentPage((page) => page - 1);
     } 

  
    
    useEffect(()=>{
        dispatch(renderAllCountries(''));
        dispatch(getContinents());
        dispatch(getActivities())

    },[dispatch]) 
  

    function handleContinentFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByContinent(e.target.value))
        setCurrentPage(1)
        setFiltered(true)
    }
   
    function handleAlphabetOrder(e){
        e.preventDefault(e);
        dispatch(orderByAlphabet(e.target.value));
        setOrder(`ordenado ${e.target.value}`)  
        setCurrentPage(1)
    }

    function handlePopulationOrder(e){
        e.preventDefault(e);
        dispatch(orderByPopulation(e.target.value));
        //console.log(theCountries)
        setOrder(`ordenado ${e.target.value}`)
        setCurrentPage(1)
    }

    function handleClick(e){
        e.preventDefault(e);
        dispatch(renderAllCountries(e.target.value)); 
        setFiltered(false)       
    }

    function handleActivityFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByActivity(e.target.value))
        setCurrentPage(1) 
        setFiltered(true)
    }

    function handleReset(e){
        e.preventDefault(e);
        dispatch(renderAllCountries(e.target.value))
        setFiltered(false) 
    }
    console.log(currentCountries);
    return(
        
        <div className={styles.background} >
            
            <Nav activities={theActivities} continents={theContinents} handleClick={handleClick} handleAlphabetOrder= {handleAlphabetOrder} handlePopulationOrder={handlePopulationOrder} handleContinentFilter={handleContinentFilter} handleActivityFilter={handleActivityFilter} />
            <SearchBar/><br></br>

            <button className={styles.title} onClick={(e)=>handleClick(e)}>COUNTRIES OF THE WORLD {filtered?<p>click to reload</p>:null}</button>

            <Countries countries={currentCountries} handleReset={handleReset} />
          

            <Pagination 
                        currentPage={currentPage}
                        nextPage = {nextPage}
                        previousPage = {previousPage}
                        countriesPerPage={countriesPerPage}
                        theCountries = {theCountries.length}
                        pagination = {pagination}/> 
        </div>
    )

};

export default Home;