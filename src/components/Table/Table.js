import React from 'react';
import { useSticky } from 'react-table-sticky';
import {
  useAsyncDebounce,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useTable,
} from 'react-table';
import settings_icon from "../../img/outdoor_furniture/table_icons/setting.svg";
import export_icon from "../../img/outdoor_furniture/table_icons/export_icon.svg";
import print_icon from "../../img/outdoor_furniture/table_icons/print.svg";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import TableToExcel from "@linways/table-to-excel";
import {
  Styles,
  PaginationStyled,
  PaginationWrap,
} from "./TableStyles/TableStyles";
import { BtnExport, BtnPrint, BtnSettings } from "../Styles/ButtonStyles";

import {
  ControlToolbar,
  StyleddInput,
  ToolbarControl,
  InputWrapper,
} from "../Styles/ControlToolbarStyle";

export default function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    page, // Instead of using 'rows', we'll use page - It is used by GlobalFilter and Pagination
    canPreviousPage /*Pagination */,
    canNextPage /*Pagination */,
    pageOptions /*Pagination */,
    pageCount /*Pagination */,
    gotoPage /*Pagination */,
    nextPage /*Pagination */,
    previousPage /*Pagination */,
    setPageSize /*Pagination - onChange*/,
    state /*GlobalFilter*/,
    preGlobalFilteredRows /*GlobalFilter*/,
    setGlobalFilter /*GlobalFilter*/,
    state: { pageIndex, pageSize } /*Pagination state*/,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // resetResizing,
  } = useTable(
    {
      columns,
      data,
      // defaultColumn, // Be sure to pass the defaultColumn option
      initialState: { pageIndex: 0, pageSize: 20 },
      defaultColumn,
      // getColumnWidth
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    usePagination,
    useBlockLayout,
    useSticky,
    useResizeColumns
  );

  const exportBtnHandler = () => {
    let table = document.getElementById("table1");
    TableToExcel.convert(table);
  };
  console.log(page);

  return (
    <>
      <Styles>
        {/*<button onClick={resetResizing}>Reset Resizing</button>*/}

        <div
          {...getTableProps()}
          className="table sticky"
          style={{ width: "100%", height: 500 }}
          id="table1"
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()} className="body">
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className="td">
                        {cell.render("Cell")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <PaginationStyled>
          <span>
            Показано&nbsp;
            <strong>
              {pageIndex + 1} из {pageOptions.length}
            </strong>{" "}
          </span>
          <PaginationWrap>
            <Pagination>
              <PaginationItem>
                <PaginationLink
                  first
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  previous
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink
                  next
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  last
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                />
              </PaginationItem>
            </Pagination>
          </PaginationWrap>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </PaginationStyled>
      </Styles>
    </>
  );
}

// import React from "react";
// import {useSticky} from "react-table-sticky";
// import "./../Table/TableStyles/PgTest.css"
// import PgTest from "./PgTest";
//
// import {
//     useAsyncDebounce,
//     useBlockLayout,
//     useFilters,
//     useGlobalFilter,
//     usePagination,
//     useResizeColumns,
//     useTable
// } from 'react-table'
// import settings_icon from "../../../img/outdoor_furniture/table_icons/setting.svg";
// import export_icon from "../../../img/outdoor_furniture/table_icons/export_icon.svg";
// import print_icon from "../../../img/outdoor_furniture/table_icons/print.svg";
// import {Pagination, PaginationItem, PaginationLink} from 'reactstrap';
// import TableToExcel from "@linways/table-to-excel";
// import {
//     Styles,
//     TableToolbar,
//     TableControl,
//     BtnExport,
//     BtnPrint,
//     BtnSettings,
//     PaginationStyled,
//     PaginationWrap,
//     StyledInput,
//     InputWrapper
// } from "./TableStyles/TableStyles";
//
//
// function GlobalFilter({
//                           preGlobalFilteredRows,
//                           globalFilter,
//                           setGlobalFilter,
//                       }) {
//     const count = preGlobalFilteredRows.length
//     const [value, setValue] = React.useState(globalFilter)
//     const onChange = useAsyncDebounce(value => {
//         setGlobalFilter(value || undefined)
//     }, 200)
//
//     return (
//         <InputWrapper>
//             <StyledInput
//                 value={value || ""}
//                 onChange={e => {
//                     setValue(e.target.value);
//                     onChange(e.target.value);
//                 }}
//                 placeholder={`Быстрый поиск, ${count}  записей...`}
//             />
//         </InputWrapper>
//     )
// }
//
// export default function Table({columns, data}) {
//
//     const defaultColumn = React.useMemo(
//         () => ({
//             minWidth: 30,
//             width: 150,
//             maxWidth: 400,
//         }),
//         []
//     )
//
//     const {
//         page, // Instead of using 'rows', we'll use page - It is used by GlobalFilter and Pagination
//         canPreviousPage, /*Pagination */
//         canNextPage, /*Pagination */
//         pageOptions, /*Pagination */
//         pageCount, /*Pagination */
//         gotoPage, /*Pagination */
//         nextPage, /*Pagination */
//         previousPage, /*Pagination */
//         setPageSize, /*Pagination - onChange*/
//         state, /*GlobalFilter*/
//         preGlobalFilteredRows, /*GlobalFilter*/
//         setGlobalFilter, /*GlobalFilter*/
//         state: {pageIndex, pageSize}, /*Pagination state*/
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         prepareRow,
//         // resetResizing,
//     } = useTable(
//         {
//             columns,
//             data,
//             // defaultColumn, // Be sure to pass the defaultColumn option
//             initialState: {pageIndex: 0, pageSize: 10},
//             defaultColumn,
//             // getColumnWidth
//         },
//         useFilters, // useFilters!
//         useGlobalFilter, // useGlobalFilter!
//         usePagination,
//         useBlockLayout,
//         useSticky,
//         useResizeColumns
//     );
//
//
//     const exportBtnHandler = () => {
//         let table = document.getElementById('table1');
//         TableToExcel.convert(table)
//     }
//
//
//     return (
//         <>
//             <Styles>
//                 {/*<button onClick={resetResizing}>Reset Resizing</button>*/}
//                 <TableToolbar>
//                     <GlobalFilter
//                         preGlobalFilteredRows={preGlobalFilteredRows}
//                         globalFilter={state.globalFilter}
//                         setGlobalFilter={setGlobalFilter}
//                     />
//
//                     <TableControl>
//                         <BtnPrint>
//                             <img src={print_icon} alt=""/>
//                         </BtnPrint>
//                         <BtnExport onClick={exportBtnHandler}>
//                             <img src={export_icon} alt=""/>
//                             Экспорт
//                         </BtnExport>
//                         <BtnSettings>
//                             <img src={settings_icon} alt=""/>
//                         </BtnSettings>
//                     </TableControl>
//                 </TableToolbar>
//
//                 <div
//                     {...getTableProps()}
//                     className="table sticky"
//                     style={{width: "100%", height: 500}}
//                     id="table1"
//                 >
//                     <div className="header">
//                         {headerGroups.map(headerGroup => (
//                             <div {...headerGroup.getHeaderGroupProps()} className="tr">
//                                 {headerGroup.headers.map(column => (
//                                     <div {...column.getHeaderProps()} className="th">
//                                         {column.render("Header")}
//                                         {/* Use column.getResizerProps to hook up the events correctly */}
//                                         <div
//                                             {...column.getResizerProps()}
//                                             className={`resizer ${
//                                                 column.isResizing ? 'isResizing' : ''
//                                             }`}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         ))}
//                     </div>
//
//                     <div {...getTableBodyProps()} className="body">
//                         {page.map((row, i) => {
//                             prepareRow(row);
//                             return (
//                                 <div {...row.getRowProps()} className="tr">
//                                     {row.cells.map(cell => {
//                                         return (
//                                             <div {...cell.getCellProps()} className="td">
//                                                 {cell.render("Cell")}
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             );
//                         })}
//                     </div>
//
//                 </div>
//                 <PaginationStyled>
//                     <span>Показано&nbsp;<strong>{pageIndex + 1} из {pageOptions.length}</strong>{' '}</span>
//                     <PaginationWrap>
//                         <Pagination>
//                             <PaginationItem>
//                                 <PaginationLink first onClick={() => gotoPage(0)} disabled={!canPreviousPage}/>
//                             </PaginationItem>
//
//                             <PaginationItem>
//                                 <PaginationLink previous onClick={() => previousPage()} disabled={!canPreviousPage}/>
//                             </PaginationItem>
//
//                             <PaginationItem>
//                                 <PaginationLink next onClick={() => nextPage()} disabled={!canNextPage}/>
//                             </PaginationItem>
//
//                             <PaginationItem>
//                                 <PaginationLink last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}/>
//                             </PaginationItem>
//                         </Pagination>
//                     </PaginationWrap>
//                     <select
//                         value={pageSize}
//                         onChange={e => {
//                             setPageSize(Number(e.target.value))
//                         }}
//                     >
//                         {[10, 20, 30, 40, 50].map(pageSize => (
//                             <option key={pageSize} value={pageSize}>
//                                 {pageSize}
//                             </option>
//                         ))}
//                     </select>
//                 </PaginationStyled>
//             </Styles>
//         </>
//     );
// }
//
//
//
//
//
//
//
//
//
