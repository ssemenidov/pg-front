import React, { useState, useEffect } from 'react';

import Table from '../../../components/Tablea';
import { StyledButton } from '../../../styles/styles';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Клиент',
      dataIndex: 'client',
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: 'Всего сторон',
      dataIndex: 'allsides',
    },
    {
      title: 'Проданных сторон',
      dataIndex: 'salesides',
    },

    {
      title: 'Распред. сторон',
      dataIndex: 'spreadsides',
    },

    {
      title: 'Не распред. сторон',
      dataIndex: 'nspreadsides',
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 2,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 3,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 4,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
    {
      key: 5,
      code: '#2020050301323',
      name: 'Летняя акция',
      client: 'ИП Агество',
      brand: 'CocaCola',
      city: 'Алматы',

      allsides: '30',
      salesides: '10',
      spreadsides: '10',
      nspreadsides: '2',
    },
  ];
  const outdoorFurnitureColums = [
    'Код',
    'Название',
    'Клиент',
    'Бренд',
    'Город',
    'Всего сторон',
    'Проданных сторон',
    'Распред. сторон',
    'Не распред. сторон',
  ];
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
      </div>
      <style>
        {`.outdoor-table-bar {
           width:100%;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
