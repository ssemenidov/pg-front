import React, { Component } from 'react';
import { Table } from 'antd';
import styled from 'styled-components';
import { Resizable } from 'react-resizable';

export default class AdvertisingParties extends Component {

  state = {
    columns: this.props.columns
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

  data = this.props.data;

  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
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
      <StyledTable
        pagination={true}
        rowSelection={{
          ...this.rowSelection,
        }}
        components={this.components}
        columns={columns}
        dataSource={this.data}
      />
    );
  }
}

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

const StyledTable = styled(Table)`
  width: 100%;

  .ant-table-thead > tr > th {
    background: #fff;
  }

  .ant-table table {
    border-collapse: separate !important;
  }

  & .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }

  & .ant-table-thead > tr > th {
    background: transparent;
    color: #1a1a1a;
    font-weight: 600;
  }

  & .ant-table-thead > tr > th:not(:last-child) > span {
    background: #d3dff0;
    width: 1px;
  }

  & .ant-table-tbody > tr.ant-table-row:hover > td {
    background: #d3dff0;
  }

  & .ant-table-tbody tr:nth-child(even) {
    background: #f5f7fa !important;
  }

  & .ant-table-tbody tr:nth-child(odd) {
    background: #fff;
  }

  svg {
    vertical-align: unset;
  }
`;
