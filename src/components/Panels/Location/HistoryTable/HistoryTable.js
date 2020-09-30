import React from 'react';
import Table from '../../../TableResizable/Table';

export const HistoryTable = () => {
  const columns = [
    {
      id: 1,
      title: 'Код',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      width: 100,
    },

    {
      title: 'Ответственный',
      dataIndex: 'manager',
      width: 300,
    },
    {
      title: 'Тип манипуляции',
      dataIndex: 'type',
      width: 250,
    },
    {
      title: 'Информация до',
      dataIndex: 'before',
      width: 200,
    },
    {
      title: 'Информация после',
      dataIndex: 'after',
      width: 200,
    },
  ];

  const data = [
    {
      key: 1,
      code: '#123123123',
      date: '25.05.2020',
      manager: 'Тупак Шакур',
      type: 'Смена владельца',
      before: 'Пенелопа Круз',
      after: 'Пенелопа Круз',
    },
    {
      key: 2,
      code: '#123123123',
      date: '25.05.2020',
      manager: 'Тупак Шакур',
      type: 'Смена владельца',
      before: 'Пенелопа Круз',
      after: 'Пенелопа Круз',
    },
    {
      key: 3,
      code: '#123123123',
      date: '25.05.2020',
      manager: 'Тупак Шакур',
      type: 'Смена владельца',
      before: 'Пенелопа Круз',
      after: 'Пенелопа Круз',
    },
    {
      key: 4,
      code: '#123123123',
      date: '25.05.2020',
      manager: 'Тупак Шакур',
      type: 'Смена владельца',
      before: 'Пенелопа Круз',
      after: 'Пенелопа Круз',
    },
  ];
  return <Table columns={columns} data={data} />;
};

export default HistoryTable;
