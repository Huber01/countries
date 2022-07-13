import React from 'react';
import {Link} from 'react-router-dom'

export default function Country({name, flag, continent, population, area, id}){
    return(
        <div>
            <Link to = {`/home/`+id }> 
                <h3>{name}</h3>
            </Link>
            <img classname = {'cardFlag'} src ={flag} alt = 'country flag' width='40px' height='20px'/><br/>
            <span>{continent}</span><br/>
            <span>{population}</span><br/>
            <span>{area}</span>

        </div>
    )
}