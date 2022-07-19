import React from 'react'
import styles from './pagination.module.css'

export default function Pagination ({ countriesPerPage, theCountries, pagination}){
    const pageNumbers = []
    for (let i=0 ; i<Math.ceil(theCountries/countriesPerPage); i++){
        pageNumbers.push(i+1);
    }

    return (
        <nav  >
            <ul className={styles.pagination}>
                {pageNumbers && pageNumbers.map((number)=>{
                    return(
                    <li className={styles.li} key = {number}>
                    <button className={styles.btn} onClick={()=> pagination (number)}>{number}</button> {/* VA A IR HACIA ESE NUMERO DE PAGINA */}
                    </li>
                )})}
            </ul>
        </nav>
    )
}