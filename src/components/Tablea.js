import React, { useState } from 'react';
import { Layout, Menu, Table, DatePicker, Checkbox, Select, Button, Input, Dropdown } from 'antd';
import styled from 'styled-components';
import { Resizable } from 'react-resizable';
import { browserHistory } from 'react-router';

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
const settingmenu = (
  <Menu>
    <Menu.Item>
      <Checkbox>1 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>2 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>3 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>4 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>5 menu item</Checkbox>
    </Menu.Item>
    <Menu.Item>
      <Checkbox>6 menu item</Checkbox>
    </Menu.Item>
  </Menu>
);

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

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {},
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    name: record.name,
  }),
};
class Tablea extends React.Component {
  state = {
    selectionType: 'checkbox',
    datetype: 'date',
    columns: this.props.columns,
  };
  components = {
    header: {
      cell: ResizableTitle,
    },
  };

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
  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {!this.props.notheader && (
          <div className="header-bar">
            {this.props.title ? (
              <h6>{this.props.title}</h6>
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
                <Select
                  defaultValue="Дата"
                  style={{ marginLeft: '20px' }}
                  onChange={(value) => {
                    console.log(value);
                    this.setState({ datetype: value });
                  }}>
                  <Select.Option value="date">Дата</Select.Option>
                  <Select.Option value="week">Неделя</Select.Option>
                  <Select.Option value="month">Месяц</Select.Option>
                  <Select.Option value="year">Год</Select.Option>
                </Select>
                <DatePicker.RangePicker picker={this.state.datetype} style={{ marginLeft: '5px' }} />
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
              <Button
                style={{ width: '180px', display: 'flex', justifyContent: 'space-between' }}
                className="header-btn">
                <img src={exportIcon} />
                <span>Экспорт</span>
              </Button>

              <Dropdown overlay={settingmenu} className="header-btn" trigger={['click']} placement="bottomRight">
                <Button style={{ marginLeft: '5px' }} className="header-btn">
                  <img src={settingsIcon} />
                </Button>
              </Dropdown>
            </div>
          </div>
        )}
        <Content>
          <StyledTable
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  {
                    this.props.history && this.props.history.push(this.props.link);
                  }
                },
              };
            }}
            rowSelection={
              this.props.select && {
                type: this.selectionType,
                ...rowSelection,
              }
            }
            bordered
            components={this.components}
            columns={columns}
            dataSource={this.props.data}
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
  }
}

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
