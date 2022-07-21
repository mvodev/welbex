import { useEffect, useState } from 'react';
import Select from 'react-select';

import useHttp from '../../hooks/http.hook.js';

import './Table.scss';

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
  const [sortState, setSortState] = useState({
    name:'',
    sign:'',
    value:''
  });

  useEffect(()=>{
    request('http://localhost:5000/distance').then((result)=>{
      setTableArray(result);
      setSortedArray(result);
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
    const actualArrayState = Object.assign([],tableArray);
    const actualSortState = {...sortState};
    const { name, sign, value} = actualSortState; 

    const sortedResult = actualArrayState.filter((elem) => {
      if (name==='name') {
        if (sign==='<' && elem[name] < value) {
          return elem;  
        } else if(sign==='>' && elem[name] > value) {
          return elem;
        } else if(sign==='=' && elem[name] === value){
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
            sortedArray?.map((elem) => {
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

export default TableCard;