import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea/Tablea';

const PanelDesign = ({ tableData }) => {
  console.log(tableData)
  const [columns, setColumns] = useState([
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Период',
      dataIndex: 'period',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },

    {
      title: 'Аренда',
      dataIndex: 'renta',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },

    {
      title: 'Печать',
      dataIndex: 'print',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Монтаж',
      dataIndex: 'install',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Доп Расходы',
      dataIndex: 'addexpense',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Общая Сумма',
      dataIndex: 'amount',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
  ])


  const changeColumns = (dataIndex) => {
    let newCols = columns.map(item => {
      if(item.dataIndex === dataIndex) {
        item.isShowed = !item.isShowed
      }
      return item;
    })
    setColumns(newCols);
  }

  console.log('[tableData]', tableData)

  return (
    <>
      <div className="outdoor-table-bar">
        <Table title="Адресная программа" changeColumns={changeColumns} columns={columns} data={tableData} select={false} />
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
