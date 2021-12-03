import React from "react";
import styled from "styled-components";
import { useTable, usePagination } from "react-table";

function TableActives({ columns, data, editCallback, removeCallback }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );

  const handleEdit = (item) => {
    editCallback(item);
  };

  const handleRemove = (item) => {
    removeCallback(item);
  };

  // Render the UI for your table
  return (
    <>
      <table
        {...getTableProps()}
        className='table align-items-center justify-content-center mb-0'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className='text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2'>
                  {column.render("Header")}
                </th>
              ))}
              <th></th>
              <th></th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className='text-xs font-weight-bold'>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
                <td>
                  <span
                    className='btn btn-link text-danger text-gradient px-3 mb-0 pointer'
                    data-bs-toggle='modal'
                    data-bs-target='#modalRemoveActive'
                    onClick={() => handleRemove(row.original)}>
                    <i className='far fa-trash-alt me-2'></i>
                  </span>
                </td>
                <td>
                  <span
                    className='btn btn-link text-dark px-3 mb-0 pointer'
                    data-bs-toggle='modal'
                    data-bs-target='#modalFormActive'
                    onClick={() => handleEdit(row.original)}>
                    <i
                      className='fas fa-pencil-alt text-dark me-2'
                      aria-hidden='true'></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
      <div class='pagination-container justify-content-center'>
        <ul class='pagination pagination-default'>
          <li class='page-item'>
            <a
              class='page-link'
              href='javascript:;'
              aria-label='Previous'
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}>
              <span aria-hidden='true'>
                <i class='fa fa-angle-left' aria-hidden='true'></i>
                <i class='fa fa-angle-left' aria-hidden='true'></i>
              </span>
            </a>
          </li>
          <li class='page-item'>
            <a
              class='page-link'
              href='javascript:;'
              aria-label='Previous'
              onClick={() => previousPage()}
              disabled={!canPreviousPage}>
              <span aria-hidden='true'>
                <i class='fa fa-angle-left' aria-hidden='true'></i>
              </span>
            </a>
          </li>
          <li class='page-item'>
            <a
              class='page-link'
              href='javascript:;'
              onClick={() => nextPage()}
              disabled={!canNextPage}>
              <span aria-hidden='true'>
                <i class='fa fa-angle-right' aria-hidden='true'></i>
              </span>
            </a>
          </li>

          <li class='page-item'>
            <a
              class='page-link'
              href='javascript:;'
              aria-label='Next'
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}>
              <span aria-hidden='true'>
                <i class='fa fa-angle-right' aria-hidden='true'></i>
                <i class='fa fa-angle-right' aria-hidden='true'></i>
              </span>
            </a>
          </li>
        </ul>
        <span>
          Página{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
      </div>

      {/* <div className='pagination'>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type='number'
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
    </>
  );
}

export default TableActives;
