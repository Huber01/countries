import  React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderAllCountries, getContinents, filteredByContinent, getActivities, filteredByActivity, orderByPopulation, orderByAlphabet } from '../../redux/actions';
//import Country from '../Country/Country';
import Nav from '../nav/Nav';
import Pagination from '../pagination/Pagination'
import Countries from '../countries/Countries';
import SearchBar from '../SearchBar/SearchBar';
import styles from './home.module.css'


//import { renderAllRecipes, renderAllDiets, continentFilterRecipesByDiet, continentFilterCreatedRecipes, orderByABC, orderByHealth} from '../../redux/actions';
//import { Link } from 'react-router-dom';
//import Recipe from '../Recipe/Recipe'
//import Paginado from '../Paginado/Paginado';
//import SearchBar from '../SearchBar/SearchBar';
    
function Home(){
    const dispatch = useDispatch();

    let theCountries = useSelector(state=> state.countries)
    let theContinents = useSelector(state=> state.continents)
    let theActivities = useSelector(state=> state.activities)
    

    const [order, setOrder]=useState('')
    //const [selected, setSelected]=

    const [currentPage, setCurrentPage]= useState(1);
    const [countriesPerPage, setCountriesPerPage]= useState(10);
    const indexOfNextPageFirstCountry = currentPage * countriesPerPage;//es la ultima receta, hasta donde llega el corte. es decir que es la primera que se muestra en la prixma pagina
    const indexOfFirstCountry = indexOfNextPageFirstCountry - countriesPerPage;// arranca por el 0
    const currentCountries = theCountries.slice(indexOfFirstCountry, indexOfNextPageFirstCountry)//me da un array nuevo, en este caso, desde el 0 hasta el 8 (el slice no incluye el segundo parametro)

    const pagination = (pageNumber)=>{ // va a decir cual es la pagina actual. se lo voy a asar al onclick, para que al hacer click en el numero, me lleve a ese numero de pagina.
        setCurrentPage(pageNumber)
    }
    
    

    useEffect(()=>{
        dispatch(renderAllCountries(''));
        dispatch(getContinents());
        dispatch(getActivities())
        //console.log(activities)
    },[dispatch]) 
    
   
    
    //let continentcontinentFiltered = useSelector(state=>state.continentFilteredByContinent)
    
   

    function handleContinentFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByContinent(e.target.value))
    
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
          
    }

    function handleActivityFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByActivity(e.target.value)) 
    }

    function handleReset(e){
        e.preventDefault(e);
        dispatch(renderAllCountries(e.target.value))
    }



    return(
        <div className={styles.background} >
            <Nav activities={theActivities} continents={theContinents} handleClick={handleClick} handleAlphabetOrder= {handleAlphabetOrder} handlePopulationOrder={handlePopulationOrder} handleContinentFilter={handleContinentFilter} handleActivityFilter={handleActivityFilter} />
            <SearchBar/><br></br>

            <button className={styles.title} onClick={(e)=>handleClick(e)}>COUNTRIES OF THE WORLD</button>

            <Countries countries={currentCountries} handleReset={handleReset} />
          

            <Pagination   countriesPerPage={countriesPerPage}
                        theCountries = {theCountries.length}
                        pagination = {pagination}/> 
        </div>
    )

};

export default Home;