import React from 'react';
//import Table from '../../../Table/Table';
import Table from '../../../TableResizable/Table';
import makeColumns from './DataTable/columns';
import makeData from './DataTable/data';

const RelatedProjects = () => {
  // const columns = React.useMemo(() => makeColumns, []);
  // const data = React.useMemo(() => makeData, []);

  const columns = [
    {
      title: 'Код',
      dataIndex: 'col1',
      key: 'name',
      width: 50,
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
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
    {
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'ТОО Coca Cola',
      col5: 'да',
    },
  ];

  return (
    <>
      <Table columns={columns} data={data} />
      {/* <Table columns={columns} data={data} /> */}
    </>
  );
};
export default RelatedProjects;
