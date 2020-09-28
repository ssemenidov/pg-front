import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, DatePicker, Select, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LeftBar } from '../../../styles/styles';
import Table from '../../../components/TableResizable/Table';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import collapseUpIcon from '../../../img/input/collapse-up.svg';
import collapseDownIcon from '../../../img/input/collapse-down.svg';
import cityIcon from '../../../img/input/input-city.svg';
import districtIcon from '../../../img/input/input-district.svg';
import sideIcon from '../../../img/input/side-construction.svg';
import typeIcon from '../../../img/input/type-construction.svg';
import formatIcon from '../../../img/input/format-construction.svg';

const { Content, Sider } = Layout;

const Crews = () => {
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
                <span>Поиск по адресу</span>
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
                  onClick={() => this.setState({ parametersTab: !parametersTab })}
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
            <Breadcrumb.Item>Экипажи</Breadcrumb.Item>
          </Breadcrumb>
          <div></div>
          <StyledContent>
            <StyledCrewsBlock>
              <h2 style={{ fontSize: '24px', margin: '10px' }}>Экипажи</h2>
            </StyledCrewsBlock>
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
            margin: 0 0 20px 0;
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
          .ant-select {
            width: 100%;
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
`;

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;

const StyledContent = styled(Content)`
  display: flex;
`;

const StyledCrewsBlock = styled.div`
  border-radius: 8px;
  width: 330px;
  margin-right: 30px;
  border: 1px solid #d3dff0;
`;

export default Crews;
