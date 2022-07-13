import React from 'react'

export default function Pagination ({ countriesPerPage, theCountries, pagination}){
    const pageNumbers = []
    for (let i=0 ; i<Math.ceil(theCountries/countriesPerPage); i++){
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            <ul className={pagination}>
                {pageNumbers && pageNumbers.map((number)=>{
                    return(
                    <li className={number} key = {number}>
                    <button onClick={()=> pagination (number)}>{number}</button> {/* VA A IR HACIA ESE NUMERO DE PAGINA */}
                    </li>
                )})}
            </ul>
        </nav>
    )
}