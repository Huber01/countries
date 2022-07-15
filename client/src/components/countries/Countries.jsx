import React from 'react'
import Country from '../Country/Country'

export default function Countries({countries, handleReset}){
    
    return(
        <div>
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