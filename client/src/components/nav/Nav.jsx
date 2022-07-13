import  React from 'react';
//import { useEffect, useState} from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { renderAllCountries, getContinents, filteredByContinent, getActivities, filteredByActivity } from '../../redux/actions';
//import Country from '../Country/Country';


export default function Nav({activities, continents, handleClick, handleAlphabetOrder, handlePopulationOrder, handleContinentFilter, handleActivityFilter}){

    

    return (
    <div>
        <button value = '' onClick={e=>{handleClick(e)}}> volver a cargar todas las recetas</button>
        <select onChange={e=>handleAlphabetOrder(e)}>
            <option value = 'a-z'>A-Z</option>
            <option value = 'z-a'>Z-A</option>
        </select>

        <select onChange={e=>handlePopulationOrder(e)}>
        
            <option value = 'asc'>ascendant population </option>
            <option value = 'desc'>descendant population</option>
        </select>

        {<select onChange={e=>handleContinentFilter(e)}>
            <option value = 'All'> All countries</option> 
        {continents?.map(c=>{
            return( <option value ={c.continent} key = {c.continent}>{c.continent}</option> )})}
        </select>}

        {<select onChange={e=>handleActivityFilter(e)}>
            <option value = 'All'> All activities</option>
        {activities?.map((a,i)=>{
            return( <option value ={a.aName} key = {i}>{a.aName}</option> )})}
        </select>}
        
    </div>
    )
}