import React, { Component, useState,createContext } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';

import PanelAdver from './PanelAdver';
import FilterBar from './FilterBar';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
export const adverContext = createContext();
const { Content, Sider } = Layout;


const AdvertisingParties = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter]= useState({});

  return (
    <adverContext.Provider value={[filter, setFilter]}>
    <Layout>
      <Layout>
        <Sider className="layout-sider">
          <Menu
            className="layout-sider"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}>
            <LeftBar>
              <SearchBtn
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              />
              <CreateBtn text="Создать проект" />
            </LeftBar>
          </Menu>
        </Sider>
        {collapsed && <FilterBar />}
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <Breadcrumb className="layout-breadcrumb">
            <Breadcrumb.Item>
              <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/sales/">Продажи</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Справочник рекламных сторон</Breadcrumb.Item>
          </Breadcrumb>
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Справочник рекламных сторон</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton backgroundColor="#FF5800">Создать отчет</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PanelAdver style={{ flex: '0 1 auto' }} />
          </div>
        </Layout>
      </Layout>
      <style>
        {`
          .layout-main {
            background: #fff !important;
            position: relative;
            min-height: 100vh;
            height: auto !important;
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
          .dot-1 {
            height: 8px;
            margin: 0 4px;
            width: 8px;
            background-color: #63D411;
            border-radius: 50%;
            display: inline-block;
          }
          .dot-2 {
            height: 8px;
            margin: 0 4px;
            width: 8px;
            background-color: #117BD4;
            border-radius: 50%;
            display: inline-block;
          }
          .dot-3 {
            height: 8px;
            margin: 0 4px;
            width: 8px;
            background-color: #FDC911;
            border-radius: 50%;
            display: inline-block;
          }
          .dot-4 {
            height: 8px;
            margin: 0 4px;
            width: 8px;
            background-color: #D42D11;
            border-radius: 50%;
            display: inline-block;
          }
          .page-label span{
            position: absolute;
            padding-left: 10px;
          }
          .page-label{
            overflow:hidden;
          }
        `}
      </style>
    </Layout>
    </adverContext.Provider>
  );
};
export default AdvertisingParties;
