import React from 'react'
import { useState } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { useGlobalStates } from './utils/globalContext';

const Calendario = () => {
  const {numCalen} = useGlobalStates()
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className='contenedor-calendario'>
<div className='calendario-producto'>
        <DatePicker
          calendarClassName="bordeCalendario"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          onChange={(update) => {
              setDateRange(update);
            }}
            monthsShown={numCalen}
            inline
            /></div>
            </div>

  )
}

export default Calendario