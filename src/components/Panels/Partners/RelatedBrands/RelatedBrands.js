import React, { useEffect } from 'react';

import Table from '../../../Tablea';

const RelatedBrands = () => {
  // const columns = React.useMemo(() => makeColumns, []);
  // const data = React.useMemo(() => makeData, []);

  // return (
  //   <>
  //     <Table columns={columns} data={data} />
  //   </>
  // );
  const columns = [
    {
      title: 'Код',
      dataIndex: 'col1',

      width: 50,
    },
    {
      title: 'Название',
      dataIndex: 'col2',

      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'col3',

      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'col4',

      width: 100,
    },
    {
      title: 'Привязано',
      dataIndex: 'col5',

      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'Производство напитков',
      col5: '29.05.2020',
    },
    {
      key: 2,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'Производство напитков',
      col5: '29.05.2020',
    },
    {
      key: 3,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'Производство напитков',
      col5: '29.05.2020',
    },
    {
      key: 4,
      col1: '2020053012',
      col2: 'Летняя акция',
      col3: 'CocaCola',
      col4: 'Производство напитков',
      col5: '29.05.2020',
    },
  ];

  return <Table columns={columns} data={data} select={true} notheader={true} />;
};

export default RelatedBrands;
