import React from "react";
import { useEffect, useState } from "react";

// Components
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBr from "date-fns/locale/pt-BR";
registerLocale("pt-Br", ptBr);

export const DatePickles = (props) => {
  const [date, setDate] = useState(new Date());

  const handleDate = (date) => {
    setDate(date);
    props.dateSelected(date);
  };

  return (
    <>
      <div className='input-group mb-3'>
        <DatePicker
          id={props.id}
          className='form-control'
          locale='pt-Br'
          dateFormat='dd/MM/yyyy'
          selected={props.theDate}
          onChange={handleDate}
        />
      </div>
    </>
  );
};
