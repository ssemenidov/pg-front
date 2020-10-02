import React from 'react';
import ApplicationSearch from './ApplicationSearch';
import Table from '../../../components/Tablea';

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
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <ApplicationSearch />
      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <Table columns={columns} data={data} notheader={true} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;
