import { useState } from 'react';
import './Pagination.scss';

const Pagination = (props) => {
  const {callback, totalAmount, elemsOnPage} = props;
  const totalPaginations = Math.ceil(totalAmount / elemsOnPage);
  let paginationsArray = [];

  for ( let i=0; i<totalPaginations; i++ ){
    paginationsArray.push(
      <button 
        onPointerDown={() => {
          callback(i+1)
        }}
        key={i+1}
        className="pagination__number"
      >
        {i+1}
      </button>
    )
  }

  return (
    <div className="pagination">
      {paginationsArray}
    </div>
  )
};

export default Pagination;