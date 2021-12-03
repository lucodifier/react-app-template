import React from "react";
import { useEffect, useState } from "react";

// Components
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

const months = [
  { id: 1, desc: "Janeiro" },
  { id: 2, desc: "Fevereiro" },
  { id: 3, desc: "Março" },
  { id: 4, desc: "Abril" },
  { id: 5, desc: "Maio" },
  { id: 6, desc: "Junho" },
  { id: 7, desc: "Julho" },
  { id: 8, desc: "Agosto" },
  { id: 9, desc: "Setembro" },
  { id: 10, desc: "Outubro" },
  { id: 11, desc: "Novembro" },
  { id: 12, desc: "Dezembro" },
];

export const YearMonth = (props) => {
  const [allMonths, setAllMonths] = useState(months);
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [allYears, setAllYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState([]);

  useEffect(() => {
    createYears();

    setTimeout(() => {
      var date = new Date();
      var month = date.getMonth() + 1;
      var actualMonth = months.find((x) => Number(x.id) === Number(month));
      setSelectedMonth([actualMonth]);
    }, 500);
  }, []);

  const createYears = () => {
    var years = [];
    for (let index = new Date().getFullYear(); index >= 2010; index--) {
      years.push({ id: index, desc: index.toString() });
    }
    setAllYears(years);

    setTimeout(() => {
      var year = new Date().getFullYear();
      var actualYear = years.find((x) => Number(x.id) == Number(year));
      setSelectedYear([actualYear]);
    }, 200);
  };

  const onSelectMonth = (selected) => {
    setSelectedMonth(selected);
    if (selected.length > 0) {
      props.onSelectedMonth(selected[0].id);
    }
  };

  const onSelectYear = (selected) => {
    setSelectedYear(selected);
    if (selected.length > 0) {
      props.onSelectedYear(selected[0].id);
    }
  };

  return (
    <>
      <div className='row'>
        <div className='col-2'>
          <Typeahead
            id='selectedMonth'
            emptyLabel={"Não encontrado"}
            paginationText={"Próximos"}
            onChange={(selected) => {
              onSelectMonth(selected);
            }}
            labelKey='desc'
            options={allMonths && allMonths}
            placeholder='Mês'
            selected={selectedMonth}
          />
        </div>
        <div
          className='col-1'
          style={{ fontSize: "23px", textAlign: "center" }}>
          /
        </div>

        <div className='col-2'>
          <Typeahead
            id='selectedMonth'
            emptyLabel={"Não encontrado"}
            paginationText={"Próximos"}
            onChange={(selected) => {
              onSelectYear(selected);
            }}
            labelKey='desc'
            options={allYears && allYears}
            placeholder='Ano'
            selected={selectedYear}
          />
        </div>
      </div>
    </>
  );
};
