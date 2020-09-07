import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import InnerForm from './TabPanelForm/TabPanelFormConstruction';
import SearchBtn from '../Partners/LeftBar/SearchBtn';
import { LeftBar } from '../../../styles/styles';
import { getCurrentConstruction, resetCurrentConstruction } from '../../../store/actions/constructionActions';
import { Link } from 'react-router-dom';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Construction = (props) => {
  const current = useSelector((state) => state.construction.currentConstruction);
  console.log(current);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof props.match.params.id != 'undefined') {
      dispatch(getCurrentConstruction(props.match.params.id));
    } else {
      dispatch(resetCurrentConstruction());
    }
  }, [props.match, dispatch]);

  const [showSearchBtn, setSearchBtn] = useState(false);

  const handleTabSelected = (index) => {
    console.log(index);
    if (index === 4) {
      setSearchBtn(true);
    } else setSearchBtn(false);
  };

  return (
    <Layout>
      <Layout>
        <Sider className="layout-sider">
          <Menu
            className="layout-sider"
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <Breadcrumb className='layout-breadcrumb'>
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
            min-width: 80px !important;
            max-width: 80px !important;
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
