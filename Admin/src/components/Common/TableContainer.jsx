import React, { Fragment, useEffect, useState } from "react";
import { Row, Table, Button, Col } from "reactstrap";
import { Link } from "react-router-dom";

import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';
import JobListGlobalFilter from "./GlobalSearchFilter";

// Column Filter
const Filter = ({
  column
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '')}
        onChange={value => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <React.Fragment>
      <Col sm={4}>
        <input {...props} value={value} onChange={e => setValue(e.target.value)} />
      </Col>
    </React.Fragment>
  );
};

const TableContainer = ({
  columns,
  data,
  tableClass,
  theadClass,
  divClassName,
  isBordered,
  isPagination,
  isGlobalFilter,
  paginationWrapper,
  SearchPlaceholder,
  pagination,
  buttonClass,
  buttonName,
  isAddButton,
  isCustomPageSize,
  handleUserClick,
  isJobListGlobalFilter,
}) => {

  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const fuzzyFilter = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank
    });
    return itemRank.passed;
  };

  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getCanPreviousPage,
    getCanNextPage,
    getPageOptions,
    setPageIndex,
    nextPage,
    previousPage,
    // setPageSize,
    getState
  } = table;

  // useEffect(() => {
  //   Number(customPageSize) && setPageSize(Number(customPageSize));
  // }, [customPageSize, setPageSize]);

  return (
    <Fragment>

      <Row className="mb-2">
        {isCustomPageSize && (
          <Col sm={2}>
            <select
              className="form-select pageSize mb-2"
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </Col>
        )}

        {isGlobalFilter && <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="form-control search-box me-2 mb-2 d-inline-block"
          placeholder={SearchPlaceholder}
        />}

        {isJobListGlobalFilter && <JobListGlobalFilter setGlobalFilter={setGlobalFilter} />}

        {isAddButton && <Col sm={6}>
          <div className="text-sm-end">
            <Button type="button" className={buttonClass} onClick={handleUserClick}>
              <i className="mdi mdi-plus me-1"></i> {buttonName}</Button>
          </div>
        </Col>}
      </Row>

      <div className={divClassName ? divClassName : "table-responsive"}>
        <Table hover className={tableClass} bordered={isBordered}>
          <thead className={theadClass}>
            {getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan} className={`${header.column.columnDef.enableSorting ? "sorting sorting_desc" : ""}`}>
                      {header.isPlaceholder ? null : (
                        <React.Fragment>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              {
                                asc: '',
                                desc: '',
                              }
                              [header.column.getIsSorted()] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </React.Fragment>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {getRowModel().rows.map(row => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>


      {
        isPagination && (
          <Row>
            <Col sm={12} md={5}>
              <div className="dataTables_info">Showing {getState().pagination.pageSize} of {data.length} Results</div>
            </Col>
            <Col sm={12} md={7}>
              <div className={paginationWrapper}>
                <ul className={pagination}>
                  <li className={`paginate_button page-item previous ${!getCanPreviousPage() ? "disabled" : ""}`}>
                    <Link to="#" className="page-link" onClick={previousPage}><i className="mdi mdi-chevron-left"></i></Link>
                  </li>
                  {getPageOptions().map((item, key) => (
                    <li key={key} className={`paginate_button page-item ${getState().pagination.pageIndex === item ? "active" : ""}`}>
                      <Link to="#" className="page-link" onClick={() => setPageIndex(item)}>{item + 1}</Link>
                    </li>
                  ))}
                  <li className={`paginate_button page-item next ${!getCanNextPage() ? "disabled" : ""}`}>
                    <Link to="#" className="page-link" onClick={nextPage}><i className="mdi mdi-chevron-right"></i></Link>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        )
      }
    </Fragment>
  );
};

export default TableContainer;