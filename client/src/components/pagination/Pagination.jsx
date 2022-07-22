import { useEffect, useState } from 'react';

import './Pagination.scss';

const Pagination = (props) => {
  const {callback, totalAmount } = props;
  const [totalPaginationPages, setTotalPaginationPages ] =useState(Math.ceil(totalAmount / 10));
  const [paginationsArray,setPaginationsArray] = useState([]);

  useEffect(()=>{
    setTotalPaginationPages(Math.ceil(totalAmount/10));
    const tempArray = [];
    for ( let i=0; i<totalPaginationPages; i++ ){
      tempArray.push(
        <button 
          onPointerDown={(event) => {
            callback(i+1);
            handlerClickOnPagination(event)
          }}
          key={i+1}
          className={`pagination__number ${(i+1)===1 && 'pagination__number_is_active'}`}
        >
          {i+1}
        </button>
      )
    }
    setPaginationsArray(tempArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalAmount]);

  const handlerClickOnPagination = (event) => {
    const activePage = Number(event.target.innerText);
    const tempArray = [];
    for ( let i=0; i < totalPaginationPages; i++ ){
      tempArray.push(
        <button 
          onPointerDown={(event) => {
            callback(i+1);
            handlerClickOnPagination(event);
          }}
          key={i+1}
          className={
            (i+1)===activePage 
            ? "pagination__number pagination__number_is_active" 
            : "pagination__number"
          }
        >
          {i+1}
        </button>
      )
    }
    setPaginationsArray(tempArray);
  }

  useEffect(() => {
    const tempArray = [];
    for ( let i=0; i<totalPaginationPages; i++ ){
      tempArray.push(
        <button 
          onPointerDown={(event) => {
            callback(i+1);
            handlerClickOnPagination(event)
          }}
          key={i+1}
          className={`pagination__number ${(i+1)===1 && 'pagination__number_is_active'}`}
        >
          {i+1}
        </button>
      )
    }
    setPaginationsArray(tempArray);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[totalPaginationPages])

  return (
    <div className="pagination">
      {paginationsArray}
    </div>
  )
};

export default Pagination;