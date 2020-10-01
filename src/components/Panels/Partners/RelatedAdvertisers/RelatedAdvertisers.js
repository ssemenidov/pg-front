import React from 'react';

import Table from '../../../Tablea';

const RelatedAdvertisers = (props) => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'col1',
      key: 'name',
      width: 50,
    },
    {
      title: 'Рекламодатель',
      dataIndex: 'col2',
      key: 'name',
      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'col3',
      key: 'name',
      width: 100,
    },
    {
      title: 'Привязано',
      dataIndex: 'col4',
      key: 'name',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      col1: '2020053012',
      col2: 'TOO Рекламодатель',
      col3: 'Производство напитков',
      col4: '29.05.2020',
    },
    {
      key: 2,
      col1: '2020053012',
      col2: 'TOO Рекламодатель',
      col3: 'Производство напитков',
      col4: '29.05.2020',
    },
    {
      key: 3,
      col1: '2020053012',
      col2: 'TOO Рекламодатель',
      col3: 'Производство напитков',
      col4: '29.05.2020',
    },
    {
      key: 4,
      col1: '2020053012',
      col2: 'TOO Рекламодатель',
      col3: 'Производство напитков',
      col4: '29.05.2020',
    },
    {
      key: 5,
      col1: '2020053012',
      col2: 'TOO Рекламодатель',
      col3: 'Производство напитков',
      col4: '29.05.2020',
    },
  ];

  return (
    <>
      <Table columns={columns} data={data} select={true} notheader={true} />
    </>
  );
};

export default RelatedAdvertisers;
