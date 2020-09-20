import React, { useState } from 'react';
import { Layout, Menu, Table, DatePicker, Checkbox, Select, Button, Input } from 'antd';
import styled from 'styled-components';

import plusIcon from '../img/header-bar/plus-icon.svg';
import minusIcon from '../img/header-bar/minus-icon.svg';
import arrowLeft from '../img/header-bar/arrow-left.svg';
import arrowRight from '../img/header-bar/arrow-right.svg';
import calendarIcon from '../img/header-bar/calendar.svg';
import searchInputIcon from '../img/header-bar/search-icon.svg';
import printerIcon from '../img/header-bar/printer.svg';
import exportIcon from '../img/header-bar/export.svg';
import settingsIcon from '../img/header-bar/settings.svg';
import collapseUpIcon from '../img/input/collapse-up.svg';
import collapseDownIcon from '../img/input/collapse-down.svg';
const { Content, Sider } = Layout;
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
const Tablea = (props) => {
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <div className="header-bar">
        {props.title ? (
          <h6>{props.title}</h6>
        ) : (
          <div>
            <div>
              <Button className="header-btn">
                <img src={plusIcon} />
              </Button>
              <Button className="header-btn">
                <img src={minusIcon} />
              </Button>
            </div>
            <div>
              <Button style={{ marginLeft: '20px' }} className="header-btn">
                <img src={arrowLeft} />
              </Button>
              <Button style={{ margin: '0', width: '100px' }} className="header-btn header-date-btn">
                <span>Неделя</span>
                <img src={collapseDownIcon} />
              </Button>
              <Button style={{ width: '220px' }} className="header-btn header-date-btn">
                <img src={calendarIcon} />
                <span>2 марта - 29 марта 2020</span>
              </Button>
              <Button className="header-btn">
                <img src={arrowRight} />
              </Button>
            </div>
          </div>
        )}
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
          <Button style={{ width: '180px', display: 'flex', justifyContent: 'space-between' }} className="header-btn">
            <img src={exportIcon} />
            <span>Экспорт</span>
          </Button>
          <Button className="header-btn">
            <img src={settingsIcon} />
          </Button>
        </div>
      </div>
      <Content>
        <StyledTable
          rowSelection={
            props.select && {
              type: selectionType,
              ...rowSelection,
            }
          }
          columns={props.columns}
          dataSource={props.data}
          pagination={{ pageSize: 4 }}
          scroll={{ y: 500 }}
        />
      </Content>
      <style>
        {`.header-bar {
                display: flex;
                background: #E7EEF8;
                margin-bottom: 10px;
                border-radius: 4px;
                border: 1px solid #D3DFF0;
                height: 45px;
                padding: 5px;
                justify-content: space-between;
                align-items:flex-end;
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
                background: #FF5800;
                display: flex;
                align-items: center;
                padding: 15px 30px;
              }
              .header-page-btn span {
                color: #fff !important;
                font-weight: 600;
              }
              `}
      </style>
    </div>
  );
};

export default Tablea;
const StyledTable = styled(Table)`
  th,
  td {
    color: #1a1a1a !important;
    font-weight: 600 !important;
  }

  .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }

  .ant-table-row td:not(:first-child) {
    padding: 5px !important;
  }

  th {
    background: transparent !important;
  }

  .ant-table-body tr td:not(:first-child) {
    background: #f5f7fa !important;
  }
`;
