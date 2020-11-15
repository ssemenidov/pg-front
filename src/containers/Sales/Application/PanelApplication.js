import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';

const PanelDesign = ({ tableData }) => {
  console.log(tableData)
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

  return (
    <>
      <div className="outdoor-table-bar">
        <Table title="Адресная программа" columns={columns} data={tableData} select={false} />
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
