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
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Дата начала',
      dataIndex: 'date',
      width: 90,
    },
    {
      title: 'Рекламодатель',
      dataIndex: 'advert',
    },
    {
      title: 'Рекламное агенство',
      dataIndex: 'advert_agency',
    },

    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },

    {
      title: 'Сумма без НДС',
      dataIndex: 'sum',
    },
    {
      title: 'Общая сумма',
      dataIndex: 'all_sum',
    },
  ];
  const data = [
    {
      key: 1,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 2,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 3,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 4,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
    },
    {
      key: 5,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sum: '123 356 тг.',
      all_sum: '223 356 тг.',
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
