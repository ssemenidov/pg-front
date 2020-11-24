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
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
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
    title: 'Сторона',
    dataIndex: 'side',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата создания',
    dataIndex: 'createDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата начала',
    dataIndex: 'startDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата окончания',
    dataIndex: 'expirationDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Продление брони',
    dataIndex: 'renewalOfReservation',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Брендирование',
    dataIndex: 'branding',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Освещение',
    dataIndex: 'lighting',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Пакет',
    dataIndex: 'package',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дизайн',
    dataIndex: 'design',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/locations/location/${record.key}` , state: { dateFrom: record, dateTo: record }    }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  }
];


const PanelDesign = (props) => {
  // const [columnsForPopup, props.setColumnsForPopup] = useState(props.columns);
  // const [columnsTable, props.setColumnsTable] = useState(props.columns);
  
  // props.setColumnsTable(props.columns)
  console.log('[columnsTable]', props.columns)

  let colForReq = props.col;

  // props.setColumnsTable(props.columns)
  // props.setColumnsForPopup(props.columns)
  // useEffect(() => {
  //   alert(1)
  //   props.setColumnsTable(props.columns)
  //   props.setColumnsForPopup(props.columns)
  // }, props.columns)
  
  const changeColumns = (dataIndex) => {
    let localColumnsForPopup = props.columns.map((col, index) => {
      if(col.dataIndex  && col.dataIndex === dataIndex) {
        col.isShowed = !col.isShowed;

        return col
      }
      return col
    })

    props.setColumnsForPopup(localColumnsForPopup);

    const newColumnTables = props.columns.filter(item => {
      if(item.isShowed) {
        return item
      }
      if(item.dataIndex === 'btn-remove') {
        return item
      }
    });

    props.setColumnsTable(newColumnTables);
  };

  const headerTableBtns = [
    {
      'title': 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ'
    },
    {
      'title': 'ПРИЛОЖЕНИЯ'
    }
  ]

  const [curTable, setCurTable] = useState(<Table 
    style={{ width: '100%' }} 
    columns={props.columns} 
    data={props.data} 
    select={true} 
    columnsForPopup={props.columns} 
    changeColumns={changeColumns} 
    chooseTableBtns={headerTableBtns}
    choosedBlock={props.choosedBlock}
    setBlock={props.setBlock}
  />);

  useEffect(() => {
    setCurTable(<Table 
      style={{ width: '100%' }} 
      columns={props.columns} 
      data={props.data} 
      select={true} 
      columnsForPopup={props.columns} 
      changeColumns={changeColumns} 
      chooseTableBtns={headerTableBtns}
      choosedBlock={props.choosedBlock}
      setBlock={props.setBlock}
    />)
  }, props.columns)

  return (
    <>
      <div className="outdoor-table-bar">
      {curTable}
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
