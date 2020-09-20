import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Город',
      dataIndex: 'city',
    },
    {
      title: 'Формат',
      dataIndex: 'format',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
    },
    {
      title: 'Монтаж',
      dataIndex: 'install',
    },
    {
      title: 'Фотоотчет',
      dataIndex: 'photo',
    },
    {
      title: 'Доп. Фотоотчет',
      dataIndex: 'addphoto',
    },
    {
      title: 'Смета',
      dataIndex: 'estimate',
    },
    {
      title: 'Приложение',
      dataIndex: 'app',
    },
    {
      title: 'Счет',
      dataIndex: 'invoice',
    },
    {
      title: 'АВР',
      dataIndex: 'avr',
      width: 60,
    },
  ];
  const data = [
    {
      key: 1,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 2,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 3,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 4,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
    {
      key: 5,
      city: 'Алматы',
      format: 'Скроллерная А3 FACES',
      address: 'Достык 50',
      install: 'Да',
      photo: 'Да',
      addphoto: 'Да',
      estimate: '123 356 тг.',
      app: '223 356 тг.',
      invoice: '223 356 тг.',
      avr: 'Да',
    },
  ];
  const outdoorFurnitureColums = [
    'Город',
    'Формат',
    'Бренд',
    'Адрес',
    'Монтаж',
    'Фотоотчет',
    'Смета',
    'Приложение',
    'Счет',
    'АВР',
  ];
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} select={false} />
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
