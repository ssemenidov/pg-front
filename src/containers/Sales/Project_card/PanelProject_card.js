import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea/Tablea';
import { Link, useHistory } from 'react-router-dom';
import icon_pen from "../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg";
import { routes } from '../../../routes';


const createInitColumnsForPopup = ({sliderState}) => [
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
    isShowed: true
  },
  {
    title: 'Дата начала',
    dataIndex: 'reservation_startDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
  },
  {
    title: 'Дата окончания',
    dataIndex: 'reservation_expirationDate',
    width: 100,
    sorter: {
      compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
      multiple: 1,
    },
    isShowed: true
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
    render: (text, record) => {
      console.log('[record]', record)
      return (
        <Link to={{  state: {  reserveId: record.reservation_code } }} onClick={() => { sliderState.setAddShowed(true); }} >
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      )
    },
    isShowed: true
  },
  {
    dataIndex: 'dateForRouter',
    width: 0,
    title: '',
    isShowed: true
  }
];

const createInitColumnsTable = ({sliderState, setReservationCode, history}) => [
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
        <Link to={routes.sales.application.url(record.id)} >
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      )
    },
    isShowed: true
  },
  {
    dataIndex: 'dateForRouter',
    width: 0,
    title: '',
    isShowed: true
  }
];


export const PanelProjectCard = ({sliderState, setReservationCode, choosedBlock, loading, setBlock, panelData}) => {

  const history = useHistory();
  const initColumnsForPopup = createInitColumnsForPopup({sliderState});
  const initColumnsTable = createInitColumnsTable({sliderState, setReservationCode, history});

  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsForPopup);
  const [data, setData] = useState(panelData.reservations)

  useEffect(() => {
    if (choosedBlock === 0) {
      setColumnsForPopup(initColumnsForPopup);
      setColumnsTable(initColumnsForPopup);
      setData(panelData.reservations);
    }
    else {
      setColumnsForPopup(initColumnsTable);
      setColumnsTable(initColumnsTable);
      setData(panelData.attachments);
    }
  }, [choosedBlock, loading])

  const headerTableBtns = [
    {
      'title': 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ'
    },
    {
      'title': 'ПРИЛОЖЕНИЯ'
    }
  ]

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
        chooseTableBtns={headerTableBtns}
        choosedBlock={choosedBlock}
        setBlock={setBlock}
        loading={loading}
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

