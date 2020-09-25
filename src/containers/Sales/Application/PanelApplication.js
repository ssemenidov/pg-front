import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Период',
      dataIndex: 'period',
      width: 100,
    },

    {
      title: 'Аренда',
      dataIndex: 'renta',
      width: 100,
    },

    {
      title: 'Печать',
      dataIndex: 'print',
      width: 100,
    },
    {
      title: 'Монтаж',
      dataIndex: 'install',
      width: 100,
    },
    {
      title: 'Доп Расходы',
      dataIndex: 'addexpense',
      width: 100,
    },
    {
      title: 'Общая Сумма',
      dataIndex: 'amount',
      width: 100,
    },
  ];
  const data = [
    {
      key: 1,
      format: 'Сениор',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      renta: '99 888 тг.',
      print: '99 888 тг.',
      install: '99 888 тг.',
      addexpense: '99 888 тг.',
      amount: '99 888 тг.',
    },
    {
      key: 2,
      format: 'Сениор',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      renta: '99 888 тг.',
      print: '99 888 тг.',
      install: '99 888 тг.',
      addexpense: '99 888 тг.',
      amount: '99 888 тг.',
    },
    {
      key: 3,
      format: 'Сениор',
      city: 'Алматы',
      period: '29.03.20 - 30.05.20',
      address: 'Достык, 25',
      renta: '99 888 тг.',
      print: '99 888 тг.',
      install: '99 888 тг.',
      addexpense: '99 888 тг.',
      amount: '99 888 тг.',
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={false} />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
            margin-left:auto;
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
