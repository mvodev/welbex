import { useEffect, useState } from 'react';

import Pagination from '../pagination/Pagination.jsx';

import './Table.scss';

const Table = (props) => {
  const {tableArray} = props;
  const [paginationState,setPaginationState]= useState([]);
  const [activePage,setActivePage]= useState(1);
  const [pagination,setPagination] = useState(null);

  useEffect(()=>{
    const totalPaginationsPages = Math.ceil(tableArray.length / 10);
    const paginatedArray = [];
    for (let i=0; i< totalPaginationsPages; i++){
      paginatedArray.push(tableArray.slice( (i*10), (i*10+10)))
    }
    setPaginationState(paginatedArray);
    const pagination = (tableArray && tableArray.length > 0)
  ?<Pagination 
    totalAmount={tableArray.length} 
    callback={handlerPagination} 
  />
  : null;
  setPagination(pagination)
  },[tableArray]);

  const handlerPagination = (clickedPageNumber)=>{
    setActivePage(clickedPageNumber);
  }

  return (
    <div className="distance">
      <table className="distance__table">
        <thead>
          <tr>
            <th className="distance__header" colSpan={4}>
              Данные из БД
            </th>
          </tr>
          <tr>
            <th>
              Дата
            </th>
            <th>
              Имя
            </th>
            <th>
              Количество
            </th>
            <th>
              Дистанция
            </th>
          </tr>
        </thead>
        <tbody>
          {
            paginationState[activePage-1]?.map((elem) => {
              return (
                <tr className="distance__row" key={elem.id}>
                  <td className="distance__row-elem">
                    {new Date(elem.date).toLocaleString('ru-RU').slice(0,10)}
                  </td>
                  <td className="distance__row-elem">
                    {elem.name}
                  </td>
                  <td className="distance__row-elem">
                    {elem.amount}
                  </td>
                  <td className="distance__row-elem">
                    {elem.distance}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {pagination}
    </div>
  )
};

export default Table;