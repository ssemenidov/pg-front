import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';

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
      title: 'Сектор деятельности',
      dataIndex: 'sector',
    },
    {
      title: 'Ответственный менеджер',
      dataIndex: 'manager',
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
      sector: 'Безалкогольные напитки',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 2,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 3,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      manager: 'Иванов Иван Иванович',
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </>
  );
};

export default PanelDesign;
