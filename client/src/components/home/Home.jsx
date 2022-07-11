import  React from 'react';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderAllCountries, getContinents, filteredByContinent, getActivities, filteredByActivity } from '../../redux/actions';
import Country from '../Country/Country';

//import { renderAllRecipes, renderAllDiets, continentFilterRecipesByDiet, continentFilterCreatedRecipes, orderByABC, orderByHealth} from '../../redux/actions';
//import { Link } from 'react-router-dom';
//import Recipe from '../Recipe/Recipe'
//import Paginado from '../Paginado/Paginado';
//import SearchBar from '../SearchBar/SearchBar';
    
function Home(){
    const dispatch = useDispatch();
    const [continentFilter, setContinentFilter]=useState(false);
    //let continentFilter = false;
    //let continent = ''
    const [continent, setContinent]=useState('')
    const [activityFilter, setActivityFilter]=useState(false);
    const [activity, setActivity]= useState('');
    

    useEffect(()=>{
        dispatch(renderAllCountries(''));
        dispatch(getContinents());
        dispatch(getActivities())
        //console.log(activities)
    },[dispatch]) 
    
    let countries = useSelector(state=> state.countries)
    let continents = useSelector(state=> state.continents)
    let activities = useSelector(state=> state.activities)
    
    //let continentcontinentFiltered = useSelector(state=>state.continentFilteredByContinent)
    
   

    function handleContinentFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByContinent(e.target.value))
        
        
        //continentFilter =true;
        setContinentFilter(true);
        //continent = e.target.value
        setContinent(e.target.value)
        //console.log(continent)
        //console.log(continentFilter)
        /* setCurrentPage(1)
        setOrder(`Ordenado ${e.tarrender.value}`) */
    }
    console.log(continent)
    console.log(continentFilter)

    function handleOrder(e){
        e.preventDefault(e);
        continentFilter?dispatch(filteredByContinent(continent, e.target.value)):
        dispatch(renderAllCountries(e.target.value));
        
        
        /* setCurrentPage(1)
        setOrder(`Ordenado ${e.tarrender.value}`) */
    }
    function handleClick(e){
        e.preventDefault();
        dispatch(renderAllCountries(e.target.value));
        setContinentFilter(false) 
        
    }
    function handleActivityFilter(e){
        e.preventDefault(e);
        //console.log(e)
        dispatch(filteredByActivity(e.target.value))
        setContinentFilter(true);
        
        //continentFilter =true;
        //setContinentFilter(true);
        //continent = e.target.value
        setContinent(e.target.value)
        //console.log(continent)
        //console.log(continentFilter)
        /* setCurrentPage(1)
        setOrder(`Ordenado ${e.tarrender.value}`) */
    }




    

  

    return(
        <div>
            <button value = '' onClick={e=>{handleClick(e)}}> volver a cargar todas las recetas</button>
            <select onChange={e=>handleOrder(e)}>
                <option value = 'orderABC=ASC'>A-Z</option>
                <option value = 'orderABC=DESC'>Z-A</option>
            </select>

            <select onChange={e=>handleOrder(e)}>
            
                <option value = 'orderPop=ASC'>less </option>
                <option value = 'orderPop=DESC'>more</option>
            </select>

           {<select onChange={e=>handleContinentFilter(e)}>
              
            {continents?.map(c=>{
                return( <option value ={c.continent} key = {c.continent}>{c.continent}</option> )})}
            </select>}

            {<select onChange={e=>handleActivityFilter(e)}>
                <option value = 'todas'> All activities</option>
            {activities?.map((a,i)=>{
                return( <option value ={a.aName} key = {i}>{a.aName}</option> )})}
            </select>}

            PICOUNTRIES
            {countries?countries.map((c)=>{
                return (
                    <Country key={c.id} id={c.id} name={c.cName} flag= {c.flag} continent={c.continent} population = {c.population} area = {c.area}/>
                )})
                    
                :null}
            {/* {continentcontinentFiltered?continentcontinentFiltered.map((c)=>{
                return (
                    <Country key={c.id} id={c.id} name={c.cName} flag= {c.flag} continent={c.continent} population = {c.population} area = {c.area}/>
                )})
                    
                :null} */}
        </div>
    )

};

export default Home;