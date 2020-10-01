import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import InnerForm from './TabPanelForm/TabPanelFormConstruction';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../styles/styles';
import { getCurrentConstruction, resetCurrentConstruction } from '../../../store/actions/constructionActions';
import { Link } from 'react-router-dom';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Construction = (props) => {
  const current = useSelector((state) => state.construction.currentConstruction);
  console.log(current);
  const handleTabSelected = (index) => {};
  const [collapsed, setCollapsed] = useState(true);
  return (
    <Layout>
      <Layout>
        <Sider className="layout-sider"></Sider>
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
            <InnerForm selectedTab={handleTabSelected} constructionID={props.match.params.id} />
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
          .layout-breadcrumb a, span {
            color: #8AA1C1 !important;
          }
        `}
      </style>
    </Layout>
  );
};

export default Construction;
