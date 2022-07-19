import React from 'react'
import Country from '../Country/Country'
import styles from './countries.module.css'


export default function Countries({countries, handleReset}){
  
    return(
        <div className={styles.background}>
            
             {countries.length>0?
                countries.map((c)=>{
                return (
                    <Country key={c.id} id={c.id} name={c.cName} flag= {c.flag} continent={c.continent} population = {c.populationVirtual} area = {c.area}/>
                )})
                    
            :<div>
                <h4>no match</h4>
                <button value = '' onClick={e=>{handleReset(e)}}>Reset Filters</button></div>}
                
        </div>
    )
}