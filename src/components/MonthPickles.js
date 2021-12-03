import React from "react";
import { useEffect, useState } from "react";

// Components
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
registerLocale("pt-Br", ptBr);

export const MonthPickles = (props) => {
  const [date, setDate] = useState(new Date());

  const handleDate = (date) => {
    setDate(date);
    props.onSelectedDate(date);
  };

  return (
    <>
      <div className='input-group mb-3'>
        <DatePicker
          className='form-control'
          locale='pt-Br'
          dateFormat='MM/yyyy'
          selected={date}
          onChange={handleDate}
          showMonthYearPicker
          showFullMonthYearPicker
        />
      </div>
    </>
  );
};
