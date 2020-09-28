import React, { Component } from 'react';
import { Resizable } from 'react-resizable';
import makeColumns from './DataTable/columns';
import makeData from './DataTable/data';
import Table from '../../../TableResizable/Table';
import Tablea from '../../../../components/Tablea';

// const columns = React.useMemo(() => makeColumns, []);
// const data = React.useMemo(() => makeData, []);

export default function ConstructionHist() {
  //return <Table columns={columns} data={data} />;
  const columns = [
    {
      id: 1,
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
  ];

  const data = [
    {
      key: 1,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
    },
    {
      key: 2,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
    },
  ];
  return <Table columns={columns} data={data} />;
}
