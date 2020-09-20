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
      title: 'Text',
      dataIndex: 'text',
    },
    {
      title: 'Формат',
      dataIndex: 'format',
    },
    {
      title: 'Город',
      dataIndex: 'city',
    },
    {
      title: 'Период',
      dataIndex: 'period',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
    },
    {
      title: 'Брендинг',
      dataIndex: 'branding',
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
        <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 65.5vw;
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
