import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LeftBar } from '../../../styles/styles';
import FilterBar from './OutdoorFurnitureList/FilterBar/FilterBar';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import HeaderList from './HeaderList';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import {
  getOutdoorFurnitureData,
  getOutdoorFurnitureFiltered,
  getCities,
  getDistricts,
  getPostalCodes,
} from '../../../store/actions/actions';
//import Table from '../../../components/Table';
import { Resizable } from 'react-resizable';

const { Header, Content, Sider } = Layout;

export default function OutdoorFurniture() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutdoorFurnitureData());
    dispatch(getCities());
    dispatch(getDistricts());
    dispatch(getPostalCodes());
  }, [dispatch]);
  const rowKeys = useSelector((state) => state.table.rowKeys);
  const rows = useSelector((state) => state.table.outdoorFurnitureTableData);
  const [fastSearch, setFastSearch] = useState();
  const outdoorFurnitureColums = [
    'Код',
    'Город',
    'Почтовый индекс',
    'Маркетинговый адрес',
    'Юридический адрес',
    'Формат',
    'Координаты',
    'Горит',
  ];

  const [collapsed, setCollapsed] = useState(false);

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

  const [state, setState] = useState({
    columns: [
      {
        title: 'Date',
        dataIndex: 'date',
        width: 200,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: 100,
        //sorter: (a, b) => a.amount - b.amount,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 100,
      },
      {
        title: 'Note',
        dataIndex: 'note',
        width: 100,
      },
      {
        title: 'Action',
        key: 'action',
        render: () => <a>Delete</a>,
      },
    ],
  });

  const components = {
    header: {
      cell: ResizableTitle,
    },
  };

  const data = [
    {
      key: 0,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 1,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
    },
  ];

  const handleResize = (index) => (e, { size }) => {
    setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  const [columns, setColumns] = useState(
    state.columns.map((col, index) => {
      return {
        ...col,
        onHeaderCell: (column) => ({
          width: column.width,
          onResize: handleResize(index),
        }),
      };
    }),
  );

  return (
    // <div className="outdoor-furniture">
    //   <LeftBar>
    //     <SearchBtn />
    //   </LeftBar>
    //   <FilterBar />
    //   <div className="outdoor-table-bar">
    //     <HeaderList />
    //     <Table
    //       linkProps={'/base/construction/'}
    //       columns={outdoorFurnitureColums}
    //       rows={rows}
    //       rowKeys={rowKeys}
    //       handleFastSearch={() => {
    //         dispatch(getOutdoorFurnitureFiltered(fastSearch));
    //       }}
    //       handleChangeFastSearch={(e) => setFastSearch(e.target.value)}
    //     />
    //   </div>
    //   <style>
    //     {`
    //       .outdoor-furniture {
    //         display: flex;
    //         height: 100%;
    //       }
    //       .outdoor-table-bar {
    //         padding: 2% 3%;
    //         width: 70vw;
    //       }
    //     `}
    //   </style>
    // </div>
    <Layout>
      <Layout>
        <Sider className="layout-sider">
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </Sider>
        {collapsed ? <FilterBar /> : null}
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
            <HeaderList />
            <Table bordered components={components} columns={columns} dataSource={data} />
            {/* <Table
              linkProps={'/base/construction/'}
              columns={outdoorFurnitureColums}
              rows={rows}
              rowKeys={rowKeys}
              handleFastSearch={() => {
                dispatch(getOutdoorFurnitureFiltered(fastSearch));
              }}
              handleChangeFastSearch={(e) => setFastSearch(e.target.value)}
            /> */}
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
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
      </style>
    </Layout>
  );
}
