import React from "react";
import DataTable from "react-data-table-component";
import ReactDatatable from "@ashvin27/react-datatable";
import { dataTableConfig } from "./dataTableConfig";

export default (props) => {
  const { columns, data, loading } = props;

  return (
    <>
      <ReactDatatable
        config={dataTableConfig}
        records={data}
        columns={columns}
        loading={loading}
      />
    </>
  );
};
