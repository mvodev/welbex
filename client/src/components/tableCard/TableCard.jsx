import { useEffect, useState } from 'react';
import Select from 'react-select';

import useHttp from '../../hooks/http.hook.js';
import Table from '../table/Table';

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

const initialSortState = {
  name:'',
  sign:'',
  value:''
};

const TableCard = () => {

  const { request } = useHttp();
  const [tableArrayFromDB, setTableArrayFromDB] = useState([]);
  const [sortState, setSortState] = useState(initialSortState);
  const [ table, setTable ] = useState(null);

  useEffect(()=>{
    request('http://localhost:5000/distance').then((result)=>{
      setTableArrayFromDB(result);
      const pageToChange = <Table tableArray={result}/>;
      setTable(pageToChange);
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const actualArrayState = Object.assign([],tableArrayFromDB);
    const actualSortState = {...sortState};
    const { name, sign, value} = actualSortState; 
    if (name &&  sign && value) {
      // eslint-disable-next-line array-callback-return
      const sortedResult = actualArrayState.filter((elem) => {
        if (name==='name') {
          if (sign === '<' && elem[name] < value) {
            return elem;  
          } else if(sign === '>' && elem[name] > value) {
            return elem;
          } else if(sign === '=' && elem[name] === value) {
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
      const pageToChange = <Table tableArray={sortedResult}/>;
      setTable(pageToChange);
    }
  }

  const handlerCancelSort = () => {
    const actualArrayState = Object.assign([],tableArrayFromDB);
    setSortState(initialSortState);
    const pageToChange = <Table tableArray={actualArrayState}/>;
    setTable(pageToChange);
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
          value="Фильтровать" 
        />
        <input 
          className="distance-card__sort-button" 
          type="button" 
          onPointerDown={handlerCancelSort}
          value="Сбросить фильтр" 
        />
      </div>
      {table}
    </div>
  )
};

export default TableCard;