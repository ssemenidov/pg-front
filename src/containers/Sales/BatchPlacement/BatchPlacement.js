import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Table, DatePicker, Checkbox, Select, Button, Input } from 'antd';
import HeaderSales from './HeaderSales';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LeftBar } from '../../../styles/styles';
import freeIcon from '../../../img/sales/free.svg';
import bookedIcon from '../../../img/sales/booked.svg';
import soldIcon from '../../../img/sales/sold.svg';

import plusIcon from '../../../img/header-bar/plus-icon.svg';
import minusIcon from '../../../img/header-bar/minus-icon.svg';
import arrowLeft from '../../../img/header-bar/arrow-left.svg';
import arrowRight from '../../../img/header-bar/arrow-right.svg';
import calendarIcon from '../../../img/header-bar/calendar.svg';
import searchInputIcon from '../../../img/header-bar/search-icon.svg';
import printerIcon from '../../../img/header-bar/printer.svg';
import exportIcon from '../../../img/header-bar/export.svg';
import settingsIcon from '../../../img/header-bar/settings.svg';
import advertisingIcon from '../../../img/sales/advertising-side-header.svg';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import searchIcon from '../../../img/left-bar/search.svg';
import createProjectIcon from '../../../img/left-bar/create-project.svg';

import collapseUpIcon from '../../../img/input/collapse-up.svg';
import collapseDownIcon from '../../../img/input/collapse-down.svg';
import cityIcon from '../../../img/input/input-city.svg';
import districtIcon from '../../../img/input/input-district.svg';
import sideIcon from '../../../img/input/side-construction.svg';
import typeIcon from '../../../img/input/type-construction.svg';
import formatIcon from '../../../img/input/format-construction.svg';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';

const { Content, Sider } = Layout;

const BatchPlacement = () => {
  const columns = [
    {
      title: 'Период',
      dataIndex: 'period',
      width: 150,
    },
    {
      title: 'A1',
      dataIndex: 'A1',
      width: 150,
    },
    {
      title: 'A2',
      dataIndex: 'A2',
      width: 150,
    },
    {
      title: 'A3',
      dataIndex: 'A3',
      width: 150,
    },
    {
      title: 'A4',
      dataIndex: 'A4',
      width: 150,
    },
    {
      title: 'B1',
      dataIndex: 'B1',
      width: 150,
    },
    {
      title: 'B2',
      dataIndex: 'B2',
      width: 150,
    },
    {
      title: 'B3',
      dataIndex: 'B3',
      width: 150,
    },
    {
      title: 'B4',
      dataIndex: 'B4',
      width: 150,
    },
    {
      title: 'D1',
      dataIndex: 'D1',
      width: 150,
    },
    {
      title: 'D2',
      dataIndex: 'D2',
      width: 150,
    },
  ];

  const data = [
    {
      period: '16 - 01 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
    },
    {
      period: '02 - 15 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
    },
    {
      period: '16 - 30 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
    },
  ];

  const [collapsed, setCollapsed] = useState(true);
  const [reservationTab, setReservationTab] = useState(true);
  const [cityTab, setCityTab] = useState(true);
  const [parametersTab, setParametersTab] = useState(true);

  return (
    <Layout>
      <Layout>
        <StyledSider>
          <StyledSider>
            <LeftBar>
              <SearchBtn onClick={() => setCollapsed(!collapsed)} />
              <CreateBtn text="Создать проект" />
            </LeftBar>
          </StyledSider>
        </StyledSider>
        {collapsed ? (
          <StyledFilterPanel>
            <div className="filter-panel-title">
              <strong>Поиск</strong>
            </div>
            <div className="filter-panel-date">
              <span>По дате</span>
              <DatePicker className="filter-datepicker" />
            </div>
            <div className="filter-panel-status">
              <div className="filter-panel-header" style={{ marginBottom: `${reservationTab ? '20px' : '0'}` }}>
                <span>Статус брони</span>
                <img
                  src={reservationTab ? collapseUpIcon : collapseDownIcon}
                  onClick={() => setReservationTab(!reservationTab)}
                />
              </div>
              <div style={{ display: `${reservationTab ? 'block' : 'none'}` }}>
                <div>
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <div className="dot-1"></div>
                  <span>Свободно</span>
                </div>
                <div>
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <div className="dot-2"></div>
                  <span>Забронировано</span>
                </div>
                <div>
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <div className="dot-3"></div>
                  <span>Утверждено</span>
                </div>
                <div>
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <div className="dot-4"></div>
                  <span>Продано</span>
                </div>
                <div>
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <div className="dot-4"></div>
                  <span>Недоступно</span>
                </div>
              </div>
            </div>
            <div className="filter-panel-city">
              <div className="filter-panel-header" style={{ marginBottom: `${cityTab ? '20px' : '0'}` }}>
                <span>Фильтр по городу</span>
                <img src={cityTab ? collapseUpIcon : collapseDownIcon} onClick={() => setCityTab(!cityTab)} />
              </div>
              <div style={{ display: `${cityTab ? 'block' : 'none'}` }}>
                <div style={{ marginBottom: '10px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={cityIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Выберите город</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
                <div>
                  <Select
                    defaultValue={
                      <>
                        <img src={districtIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Выберите район</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className="filter-panel-parameters">
              <div className="filter-panel-header" style={{ marginBottom: `${parametersTab ? '20px' : '0'}` }}>
                <span>По параметрам</span>
                <img
                  src={parametersTab ? collapseUpIcon : collapseDownIcon}
                  onClick={() => setParametersTab(!parametersTab)}
                />
              </div>
              <div style={{ display: `${parametersTab ? 'block' : 'none'}` }}>
                <div style={{ marginBottom: '10px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={typeIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Тип конструкции</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={formatIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Формат конструкции</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={sideIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Сторона конструкции</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={sideIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Размер</span>
                      </>
                    }
                    suffixIcon={<img src={collapseDownIcon} />}
                    className="ant-select">
                    <Select.Option value="Option1">Выбор 1</Select.Option>
                    <Select.Option value="Option2">Выбор 2</Select.Option>
                  </Select>
                </div>
                <div className="checkbox-block">
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <span>Пакет</span>
                </div>
                <div className="checkbox-block">
                  <Checkbox className="custom-checkbox" defaultChecked />
                  <span>Освещение</span>
                </div>
              </div>
            </div>
            <div className="group-btn">
              <Button className="search-btn">Искать</Button>
              <Button type="primary" className="clear-btn">
                Очистить
              </Button>
            </div>
          </StyledFilterPanel>
        ) : null}
        <StyledLayout>
          <StyledBreadcrumb>
            <Breadcrumb.Item>
              <img src={breadcrumbs} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/sales/">Продажи</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Пакетное размещение</Breadcrumb.Item>
          </StyledBreadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <img src={advertisingIcon} />
              <h2
                style={{
                  fontSize: '24px',
                  color: '#003360',
                  fontWeight: '600',
                  fontFamily: 'SF UI Display Medium, sans-serif',
                }}>
                Пакетное размещение
              </h2>
            </div>
            <Button type="primary" className="header-page-btn">
              <span>Создать отчет</span>
              <img src={collapseDownIcon} />
            </Button>
          </div>
          <div className="header-bar">
            <div>
              <div>
                <Button className="header-btn">
                  <img src={plusIcon} />
                </Button>
                <Button className="header-btn">
                  <img src={minusIcon} />
                </Button>
              </div>
              <div>
                <Button style={{ marginLeft: '20px' }} className="header-btn">
                  <img src={arrowLeft} />
                </Button>
                <Button style={{ margin: '0', width: '100px' }} className="header-btn header-date-btn">
                  <span>Неделя</span>
                  <img src={collapseDownIcon} />
                </Button>
                <Button style={{ width: '220px' }} className="header-btn header-date-btn">
                  <img src={calendarIcon} />
                  <span>2 марта - 29 марта 2020</span>
                </Button>
                <Button className="header-btn">
                  <img src={arrowRight} />
                </Button>
              </div>
            </div>
            <div>
              <Input
                style={{ marginLeft: '20px' }}
                placeholder="Быстрый поиск"
                suffix="Найти"
                prefix={<img src={searchInputIcon} />}
              />
              <Button style={{ marginLeft: '5px' }} className="header-btn">
                <img src={printerIcon} />
              </Button>
              <Button
                style={{ width: '180px', display: 'flex', justifyContent: 'space-between' }}
                className="header-btn">
                <img src={exportIcon} />
                <span>Экспорт</span>
              </Button>
              <Button className="header-btn">
                <img src={settingsIcon} />
              </Button>
            </div>
          </div>
          <Content>
            <StyledTable pagination={false} columns={columns} dataSource={data} scroll={{ y: 500 }} />
          </Content>
        </StyledLayout>
      </Layout>
      <style>{`
        .filter-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #171717 !important;
          font-weight: 600;
        }
        .filter-panel-header img {
          cursor: pointer;
        }
        .filter-panel-title {
          height: 65px;
          align-items: flex-end;
          text-transform: uppercase;
        }
        .filter-panel-title strong {
          color: #003360 !important;
        }
        .filter-panel-date {
          flex-direction: column;
        }
        .filter-panel-date span {
          font-weight: 600;
          color: #1A1A1A !important;
        }
        .filter-datepicker {
          margin-top: 20px;
        }
        .filter-panel-status {
          display: flex;
          flex-direction: column;
        }
        .filter-panel .custom-checkbox {
          margin: 0 !important;
        }
        .filter-panel-status > div > div {
          display: flex;
          align-items: center;
        }
        .filter-panel-status > div > div span {
          color: #1A1A1A !important;
        }
        .filter-panel > div > div > span {
          color: #1A1A1A !important;
        }
        .dot-1 {
          height: 8px;
          margin: 0 8px;
          width: 8px;
          background-color: #63D411;
          border-radius: 50%;
        }
        .dot-2 {
          height: 8px;
          margin: 0 8px;
          width: 8px;
          background-color: #117BD4;
          border-radius: 50%;
        }
        .dot-3 {
          height: 8px;
          margin: 0 8px;
          width: 8px;
          background-color: #FDC911;
          border-radius: 50%;
        }
        .dot-4 {
          height: 8px;
          margin: 0 8px;
          width: 8px;
          background-color: #D42D11;
          border-radius: 50%;
        }
        .filter-panel-city {
          display: flex;
          flex-direction: column;
        }
        .ant-select ant-select-selection-item span {
          color: #656565 !important;
        }
        .ant-select {
          width: 100%;
        }
        .filter-panel-parameters {
          display: flex;
          flex-direction: column;
        }
        .checkbox-block > span {
          color: #1A1A1A !important;
          margin-left: 8px;
        }
        .filter-panel-purpose {
          display: flex;
          flex-direction: column;
        }
        .group-btn {
          justify-content: space-between;
        }
        .clear-btn, .search-btn {
          border-radius: 4px;
          width: 45%;
        }
        .clear-btn span {
          color: #2C5DE5 !important;
          font-weight: 600;
        }
        .clear-btn {
          background: #EEF3FF;
          border: 1px solid #2C5DE5;
        }
        .search-btn {
          background: #2C5DE5;
        }
        .search-btn span {
          color: #FFF !important;
        }
        .search-btn:hover span , .search-btn:active span {
          color: #2C5DE5 !important;
        }
        .header-bar {
          display: flex;
          background: #E7EEF8;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 1px solid #D3DFF0;
          height: 45px;
          padding: 5px;
          justify-content: space-between;
        }
        .header-bar > div {
          display: flex;
        }
        .header-bar > div > div {
          display: flex;
        }
        .header-btn {
          border: 1px solid #D3DFF0;
          margin-right: 5px;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .header-date-btn {
          display: flex;
          justify-content: space-between;
        }
        .header-date-btn span {
          color: #252525 !important;
        }
        .header-page-btn {
          border-radius: 4px;
          background: #FF5800;
          display: flex;
          align-items: center;
          padding: 15px 30px;
          border: 1px solid #FF5800 !important ;
        }
        .header-page-btn span {
          color: #fff !important;
          font-weight: 600;
        }
        .header-page-btn:active, .header-page-btn:hover, .header-page-btn:focus {
          background: #FF5800 !important;
        }
      `}</style>
    </Layout>
  );
};

export default BatchPlacement;

const StyledLayout = styled(Layout)`
  background: #fff !important;
  height: 100% !important;
  padding: 30px 30px 0 30px;
`;

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 70px !important;
  max-width: 70px !important;
  border-right: 1px solid #d3dff0 !important;
`;

const LeftBarList = styled.ul`
  padding: 10px 5px !important;
`;

const ListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 55px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #d3dff0;
  margin-bottom: 15px;

  span {
    text-align: center;
    line-height: normal;
    margin: 10px 0;
    color: #003360 !important;
    font-size: 11px;
  }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 11px;
  margin: 0 0 20px 0;

  a,
  span {
    color: #8aa1c1 !important;
  }

  img {
    margin: 0 8px 0 0;
  }
`;

const StyledTable = styled(Table)`
  th,
  td {
    color: #1a1a1a !important;
    font-weight: 600 !important;
  }

  .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }

  .ant-table-row td:not(:first-child) {
    padding: 5px !important;
  }

  th {
    background: transparent !important;
  }

  .ant-table-body tr td:not(:first-child) {
    background: #f5f7fa !important;
  }
`;

const StyledFilterPanel = styled.div`
  width: 300px;
  background: #f5f7fa;
  border-right: 1px solid #d3dff0;

  & > div {
    display: flex;
    padding: 20px 30px;
    border-bottom: 1px solid #d3dff0;
  }
`;
