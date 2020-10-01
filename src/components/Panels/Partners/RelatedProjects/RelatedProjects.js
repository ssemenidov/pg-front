import React from 'react';
//import Table from '../../../Table/Table';
import Table from '../../../Tablea';

const RelatedProjects = () => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'col1',
      key: 'name',
      width: 100,
    },
    {
      title: 'Название',
      dataIndex: 'col2',
      key: 'name',
      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'col3',
      key: 'name',
      width: 100,
    },
    {
      title: 'Клиент',
      dataIndex: 'col4',
      key: 'name',
      width: 100,
    },
    {
      title: 'Агентская комиссия',
      dataIndex: 'col5',
      key: 'name',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      key: 2,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      key: 3,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      key: 4,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
  ];

  return <Table columns={columns} data={data} select={true} notheader={true} />;
};
export default RelatedProjects;
