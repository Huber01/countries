import  React, {useState} from 'react';
import {Link} from 'react-router-dom'
import styles from './nav.module.css'



//import { useEffect, useState} from 'react';
//import { useDispatch, useSelector } from 'react-redux';
//import { renderAllCountries, getContinents, filteredByContinent, getActivities, filteredByActivity } from '../../redux/actions';
//import Country from '../Country/Country';


export default function Nav({activities, continents, handleClick, handleAlphabetOrder, handlePopulationOrder, handleContinentFilter, handleActivityFilter}){

    let[dropDown]=useState('')


    

    return (
    <div className={styles.background}>
        
            <Link to={'/create'}>
                <button className={styles.button} >Create an activity!</button>
            </Link>
           {/*  <button className={styles.button} value = '' onClick={e=>{handleClick(e)}}>Load all Countries again</button> */}
            <div  >
                <select className = {styles.dropbtn}value={dropDown} onChange={e=>handleAlphabetOrder(e)}>
                    <option defaultValue={''}>Alphabet Order</option>
                    <option value = 'a-z'>A-Z</option>
                    <option value = 'z-a'>Z-A</option>
                </select>
            </div>
            
            <div className={styles.filterPop}>
               
                <select className = {styles.dropbtn} value={dropDown} onChange={e=>handlePopulationOrder(e)}>
                    <option defaultValue={''}>Population Order</option>
                    <option value = 'asc'>ascendant population </option>
                    <option value = 'desc'>descendant population</option>
                </select>
            </div>

            <div>
                <select  className = {styles.dropbtn} value={dropDown} onChange={e=>handleContinentFilter(e)}>
                    <option defaultValue={''}> Filter by continents</option> 
                    <option value={'All'}> Whole World</option> 
                {continents?.map(c=>{
                    return( <option value ={c.continent} key = {c.continent}>{c.continent}</option> )})}
                </select>
            </div>
            
            <div>
                <select className = {styles.dropbtn} value={dropDown} onChange={e=>handleActivityFilter(e)}>
                    <option defaultValue={''}> Filter by activities</option> 
                    <option value={'All'}> All activities</option>
                {activities?.map((a,i)=>{
                    return( <option value ={a.aName} key = {i}>{a.aName}</option> )})}
                </select>
            </div>
        
    </div>
    )
}