import styled from "styled-components";import Breadcrumbs from "@material-ui/core/Breadcrumbs";import icon_book from "../../../../img/outdoor_furniture/bx-book.svg";export const Section = styled.div`      font-family: "SF UI Display Light", sans-serif;      width: 77%;      margin: 20px;`;export const BreadCrumbs = styled(Breadcrumbs)`        width: 250px;        height: 14px;        font-size: 11px;        line-height: 13px;        padding-top: 8px;`;export const ListHeader = styled.div`      display: flex;      justify-content: space-between;      align-content: center;      margin-top: 30px;      margin-bottom: 30px;`;export const ListTitle = styled.div`      display: flex;      align-content: center;      align-items: center;      width: 372px;      height: auto;`;export const TitleLogo = styled.div`      width: 33px;      height: 32px;      background-color: #D42D11;      border-radius: 4px;      background-image: url(${icon_book});      background-repeat: no-repeat;      background-position: center;`;export const Title = styled.h1`        font-family: "SF UI Display Medium", sans-serif;        font-size: 24px;        line-height: 28px;        transform: translate(3px, 4px);        color: #003360;`;export const StyledButton = styled.button`        width: 200px;        height: 40px;        background: #008556;        border: none;        font-size: 14px;        line-height: 14px;        color: #FFFFFF;        outline: none;        box-shadow: none;        border-radius: 4px;            :hover {              cursor: pointer;              opacity: 0.7;        }`;export const StyledButtonBlue = styled.button`        width: 165px;        height: 40px;        background: #2C5DE5;        border: none;        font-size: 14px;        line-height: 14px;        color: #FFFFFF;        outline: none;        box-shadow: none;        margin-left: 24px;        border-radius: 4px;            :hover {              cursor: pointer;              opacity: 0.7;        }`;export const BlockButton = styled.div`    display:block    `;