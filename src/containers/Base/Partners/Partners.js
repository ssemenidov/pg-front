import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import PanelPartners from './PanelPartners';
import FilterBar from './FilterBar';

import { Layout, Menu, Breadcrumb, DatePicker, Select, Button, Input } from 'antd';

import styled from 'styled-components';

import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../styles/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import icon_pen from '../../../img/edit-icon.svg';

const { Content, Sider } = Layout;
export const partnersContext = createContext();
const Partners = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const history = useHistory();
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
    <partnersContext.Provider value={[filter, setFilter]}>
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
            <HeaderWrapper>
              <HeaderTitleWrapper>
                <TitleLogo />
                <JobTitle>Контрагенты</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                <StyledButton backgroundColor="#008556" onClick={() => {}}>
                  Создать контрагента
                </StyledButton>
                <StyledButton backgroundColor="#2C5DE5" onClick={() => {}}>
                  Создать договор
                </StyledButton>
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex' }}>
              <PanelPartners style={{ flex: '0 1 auto' }} history={history} />
            </div>
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
          
      
         
        `}
        </style>
      </Layout>
    </partnersContext.Provider>
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
