import React, { useState } from 'react';
import PanelCrews from './PanelCrews';
import FilterBar from './FilterBar';

import { Layout, Menu, Breadcrumb, List } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { LeftBar } from '../../../styles/styles';
import Table from '../../../components/TableResizable/Table';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';

import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../styles/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import oval from '../../../img/Oval.svg';
const { Content, Sider } = Layout;

const Crews = () => {
  const history = useHistory();
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
    },
    {
      key: '2',
      name: 'test',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  return (
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
            <Breadcrumb.Item>Экипажи</Breadcrumb.Item>
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
                <JobTitle>Экипажи</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                <StyledButton backgroundColor="#008556" onClick={() => alert('click')}>
                  Создать новое
                </StyledButton>
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex' }}>
              <StyledCrewsBlock>
                <JobTitle style={{ fontSize: '19px', margin: '0' }}>ЭКИПАЖИ</JobTitle>
                <List>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                  <StyledListItem>
                    <img src={oval} alt="" />
                    <span>Кузьмин Виталий</span>
                  </StyledListItem>
                </List>
              </StyledCrewsBlock>
              <div style={{ display: 'flex', width: ' 100%', overflowX: 'hidden ' }}>
                <PanelCrews style={{ flex: '0 1 auto' }} />
              </div>
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
          .layout-breadcrumb a, .layout-breadcrumb   span {
            color: #8AA1C1 !important;
          }
         
         
        `}
      </style>
    </Layout>
  );
};

const StyledCrewsBlock = styled.div`
  border-radius: 8px;
  width: 330px;
  margin-right: 15px;
  border: 1px solid #d3dff0;
  padding: 15px;
`;
const StyledListItem = styled(List.Item)`
  display: flex;
  justify-content: flex-start;
  span {
    margin-left: 20px;
  }
`;

export default Crews;
