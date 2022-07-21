import DatePicker from 'react-datepicker';
import { useState } from 'react';

import useHttp from '../../hooks/http.hook.js';

import './AddData.scss';
import 'react-datepicker/dist/react-datepicker.css';

const AddData = () => {
  const initialState = {
    name: '',
    nameIsValid: false,
    amount: '',
    amountIsValid: false,
    distance: '',
    distanceIsValid: false,
    date: new Date(),
    dateIsValid: true,
  }

  const { loading, request, error,clearError } = useHttp();
  const [formState, setFormState] = useState(initialState);

  const handlerAddDataFormSubmit = async (event) =>{
    event.preventDefault();
    if (formIsValid()) {
      clearError();
      await request(
        'http://localhost:5000/distance/add',
        'POST',
        {
          message: 
          {
            name: formState.name,
            amount: formState.amount,
            distance: formState.distance,
            date: formState.date.toLocaleString('ru-RU'),
          }
        }
      );
      if (!error) {
        setFormState(initialState);
        event.target.reset();
      }
    }
  }

  const handlerUserInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const actualState = {...formState};
    actualState[`${name}`] = value;
    actualState[`${name}IsValid`] = validateField(name,value);
    setFormState(actualState);
  }

  const validateField = (fieldName,fieldValue) => {
    if(!fieldValue) return false;
      switch(fieldName) {
        case 'name':
          return fieldValue.length > 0 && fieldValue.length < 255;
        case 'distance':
          return !Number.isNaN(Number(fieldValue));
        case 'amount':
          return !Number.isNaN(Number(fieldValue));
        case 'date':
          return ((new Date(fieldValue) instanceof Date));
        default:
          break;
      }
  }

  const formIsValid = () => {
    return  formState.amountIsValid &&
            formState.distanceIsValid &&
            formState.dateIsValid &&
            formState.nameIsValid;
  }

  return (
    <>
      <span
          className="add-data__error"
          style={
            error ? { display: 'inline-block' } : { display: 'none' }
          }
        >
          Ошибка добавления записи
        </span>
      <form 
      className="add-data"
      name="add-data"
      onSubmit={handlerAddDataFormSubmit}
      >
        <fieldset className="add-data__first-row">
          <DatePicker
            onChange={(date) => {
              const actualState = {...formState};
              if (date !==null && date !== undefined) {
                actualState.date = date;  
              } else actualState.date = '';
              actualState.dateIsValid = validateField('date',date);
              setFormState(actualState);
            }}
            dateFormat="dd.MM.yyyy"
            placeholderText="Дата"
            showMonthDropdown
            className={`add-data__input ${formState.dateIsValid ? '':' add-data__input-error'}`}
            selected={formState.date}
            name="date"
          />
          <input 
            className={`add-data__input ${formState.nameIsValid ? '':' add-data__input-error'}`} 
            type="text" 
            name="name" 
            placeholder="Имя"
            onChange={handlerUserInputChange} 
          />
        </fieldset>
        <fieldset className="add-data__second-row">
          <input 
            className={`add-data__input ${formState.amountIsValid ? '':' add-data__input-error'}`} 
            type="number" 
            name="amount" 
            placeholder="Количество"
            onChange={handlerUserInputChange}  
          />
          <input 
            className={`add-data__input ${formState.distanceIsValid ? '':' add-data__input-error'}`} 
            type="number" 
            name="distance"
            placeholder="Расстояние"
            onChange={handlerUserInputChange}  
          />
        </fieldset>
        <input 
          className="add-data__submit" 
          type="submit" 
          value="Добавить запись в БД"
          disabled={loading}
        />
      </form>
    </>
  );
};

export default AddData;