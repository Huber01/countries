import React from 'react'
import Country from '../Country/Country'
import styles from './countries.module.css'


export default function Countries({countries, handleReset}){
  
    return(
        <div className={styles.background}>
            
             {countries.length?
             countries.length>0?
                countries.map((c)=>{
                return (
                    <Country key={c.id} id={c.id} name={c.cName} flag= {c.flag} continent={c.continent} population = {c.populationVirtual} area = {c.area}/>
                )})
                    
            :<div>
                <h2>NO MATCH</h2>
                <button value = '' onClick={e=>{handleReset(e)}}>Reset !</button></div>:<h1>loading</h1>}
                
        </div>
    )
}