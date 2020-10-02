import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код конструкции',
      dataIndex: 'code',

      width: 130,
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
    {
      title: 'Адрес',
      dataIndex: 'adress',
      width: 100,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: 'Дата начала ',
      dataIndex: 'date_start',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 2,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 3,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 4,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 5,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
  ];
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default PanelDesign;
