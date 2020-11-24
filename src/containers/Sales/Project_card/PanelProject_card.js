import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea/Tablea_func';
import { StyledButton } from '../../../components/Styles/DesignList/styles';
import {Link} from "react-router-dom";
import icon_pen from "../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg";


const initColumnsForPopup = [
  {
    title: 'Код стороны',
    dataIndex: 'reservation_code',
    width: 130,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Город',
    dataIndex: 'reservation_city',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Адрес',
    dataIndex: 'reservation_address',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Формат',
    dataIndex: 'reservation_format',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Сторона',
    dataIndex: 'reservation_side',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата создания',
    dataIndex: 'reservation_createDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата начала',
    dataIndex: 'reservation_startDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дата окончания',
    dataIndex: 'reservation_expirationDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Статус',
    dataIndex: 'reservation_status',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Продление брони',
    dataIndex: 'reservation_renewalOfReservation',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Брендирование',
    dataIndex: 'reservation_branding',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Освещение',
    dataIndex: 'reservation_lighting',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Пакет',
    dataIndex: 'reservation_package',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: false
  },
  {
    title: 'Дизайн',
    dataIndex: 'reservation_design',
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
const initColumnsTable = [
  {
    title: 'Номер приложения',
    dataIndex: 'attachment_code',
    width: 130,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Сумма',
    dataIndex: 'attachment_summa',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Дата создания',
    dataIndex: 'attachment_createDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Сроки',
    dataIndex: 'attachment_reservDates',
    width: 220,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => {
      // console.log('[text]', text)
      return (
        <Link to={{ pathname: `/sales/application/${record.id}`, state: { dateFrom: record.dateForRouter[0], dateTo: record.dateForRouter[1] } }}>
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      )
    }
  },
  {
    dataIndex: 'dateForRouter',
    width: 0,
    title: '',
    isShowed: true
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
  const [columnsTable, setColumnsTable] = useState(initColumnsForPopup);
  const [isReservTable, setIsReservTable] = useState(true)
  const [data, setData] = useState(props.data.reservations)

  // const [block, setBlock] = useState(0);

  const changeColumns = (dataIndex) => {
    console.log('Data INDEX', dataIndex, '=======================')
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

  useEffect(() => {
    console.log(props.choosedBlock);
    if (props.choosedBlock == 0) {
      setColumnsForPopup(initColumnsForPopup);
      setColumnsTable(initColumnsForPopup);
      setData(props.data.reservations);
    }
    else {
      setColumnsForPopup(initColumnsTable);
      setColumnsTable(initColumnsTable);
      setData(props.data.attachments);
    }

  }, [props.choosedBlock, props.loading])

  const headerTableBtns = [
    {
      'title': 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ'
    },
    {
      'title': 'ПРИЛОЖЕНИЯ'
    }
  ]

  // const whichData = whichTable ? props.data : null;

  return (
    <>
      <div className="outdoor-table-bar">
      <Table
        style={{ width: '100%' }}
        columns={columnsTable}
        setColumns={setColumnsTable}
        data={data}
        select={true}
        columnsForPopup={columnsForPopup}
        // changeColumns={changeColumns}
        chooseTableBtns={headerTableBtns}
        choosedBlock={props.choosedBlock}
        setBlock={props.setBlock}
        loading={props.loading}
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
