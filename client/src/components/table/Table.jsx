import { useEffect, useState } from 'react';
import Select from 'react-select';

import useHttp from '../../hooks/http.hook.js';

import './Table.scss';

const names = [
  {value:'name',label:'name'},
  {value:'amount',label:'amount'},
  {value:'distance',label:'distance'}
]
const signs = [
  {value:'>',label:'>'},
  {value:'<',label:'<'},
  {value:'=',label:'='}
]

const Table = () => {

  const { request } = useHttp();
  const [tableArray, setTableArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [sortState, setSortState] = useState({
    name:'',
    sign:'',
    value:''
  });

  useEffect(()=>{
    request('http://localhost:5000/distance').then((result)=>{
      setTableArray(result);
    });
  },[])

  const handlerGhangeInput = (type,data) => {
    let actualSortState = {...sortState};
    switch(type) {
        case 'name':
          actualSortState.name = data.value;
          setSortState(actualSortState);
          break;
        case 'sign':
          actualSortState.sign = data.value;
          setSortState(actualSortState);
          break;
        case 'value':
          actualSortState.value = data;
          setSortState(actualSortState);
          break;
        default:
          break;
      }
  }

  const handlerSort = () => {
    console.log('inside handlerSort');
  }

  return (
    <div className="distance-card">
      <div className="distance-card__sort">
          Сортировка по:
        <div className="distance-card__sort-wrapper">
          <Select 
            className="distance-card__sort-select" 
            options={names} 
            onChange={(data)=> handlerGhangeInput('name',data)}
            name="name" 
            placeholder="поле"
          />
          <Select 
            className="distance-card__sort-select" 
            options={signs} 
            onChange={(data)=> handlerGhangeInput('sign',data)}
            name="sign" 
            placeholder="условие"
          />
          <input 
            className="distance-card__sort-input" 
            type="text" 
            name="value" 
            onChange={(data)=> handlerGhangeInput('value',data.target.value)}
            placeholder="значение"
          />
        </div>
        <input 
          className="distance-card__sort-button" 
          type="button" 
          onPointerDown={handlerSort}
          value="Сортировать" 
        />
      </div>
      <table className="distance-card__table">
        <thead>
          <tr>
            <th className="distance-card__header" colSpan={4}>
              Данные из БД
            </th>
          </tr>
        </thead>
        <tbody>
          {
            tableArray?.map((elem) => {
              return (
                <tr className="distance-card__row" key={elem.id}>
                  <td className="distance-card__row-elem">
                    {elem.date}
                  </td>
                  <td className="distance-card__row-elem">
                    {elem.name}
                  </td>
                  <td className="distance-card__row-elem">
                    {elem.amount}
                  </td>
                  <td className="distance-card__row-elem">
                    {elem.distance}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
};

export default Table;