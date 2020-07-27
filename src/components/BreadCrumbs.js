import React from "react";import {Breadscrumbs} from "./ComponentsStyles";import {Link} from "react-router-dom";import breadcrumbs from "../img/outdoor_furniture/bx-breadcrumbs.svg";export default function BreadCrumbs() {    return (        <Breadscrumbs aria-label="breadcrumb"                     style={{color: '#8aa1c1', fontSize: 13}}        >            <Link                to="/"            >                <img src={breadcrumbs} alt=""/>            </Link>            <Link to="/"                  style={{color: '#8aa1c1', fontSize: 13}}            >                Главная            </Link>            <Link to="/installation/"                  style={{color: '#8aa1c1', fontSize: 13}}            >                Базы            </Link>            <Link to="/outdoor_furniture"                  style={{color: '#8aa1c1', fontSize: 13}}            >                Конструкции            </Link>        </Breadscrumbs>    )}