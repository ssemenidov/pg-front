import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { StyledButton } from '../../../styles/styles';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'код проекта',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Рекламная сторона',
      dataIndex: 'side',
      width: 100,
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
      title: 'Период',
      dataIndex: 'period',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: 'Брендинг',
      dataIndex: 'branding',
      width: 100,
    },
  ];
  const data = [
    {
      key: '1',
      code: '#123123123',
      format: 'Сениор',
      text: 'остановка',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      branding: 'Да',
    },
    {
      key: '2',
      code: '#123123123',
      format: 'Сениор',
      text: 'остановка',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      branding: 'Да',
    },
    {
      key: '3',
      code: '#123123123',
      format: 'Сениор',
      text: 'остановка',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      branding: 'Да',
    },
    {
      key: '4',
      code: '#123123123',
      format: 'Сениор',
      text: 'остановка',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      branding: 'Да',
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data}
          select={true}
          title={'Забронированные стороны'}
        />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
            overflow-x: hidden;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
