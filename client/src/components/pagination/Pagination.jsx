import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import './Pagination.scss';

const Pagination = (props) => {
  const { totalElements } = { ...useSelector((state) => state.tableCardReducer) };
  console.log(totalElements);
  const {callback, totalAmount } = props;
  const [totalPaginations, setTotalPaginations ] =useState(Math.ceil(totalElements / 10));
  const [paginationsArray,setPaginationsArray] = useState([]);

  const handlerClickOnPagination = (event) => {
    const activePage = Number(event.target.innerText);
    const tempArray = [];
    for ( let i=0; i < totalPaginations; i++ ){
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

  useState(() => {
    setTotalPaginations(Math.ceil(totalElements / 10))
    console.log('inside useeffect' + totalElements)
    const tempArray = [];
    for ( let i=0; i<totalPaginations; i++ ){
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
  },[totalElements,totalPaginations])

  return (
    <div className="pagination">
      {paginationsArray}
    </div>
  )
};

export default Pagination;