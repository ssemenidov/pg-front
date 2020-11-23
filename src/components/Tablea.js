import React from 'react';
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Menu, Table, DatePicker, Checkbox, Select, Button, Input, Dropdown } from 'antd';

import plusIcon from '../img/header-bar/plus-icon.svg';
import attachIcon from '../img/header-bar/attach.svg';
import minusIcon from '../img/header-bar/minus-icon.svg';
import searchInputIcon from '../img/header-bar/search-icon.svg';
import printerIcon from '../img/header-bar/printer.svg';
import exportIcon from '../img/header-bar/export.svg';
import settingsIcon from '../img/header-bar/settings.svg';

const { Content, Sider } = Layout;

let settingmenu = (
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

class Tablea extends React.Component {
  state = {
    selectionType: 'checkbox',
    datetype: 'date',
    columns: this.props.columns,
    // columns: this.props.columns.filter((col, index) => {
    //   return (
    //     index !== this.props.columns.indexOf(this.props.columns[this.props.columns.length - 1]) && col.isShow !== false
    //   )
    // }),
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
    const { onRow } = this.props;
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));

    const changeColumns = (dataIndex) => {
      let newCols = this.props.columns.map(item => {
        if(item.dataIndex === dataIndex) {
          item.isShow = !item.isShow
        }
        return item;
      })
      this.setState({
        columns: newCols.filter((col, index) => {
          return (
            index !== this.props.columns.indexOf(this.props.columns[this.props.columns.length - 1]) && col.isShow !== false
          )
        })
      });
    }

    const handleMenuClick = () => {};
    console.log('[this.props.enableChooseQuantityColumn]', this.props.enableChooseQuantityColumn)
    if (this.props.enableChooseQuantityColumn) {
      settingmenu = (
        <Menu onClick={handleMenuClick}>
          {this.props.columns
            .map((col) => {
                  console.log(col)
                  return (
                  <Menu.Item key={col.dataIndex}>
                    <Checkbox
                      checked={col.isShow}
                      onClick={() => changeColumns(col.dataIndex)}
                    >
                      {col.title}
                    </Checkbox>
                  </Menu.Item>
                )})}
        </Menu>
      );
    }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.setConstructionsIdSet(selectedRowKeys);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
      selectedRowKeys: this.props.constructionsIdSet,
    };

    return (
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        {!this.props.notheader && (
          <div className="header-bar">
            {this.props.enableChoosePeriod ? (
              <React.Fragment>
                {this.props.title ? (
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%', paddingLeft: 12 }}>
                    <img src={attachIcon} alt="" />
                    <span style={{ minWidth: 'max-content', fontWeight: '600', marginLeft: '12px', fontSize: '16px' }}>
                      {this.props.title}
                    </span>
                  </div>
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
                  </div>
                )}
              </React.Fragment>
            ) : (
              <div></div>
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

              {this.props.enableChooseQuantityColumn && (
                <Dropdown
                  overlay={settingmenu}
                  className="header-btn"
                  trigger={['click']}
                  placement="bottomRight">
                  <Button style={{ marginLeft: '5px' }} className="header-btn">
                    <img src={settingsIcon} />
                  </Button>
                </Dropdown>
              )}
            </div>
          </div>
        )}
        <Content>
          <StyledTable
            onRow={onRow}
            loading={this.props.loading}
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
            scroll={{ y: 500 }}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              placement: 'top',
              pageSizeOptions: ['25', '50', '100', '1000'],
              total: this.props.data.length,
            }}
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

Tablea.propTypes = {
  enableChoosePeriod: PropTypes.bool,
  enableChooseQuantityColumn: PropTypes.bool,
  columns: PropTypes.array,
  onRow: PropTypes.func,
};
Tablea.defaultProps = {
  enableChoosePeriod: true,
  enableChooseQuantityColumn: true,
  columns: [],
  onRow: () => undefined,
};

export default Tablea;
const StyledTable = styled(Table)`
  margin-bottom: 190px;
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

  .ant-table-body tr:nth-child(odd) {
    background: #f5f7fa !important;
  }

  /* .ant-table-body tr td:not(:first-child) {
    background: #f5f7fa !important;
  } */
`;
