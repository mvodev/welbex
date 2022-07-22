import { useEffect, useState } from 'react';
import Select from 'react-select';

import useHttp from '../../hooks/http.hook.js';
import Pagination from '../pagination/Pagination.jsx';

import './TableCard.scss';

const names = [
  {value:'name',label:'имя'},
  {value:'amount',label:'количество'},
  {value:'distance',label:'дистанция'}
]
const signs = [
  {value:'>',label:'>'},
  {value:'<',label:'<'},
  {value:'=',label:'='}
]

const TableCard = () => {

  const { request } = useHttp();
  // eslint-disable-next-line no-unused-vars
  const [tableArray, setTableArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [sortState, setSortState] = useState({
    name:'',
    sign:'',
    value:''
  });
  const [totalElems,setTotalElems] = useState(0);
  const [ paginationState, setPaginationState ] = useState([]);

  useEffect(()=>{
    request('http://localhost:5000/distance').then((result)=>{
      setTableArray(result);
      setSortedArray(result);
      setTotalElems(result.length);
      const totalPaginationsPages = Math.ceil(result.length / 10);
      const paginatedArray = [];
      for (let i=0; i< totalPaginationsPages; i++){
        paginatedArray.push(result.slice( (i*10), (i*10+10)))
      }
      setPaginationState(paginatedArray);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handlerPagination = (clickedPageNumber)=>{
    setActivePage(clickedPageNumber);
  }

  const pagination = 
    totalElems > 0 
    && 
    <Pagination 
      totalAmount={totalElems} 
      callback={handlerPagination} 
    />

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
    const actualArrayState = Object.assign([],tableArray);
    const actualSortState = {...sortState};
    const { name, sign, value} = actualSortState; 
    if (name &&  sign && value) {
      const sortedResult = actualArrayState.filter((elem) => {
        if (name==='name') {
          if (sign === '<' && elem[name] < value) {
            return elem;  
          } else if(sign === '>' && elem[name] > value) {
            return elem;
          } else if(sign === '=' && elem[name] === value){
            return elem
          }
        } else {
          if (sign==='<' && elem[name] < Number(value)) {
            return elem;  
          } else if(sign==='>' && elem[name] > Number(value)) {
            return elem;
          } else if(sign==='=' && elem[name] === Number(value)){
            return elem
          }
        }
      });
      setSortedArray(sortedResult);
    }
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
                <tr className="distance-card__row" key={elem.id}>
                  <td className="distance-card__row-elem">
                    {new Date(elem.date).toLocaleString('ru-RU').slice(0,10)}
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
      {pagination}
    </div>
  )
};

export default TableCard;