import React from "react";import {    useAsyncDebounce,    useGlobalFilter,    useTable,} from "react-table";import {InputWrapper, StyledInput} from "./TableStyles/TableStyles";export default function GlobalFilter({                          preGlobalFilteredRows,                          globalFilter,                          setGlobalFilter,                      }) {    const count = preGlobalFilteredRows.length    const [value, setValue] = React.useState(globalFilter)    const onChange = useAsyncDebounce(value => {        setGlobalFilter(value || undefined)    }, 200)    return (        <InputWrapper>            <StyledInput                value={value || ""}                onChange={e => {                    setValue(e.target.value);                    onChange(e.target.value);                }}                placeholder={`Быстрый поиск, ${count}  записей...`}            />        </InputWrapper>    )}