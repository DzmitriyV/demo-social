import React, {useState} from 'react'
import styles from './Paginator.module.css'

let Paginator = ({totalItemsCount, pageSize, currentPage, onPageChange, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize)

    let pages = []

    for(let i = 1; i <= pagesCount; i++ ) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1)*pageSize + 1
    let rightPortionPageNumber = portionNumber*pageSize

    return (
            <div className={styles.paginator}>
                {portionNumber > 1 && <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span className={`${styles.pageNumber}${currentPage === p ? ' ' + styles.selectedPage : ''}`}
                                     key={p}
                                     onClick={() => { onPageChange(p) }}>{p}</span>
                })}
                {portionCount > portionNumber && <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}
            </div>
    )
}


export default Paginator