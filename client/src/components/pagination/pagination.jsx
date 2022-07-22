import React from 'react'
import styles from './pagination.module.css'

export default function Pagination ({pagination, nextPage, previousPage, currentPage, getPages, pageNumbers}){
  

    

    return (
        <nav  >
            <ul className={styles.pagination}>
            {currentPage>1?<button onClick={previousPage} >prev</button>:null}
                {getPages().map((number)=>{
                    return(
                    <li className={styles.li} key = {number}>
                        <button className={styles.btn} onClick={()=> pagination (number)}>{number}</button> {/* VA A IR HACIA ESE NUMERO DE PAGINA */}
                    </li>
                    )})}
            {pageNumbers>currentPage?<button onClick={nextPage}>next</button>:null}
            </ul>
        </nav>
    )
}

/* 

 */