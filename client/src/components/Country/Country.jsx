import React from 'react';

export default function Country({name, flag, continent, population, area}){
    return(
        <div>
            <h3>{name}</h3>
            <img classname = {'cardFlag'} src ={flag} alt = 'country flag' width='40px' height='20px'/><br/>
            <span>{continent}</span><br/>
            <span>{population}</span><br/>
            <span>{area}</span>

        </div>
    )
}