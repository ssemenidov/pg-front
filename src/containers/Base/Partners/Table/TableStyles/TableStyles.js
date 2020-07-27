import styled from "styled-components";import search_icon from "../../../../../img/outdoor_furniture/table_icons/find_icon.svg";import {NavLink} from "react-router-dom";export const Styles = styled.div`  .table {      display: inline-block;      border-spacing: 0;      border: 1px solid #D3DFF0;      text-align: left;      margin: 0;      vertical-align: middle;      height: 44px;      color: #1A1A1A;      font-family: "SF UI Display Medium", sans-serif;      font-weight: 400;      font-size: 14px;      border-bottom-left-radius: 0;      border-bottom-right-radius: 0;      border-radius: 8px;    .tr {      :last-child {        .td {          border-bottom:  1px solid #D3DFF0;        }      }       :nth-child(even) {              .td {        background-color: #F5F7FA;        }        nth-last-child(1) { background: cyan; }    }    }    .th,    .td {      padding: 8px 0 0 17px;      border-bottom: 1px solid #D3DFF0;      border-right: 1px solid #D3DFF0;      background-color: #fff;      white-space: nowrap;      :last-child {        border-right: 0;      }  ${''}      position: relative;      :last-child {        border-right: 0;        width: 29% !important;        padding-left: 28px;      }      .resizer {        display: inline-block;        //background: blue;        width: 5px;        height: 100%;        position: absolute;        right: 0;        top: 0;        transform: translateX(50%);        z-index: 1;        ${'' /* prevents from scrolling while dragging on touch devices */}        touch-action:none;        &.isResizing {          background: red;        }      }    }    &.sticky {      overflow: scroll;      .header,      .footer {        position: sticky;        z-index: 1;        box-shadow: none;        height: 50px;      }      .header {        top: 0;      }      .footer {        bottom: 0;      }      .body {        position: relative;        z-index: 0;      }      [data-sticky-td] {        position: sticky;      }    }  }`;//Styles for Toolbar:export const TableToolbar = styled.div`    background-color: #e7eef8;    width: 100%;    height: 42px;    border-radius: 6px;    padding: 0 10px;    display: flex;    justify-content: space-between;    align-items: center;    margin-bottom: 16px;    position: relative;`;export const TableControl = styled.div`    display: flex;    justify-content: space-between;    width: 176px;    height: 32px;`;export const InputWrapper = styled.div`      width: 100%;       &:before {                content: "";                z-index: 1000;                top: 6px;                left: 15px;                width: 32px;                height: 32px;                position: absolute;                background-image: url(${search_icon});                background-repeat: no-repeat;                background-position: center;                display: inline-block;              }`;export const InputWrapperPartner = styled.div`   width: 100%;       &:before {                content: "";                z-index: 1000;                top: 6px;                right: 44%;                width: 32px;                height: 32px;                position: absolute;                background-image: url(${search_icon});                background-repeat: no-repeat;                background-position: center;                display: inline-block;              }`;export const InputWrapperPartnerTableContent= styled.div`  width: 100%;       &:before {                content: "";                z-index: 1000;                top: 6px;                right: 37.8%;                width: 32px;                height: 32px;                position: absolute;                background-image: url(${search_icon});                background-repeat: no-repeat;                background-position: center;                display: inline-block;              }`;export const SearchButtonTable = styled.a`                position: absolute;                top: 15px;                right: 16.6%;                font-size: 12px;                line-height: 12px;                color:#2C5DE5 !important;                cursor:pointer;`export const SearchButtonTableContent =styled.a`  position: absolute;                top: 15px;                right: 14.6%;                font-size: 12px;                line-height: 12px;                color:#2C5DE5 !important;                cursor:pointer;`export const StyledInput = styled.input`      width: 400px;      height: 32px;      padding: 8px 37px;      border-radius: 5px;      position: relative;      border: none;      &::placeholder{      font-family: "SF UI Display Light", sans-serif;      font-size: 12px;      letter-spacing: 0.25px;      color: #656565;      }`;export const BtnSettings = styled.button`    display: flex;    justify-content: center;    align-items: center;    width: 32px;    height: 32px;    background: #FFFFFF;    border: 1px solid #D3DFF0;    box-sizing: border-box;    border-radius: 4px;`export const BtnPrint = styled.button`    display: flex;    justify-content: center;    align-items: center;    width: 32px;    height: 32px;    background: #FFFFFF;    border: 1px solid #D3DFF0;    box-sizing: border-box;    border-radius: 4px;`export const BtnExport = styled.button`        width: 102px;        height: 32px;        margin:0 6px;        padding: 0 17px;        font-size: 12px;        line-height: 12px;        background: #FFFFFF;        border: 1px solid #D3DFF0;        box-sizing: border-box;        border-radius: 4px;        color: #252525;        display: flex;        justify-content: space-between;        align-items: center;`;//Pagination:export const PaginationStyled = styled.div`    width: 100%;    padding: 0 20px;    border: 1px solid #D3DFF0;    height: 50px;    display: flex;    justify-content: space-between;    align-items: center;    border-bottom-left-radius: 9px;    border-bottom-right-radius: 9px;`;export const PaginationWrap = styled.div`      padding-top: 16px;      color: red`;