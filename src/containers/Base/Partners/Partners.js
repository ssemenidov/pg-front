import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Breadcrumb, DatePicker, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Table from '../../../components/TableResizable/Table';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar, StyledButton } from '../../../styles/styles';
import { getPartnersData, getPartnersFiltered, getPartners, setTable } from '../../../store/actions/actions';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import collapseUpIcon from '../../../img/input/collapse-up.svg';
import collapseDownIcon from '../../../img/input/collapse-down.svg';
import cityIcon from '../../../img/input/input-city.svg';
import districtIcon from '../../../img/input/input-district.svg';
import sideIcon from '../../../img/input/side-construction.svg';
import typeIcon from '../../../img/input/type-construction.svg';
import formatIcon from '../../../img/input/format-construction.svg';
import anchorIcon from '../../../img/input/anchor.svg';
import binIcon from '../../../img/input/bin.svg';
import editIcon from '../../../img/edit-icon.svg';
import headerIcon from '../../../img/header-icon.svg';
import searchInputIcon from '../../../img/header-bar/search-icon.svg';
import printerIcon from '../../../img/header-bar/printer.svg';
import exportIcon from '../../../img/header-bar/export.svg';

const { Content, Sider } = Layout;

const Partners = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnersData());
    dispatch(getPartners());
  }, [dispatch]);

  const rows = useSelector((state) => state.table.partnersTableData);
  const rowKeys = useSelector((state) => state.table.partnersRowKeys);
  const [fastSearch, setFastSearch] = useState();

  const partnersColumns = ['Тип контрагента', 'Контрагент', 'Бренд', 'Сектор деятельности', 'Тип клиента'];

  const [collapsed, setCollapsed] = useState(true);
  const [cityTab, setCityTab] = useState(true);
  const [parametersTab, setParametersTab] = useState(true);
  const [purposeTab, setPurposeTab] = useState(true);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 200,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
    {
      dataIndex: 'edit',
      width: 1,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'test',
      age: 32,
      address: '10 Downing Street',
      edit: (
        <Link to="/base/partners/info">
          <img style={{ cursor: 'pointer' }} src={editIcon} alt="" />
        </Link>
      ),
    },
    {
      key: '2',
      name: 'test',
      age: 42,
      address: '10 Downing Street',
      edit: (
        <Link to="/base/partners/info">
          <img style={{ cursor: 'pointer' }} src={editIcon} alt="" />
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <Layout>
        <StyledSider>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </StyledSider>
        {collapsed ? (
          <StyledFilterPanel>
            <div className="filter-panel-title">
              <strong>Поиск</strong>
            </div>
            <div className="filter-panel-city">
              <div className="filter-panel-header" style={{ marginBottom: `${cityTab ? '20px' : '0'}` }}>
                <span>Поиск по параметрам</span>
                <img src={cityTab ? collapseUpIcon : collapseDownIcon} onClick={() => setCityTab(!cityTab)} />
              </div>
              <div style={{ display: `${cityTab ? 'block' : 'none'}` }}>
                <div style={{ marginBottom: '10px' }}>
                  <Select
                    defaultValue={
                      <>
                        <img src={anchorIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Контрагент</span>
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
                        <img src={anchorIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Бренд</span>
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
                        <img src={anchorIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Тип контрагента</span>
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
                        <img src={anchorIcon} style={{ padding: '0 5px', width: '25px', objectFit: 'none' }} />
                        <span>Сектор деятельности</span>
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
                <span>Поиск по БИН</span>
                <img
                  src={parametersTab ? collapseUpIcon : collapseDownIcon}
                  onClick={() => this.setState({ parametersTab: !parametersTab })}
                />
              </div>
              <div style={{ display: `${parametersTab ? 'block' : 'none'}` }}>
                <div style={{ marginBottom: '10px' }}>
                  <Input prefix={<img src={binIcon} />} placeholder="Введите БИН" />
                </div>
              </div>
            </div>
            <div className="group-btn">
              <Button className="search-btn" onClick={() => setCollapsed(!collapsed)}>
                Поиск
              </Button>
              <Button type="primary" className="clear-btn">
                Очистить
              </Button>
            </div>
          </StyledFilterPanel>
        ) : null}
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <Breadcrumb className="layout-breadcrumb">
            <Breadcrumb.Item>
              <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/base/">Базы</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Контрагенты</Breadcrumb.Item>
          </Breadcrumb>
          <StyledHeader>
            <div>
              <img src={headerIcon} alt="" />
              <h2>Контрагенты</h2>
            </div>
            <div>
              <StyledButton backgroundColor="#008556">Создать контрагента</StyledButton>
              <StyledButton backgroundColor="#2C5DE5">Создать договор</StyledButton>
            </div>
          </StyledHeader>
          <div className="header-bar">
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
              <Button className="header-btn">{/* <img src={settingsIcon} /> */}</Button>
            </div>
          </div>
          <StyledContent>
            <Table columns={columns} data={data} />
          </StyledContent>
        </Layout>
      </Layout>
      <style>
        {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
          }
          .layout-sider {
            background: #F5F7FA;
            min-width: 80px !important;
            max-width: 80px !important;
            border-right: 1px solid #d3dff0 !important;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 30px 0;
          }
          .layout-breadcrumb a, span {
            color: #8AA1C1 !important;
          }
          .filter-panel > div {
            display: flex;
            padding: 20px 30px;
            border-bottom: 1px solid #d3dff0;
          }
          .filter-panel-title {
            align-items: flex-end;
            text-transform: uppercase;
          }
          .filter-panel-title strong {
            color: #003360 !important;
          }
          .filter-panel-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            color: #171717 !important;
            font-weight: 600;
          }
          .filter-panel-city {
            flex-direction: column;
          }
          .filter-panel-parameters {
            flex-direction: column;
          }
          .filter-panel-date {
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
          .search-btn:hover span {
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
            justify-content: flex-end;
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
          .header-page-btn:hover span {
            color:#FF5800 !important;
          }
          .header-page-btn span {
            color: #fff  !important;
            font-weight: 600;
          }
        `}
      </style>
    </Layout>
  );
};

const StyledFilterPanel = styled.div`
  width: 300px;
  background: #f5f7fa;
  border-right: 1px solid #d3dff0;

  & > div {
    display: flex;
    padding: 20px 30px;
    border-bottom: 1px solid #d3dff0;
  }

  .ant-select {
    width: 100%;
  }

  span {
    color: #171717 !important;
  }
`;

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 24px;

  h2 {
    color: #003360;
    font-weight: 600;
    margin: 0;
  }

  img {
    margin-right: 10px;
  }

  & > div {
    display: flex;
    align-items: center;
  }
`;

const StyledContent = styled(Content)`
  display: flex;
`;

export default Partners;
