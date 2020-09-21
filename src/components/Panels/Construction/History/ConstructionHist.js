import React, { Component } from 'react';
import { Resizable } from 'react-resizable';
import makeColumns from './DataTable/columns';
import makeData from './DataTable/data';
import Table from '../../../Table/Table';
import Tablea from '../../../../components/Tablea';

// const columns = React.useMemo(() => makeColumns, []);
// const data = React.useMemo(() => makeData, []);

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

export default class ConstructionHist extends Component {
  //return <Table columns={columns} data={data} />;
  state = {
    columns: [
      // {
      //   id: 1,
      //   title: 'Код',
      //   dataIndex: 'code',
      //   width: 200,
      // },
      // {
      //   title: 'Формат',
      //   dataIndex: 'format',
      //   width: 100,
      // },
      // {
      //   title: 'Город',
      //   dataIndex: 'city',
      //   width: 100,
      // },
    ],
  };

  // data = [
  //   {
  //     key: 1,
  //     code: '#123123123',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //   },
  //   {
  //     key: 2,
  //     code: '#123123123',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //   },
  // ];

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
      <>
        <Table
          className="custom-table"
          pagination={false}
          scroll={{ x: 1000, y: 500 }}
          rowSelection={{
            ...this.rowSelection,
          }}
          components={this.components}
          columns={columns}
          dataSource={this.data}
        />
        <style>{`
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
      `}</style>
      </>
    );
  }
}
