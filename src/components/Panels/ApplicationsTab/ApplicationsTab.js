import React from 'react';
import ApplicationSearch from './ApplicationSearch';
import Table from '../../../components/TableResizable/Table';

const ApplicationsTab = () => {
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
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 20%', margin: '1vw 1vw 1vw 0' }}>
        <ApplicationSearch />
      </div>
      <div style={{ flex: '1 0 50%', margin: '1vw 0 1vw 1vw' }}>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ApplicationsTab;
