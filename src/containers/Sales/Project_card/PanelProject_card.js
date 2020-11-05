import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { StyledButton } from '../../../components/Styles/DesignList/styles';
import {Link} from "react-router-dom";
import icon_pen from "../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg";

const initColumnsForPopup = [
  {
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
    isShowed: true
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 100,
    isShowed: true
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    width: 100,
    isShowed: true
  },
  {
    title: 'Формат',
    dataIndex: 'format',
    width: 100,
    isShowed: true
  },
  {
    title: 'Сторона',
    dataIndex: 'side',
    width: 100,
    isShowed: false
  },
  {
    title: 'Дата создания',
    dataIndex: 'createDate',
    width: 100,
    isShowed: false
  },
  {
    title: 'Дата начала',
    dataIndex: 'startDate',
    width: 100,
    isShowed: false
  },
  {
    title: 'Дата окончания',
    dataIndex: 'expirationDate',
    width: 100,
    isShowed: false
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    width: 100,
    isShowed: false
  },
  {
    title: 'Продление брони',
    dataIndex: 'renewalOfReservation',
    width: 100,
    isShowed: false
  },
  {
    title: 'Брендирование',
    dataIndex: 'branding',
    width: 100,
    isShowed: true
  },
  {
    title: 'Освещение',
    dataIndex: 'lighting',
    width: 100,
    isShowed: false
  },
  {
    title: 'Пакет',
    dataIndex: 'package',
    width: 100,
    isShowed: false
  },
  {
    title: 'Дизайн',
    dataIndex: 'design',
    width: 100,
    isShowed: false
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/locations/location/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  }
];
const initColumnsTable = [
  {
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
    isShowed: true
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 100,
    isShowed: true
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    width: 100,
    isShowed: true
  },
  {
    title: 'Формат',
    dataIndex: 'format',
    width: 100,
    isShowed: true
  },
  {
    title: 'Брендирование',
    dataIndex: 'branding',
    width: 100,
    isShowed: true
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/locations/location/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  }
];
const data = [
  {
    code: '#2020050301323',
    city: 'Алматы',
    address: 'Достык, 25',
    format: 'Сениор',
    side: 'Остановка',
    createDate: '29.03.20',
    startDate: '30.05.20',
    expirationDate: '30.05.20',
    status: 'Да',
    renewalOfReservation: 'stub data',
    branding: 'stub data',
    lighting: 'stub data',
    package: 'stub data',
    design: 'stub data'
  },
  {
    code: '#2020050301323',
    city: 'Алматы',
    address: 'Достык, 25',
    format: 'Сениор',
    side: 'Остановка',
    createDate: '29.03.20',
    startDate: '30.05.20',
    expirationDate: '30.05.20',
    status: 'Да',
    renewalOfReservation: 'stub data',
    branding: 'stub data',
    lighting: 'stub data',
    package: 'stub data',
    design: 'stub data'
  },
  {
    code: '#2020050301323',
    city: 'Алматы',
    address: 'Достык, 25',
    format: 'Сениор',
    side: 'Остановка',
    createDate: '29.03.20',
    startDate: '30.05.20',
    expirationDate: '30.05.20',
    status: 'Да',
    renewalOfReservation: 'stub data',
    branding: 'stub data',
    lighting: 'stub data',
    package: 'stub data',
    design: 'stub data'
  },
  {
    code: '#2020050301323',
    city: 'Алматы',
    address: 'Достык, 25',
    format: 'Сениор',
    side: 'Остановка',
    createDate: '29.03.20',
    startDate: '30.05.20',
    expirationDate: '30.05.20',
    status: 'Да',
    renewalOfReservation: 'stub data',
    branding: 'stub data',
    lighting: 'stub data',
    package: 'stub data',
    design: 'stub data'
  }
];

const PanelDesign = (props) => {
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

  const changeColumns = (dataIndex) => {
    let localColumnsForPopup = columnsForPopup.map((col, index) => {
      if(col.dataIndex  && col.dataIndex === dataIndex) {
        col.isShowed = !col.isShowed;

        return col
      }
      return col
    })

    setColumnsForPopup(localColumnsForPopup);

    const newColumnTables = localColumnsForPopup.filter(item => {
      if(item.isShowed) {
        return item
      }
      if(item.dataIndex === 'btn-remove') {
        return item
      }
    });

    setColumnsTable(newColumnTables);
  };

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columnsTable}
          data={data}
          select={true}
          title={'Забронированные стороны'}
          columnsForPopup={columnsForPopup}
          changeColumns={changeColumns}
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
