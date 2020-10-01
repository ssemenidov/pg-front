import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterBar from './FilterBar';

import { Layout, Menu, Breadcrumb, DatePicker, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Table from '../../../components/Tablea';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar, StyledButton } from '../../../styles/styles';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

import icon_pen from '../../../img/edit-icon.svg';
import headerIcon from '../../../img/header-icon.svg';
import searchInputIcon from '../../../img/header-bar/search-icon.svg';
import printerIcon from '../../../img/header-bar/printer.svg';
import exportIcon from '../../../img/header-bar/export.svg';

const { Content, Sider } = Layout;

const Partners = () => {
  const [collapsed, setCollapsed] = useState(true);
  const columns = [
    {
      title: 'Тип контрагента ',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Контрагент',
      dataIndex: 'agent',

      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',

      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'sector',

      width: 150,
    },
    {
      title: 'Тип клиента',
      dataIndex: 'client',

      width: 100,
    },

    {
      width: 50,
      fixed: 'right',
      render: (text, record) => (
        <Link to="/base/partners/info">
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
    },
  ];

  const data = [
    {
      key: 1,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 2,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 3,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 4,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
  ];

  return (
    <Layout>
      <Layout>
        <StyledSider>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </StyledSider>
        {collapsed && <FilterBar />}
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
          <StyledContent style={{ width: '100%' }}>
            <Table columns={columns} data={data} />
          </StyledContent>
        </Layout>
      </Layout>
      <style>
        {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
            overflow-x: hidden;
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
          .layout-breadcrumb a, .layout-breadcrumb span {
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
      
         
        `}
      </style>
    </Layout>
  );
};

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
