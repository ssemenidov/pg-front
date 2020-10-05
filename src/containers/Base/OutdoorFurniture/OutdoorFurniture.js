import React, { useState, useContext, createContext } from 'react';
import PanelOutdoor from './PanelOutdoor';

import { Layout, Menu, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import FilterBar from './FilterBar';
import SearchBtn from '../../../components/LeftBar/SearchBtn';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../styles/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';

const { Header, Content, Sider } = Layout;
export const outContext = createContext();
const OutdoorFurniture = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);

  const [filter, setFilter] = useState({});
  return (
    <outContext.Provider value={[filter, setFilter]}>
      <Layout>
        <Layout>
          <Sider className="layout-sider">
            <SearchBtn onClick={() => setCollapsed(!collapsed)} />
          </Sider>
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
              <Breadcrumb.Item>Конструкции</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
              <HeaderWrapper>
                <HeaderTitleWrapper>
                  <TitleLogo />
                  <JobTitle>Конструкции</JobTitle>
                </HeaderTitleWrapper>
                <ButtonGroup>
                  <StyledButton backgroundColor="#008556" onClick={() => history.push(`/base/construction`)}>
                    Создать конструкцию
                  </StyledButton>
                </ButtonGroup>
              </HeaderWrapper>
              <div style={{ display: 'flex' }}>
                <PanelOutdoor style={{ flex: '0 1 auto' }} />
              </div>
            </Content>
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
            min-width: 60px !important;
            max-width: 60px !important;
            border-right: 1px solid #d3dff0 !important;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 20px 0;
          }
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
        </style>
      </Layout>
    </outContext.Provider>
  );
};
export default OutdoorFurniture;
