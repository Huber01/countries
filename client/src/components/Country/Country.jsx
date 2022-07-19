import React from 'react';
import {Link} from 'react-router-dom'
import styles from './Country.module.css'



export default function Country({name, flag, continent, population, area, id}){
    return(
        <div className ={styles.card}>
            <div className ={styles.cardText}>
                <Link className={styles.clickOn} to = {`/`+id }> 
                    <h3 className={styles.title} >{name} - {id}</h3>
                </Link>
                <div classname = {styles.flag} >
                    <img src ={flag} alt = 'country flag'/*  width='40px' height='20px' *//><br/>
                </div>
                <p className={styles.ps} >{continent}</p>
                
                <p className={styles.ps} >{population}</p>
                <p className={styles.ps}>{area}</p> 

            </div>
        </div>
    )
}