import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Table, DatePicker, Checkbox, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Resizable } from 'react-resizable';
import { LeftBar } from '../../../styles/styles';
import PanelAdver from './PanelAdver';
import FilterBar from './FilterBar';
import advertisingIcon from '../../../img/sales/advertising-side-header.svg';
import tableFreeIcon from '../../../img/sales/table-free-icon.svg';
import tableSoldIcon from '../../../img/sales/table-sold-icon.svg';

import collapseUpIcon from '../../../img/input/collapse-up.svg';
import collapseDownIcon from '../../../img/input/collapse-down.svg';
import cityIcon from '../../../img/input/input-city.svg';
import districtIcon from '../../../img/input/input-district.svg';
import sideIcon from '../../../img/input/side-construction.svg';
import typeIcon from '../../../img/input/type-construction.svg';
import formatIcon from '../../../img/input/format-construction.svg';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import searchIcon from '../../../img/left-bar/search.svg';
import createProjectIcon from '../../../img/left-bar/create-project.svg';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import SearchBtn from '../../../components/LeftBar/SearchBtn';

const { Content, Sider } = Layout;

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};

export default class AdvertisingParties extends Component {
  state = {
    columns: [
      {
        title: 'Код',
        dataIndex: 'code',
        width: 200,
      },
      {
        title: 'Формат',
        dataIndex: 'format',
        width: 100,
      },
      {
        title: 'Город',
        dataIndex: 'city',
        width: 100,
      },
      {
        title: (
          <>
            <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>2 марта - 8 марта</strong>
            <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
          </>
        ),
        dataIndex: 'timeline1',
        key: 'timeline',
      },
      {
        title: (
          <>
            <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>9 марта - 15 марта</strong>
            <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
          </>
        ),
        dataIndex: 'timeline2',
        key: 'timeline',
      },
      {
        title: (
          <>
            <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>16 марта - 22 марта</strong>
            <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
          </>
        ),
        dataIndex: 'timeline3',
        key: 'timeline',
      },
    ],
    selectionType: 'checkbox',
    collapsed: true,
    reservationTab: true,
    cityTab: true,
    parametersTab: true,
    purposeTab: false,
  };

  components = {
    header: {
      cell: ResizableTitle,
    },
  };

  data = [
    {
      key: 1,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 2,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableSoldIcon} />,
      timeline2: <img src={tableSoldIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 3,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 4,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 5,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
  ];

  handleResize = (index) => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  onChange(date, dateString) {
    console.log(date, dateString);
  }

  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
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
                    this.setState({ collapsed: !this.state.collapsed });
                  }}
                />
                <CreateBtn text="Создать проект" />
              </LeftBar>
            </Menu>
          </Sider>
          {this.state.collapsed && <FilterBar />}
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
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
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
                    Справочник рекламных сторон
                  </h2>
                </div>
                <Button className="header-page-btn">
                  <span>Создать отчет</span>
                  <img src={collapseDownIcon} />
                </Button>
              </div>
              <PanelAdver style={{ flex: '0 1 auto' }} />
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
          .left-bar-list {
            padding: 10px 5px !important;
          }
          .left-bar-list li {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            height: 55px;
            align-items: center;
            justify-content: space-around;
            border-bottom: 1px solid #D3DFF0;
            margin-bottom: 15px;
          }
          .left-bar-list span {
            text-align: center;
            line-height: normal;
            margin: 10px 0;
            color: #003360 !important;
            font-size: 11px;
          }
          .ant-table-thead > tr > th {
            background: #fff;
          }
          .ant-table table {
            border-collapse: separate !important;
          }
          .custom-table .ant-table {
            border: 1px solid #D3DFF0 !important;
            border-radius: 8px;
          }
          .custom-table .ant-table-thead > tr > th {
            background: transparent;
            color: #1A1A1A;
            font-weight: 600;
          }
          .custom-table .ant-table-thead > tr > th > span {
            background: #D3DFF0;
            width: 1px;
          }
          .custom-table .ant-table-tbody > tr.ant-table-row:hover > td {
            background: #D3DFF0;
          }
          .custom-table .ant-table-tbody tr:nth-child(even) {
            background: #F5F7FA !important;
          }
          .custom-table .ant-table-tbody tr:nth-child(odd) {
            background: #FFF;
          }
          .filter-panel {
            width: 240px;
            background: #F5F7FA;
            border-right: 1px solid #d3dff0;
          }
          .filter-panel > div {
            display: flex;
            padding: 20px 15px;
            border-bottom: 1px solid #d3dff0;
          }
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
          .filter-panel-city {
            display: flex;
            flex-direction: column;
          }
          .ant-select ant-select-selection-item span {
            color: #656565 !important;
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
          .header-page-btn:hover span {
            color:#FF5800 !important;
          }
          .header-page-btn span {
            color: #fff  !important;
            font-weight: 600;
          }
          .ant-btn-primary:active, .ant-btn-primary:hover, .ant-btn-primary:focus {
            color: #FF5800 !important;
          }
        `}
        </style>
      </Layout>
    );
  }
}
