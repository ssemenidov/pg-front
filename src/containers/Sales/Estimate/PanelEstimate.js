import React, { useState, useEffect } from 'react';
import {Button, Checkbox, Layout, Dropdown, Input, Menu, Select} from "antd";

import {CustomTabBtn, CustomTabList, StyledButton} from '../../../components/Styles/DesignList/styles';


import Table from '../../../components/TableResizable/Table';
import HeaderBar from '../../../components/HeaderBar';
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
    width: 130,
    isShowed: true
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    width: 130,
    isShowed: true
  },
  {
    title: 'Формат',
    dataIndex: 'format',
    width: 130,
    isShowed: true
  },
  {
    title: 'Сторона',
    dataIndex: 'side',
    width: 130,
    isShowed: true
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true
  },
  {
    title: 'Брендинг (да/нет)',
    dataIndex: 'branding',
    width: 130,
    isShowed: true
  },
  {
    title: 'АРЕНДА',
    children: [
      {
        title: 'Аренда по прайсу',
        dataIndex: 'rentByPrice',
        width: 130,
        isShowed: false
      },
      {
        title: 'Скидка по прайсу',
        dataIndex: 'discountByPrice',
        width: 130,
        isShowed: false
      },
      {
        title: 'Аренда на клиента',
        dataIndex: 'rentOnClient',
        width: 130,
        isShowed: false
      },
      {
        title: 'Скидка на клиента',
        dataIndex: 'discountOnClient',
        width: 130,
        isShowed: false
      },
      {
        title: 'Аренда после скидки',
        dataIndex: 'rentAfterDiscount',
        width: 130,
        isShowed: false
      }
    ]
  },
  {
    title: 'НАЛОГ',
    children: [
      {
        title: 'Налог',
        dataIndex: 'tax',
        width: 130,
        isShowed: false
      },
      {
        title: 'Скидка на налог',
        dataIndex: 'discountOnTax',
        width: 130,
        isShowed: false
      },
      {
        title: 'Налог после скидки',
        dataIndex: 'taxAfterDiscount',
        width: 130,
        isShowed: false
      },
      {
        title: 'НДС/ без НДС',
        dataIndex: 'vat',
        width: 130,
        isShowed: false
      },
    ]
  },
  {
    title: 'Монтаж',
    dataIndex: 'mount',
    width: 130,
    isShowed: false
  },
  {
    title: 'Печать',
    dataIndex: 'print',
    width: 130,
    isShowed: false
  },
  {
    title: 'Итого',
    dataIndex: 'sum',
    width: 130,
    isShowed: false
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false
      },
      {
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false
      },
      {
        title: 'Сумма за вычетом АК',
        dataIndex: 'sumWithoutAK',
        width: 130,
        isShowed: false
      }
    ]
  }
];
const initColumnsTable = [
  {
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
  },
  {
    title: 'Адрес',
    dataIndex: 'address',
    width: 130,
  },
  {
    title: 'Формат',
    dataIndex: 'format',
    width: 130,
  },
  {
    title: 'Сторона',
    dataIndex: 'side',
    width: 130,
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 130,
  },
  {
    title: 'Брендинг (да/нет)',
    dataIndex: 'branding',
    width: 130,
  },
];
var data1 = [
  {
    key: 1,
    code: '#1020050301323',
    city: 'Алматы',
    post: '010001',
    district: 'Медеуский р-н.',
    adress_j: 'Абая - ост. ГорВодоКанал',
    cadastralNumber: '34756824',
    area: '32 га',
    contractNumber:"",
    marketingAddress: "",
    constructionQuantity: "",
    targetPurpose: "",
    comment: "",
  },
];

const tabs = [{ value: 'ОСНОВНЫЕ РАСХОДЫ' }, { value: 'ДОП. РАСХОДЫ' }, { value: 'НОН РТС' }];
const data = [
  {
    key: 1,
    code: '#2020050301323',
    brand: 'CocaCola',
    date: '28.05.2020',
    advert: 'ТОО «Рекламодатель»',
    advert_agency: 'ТОО «Агенство»',
    city: 'Алматы',
    sum: '123 356 тг.',
    all_sum: '223 356 тг.',
  },
  {
    key: 2,
    code: '#2020050301323',
    brand: 'CocaCola',
    date: '28.05.2020',
    advert: 'ТОО «Рекламодатель»',
    advert_agency: 'ТОО «Агенство»',
    city: 'Алматы',
    sum: '123 356 тг.',
    all_sum: '223 356 тг.',
  },
  {
    key: 3,
    code: '#2020050301323',
    brand: 'CocaCola',
    date: '28.05.2020',
    advert: 'ТОО «Рекламодатель»',
    advert_agency: 'ТОО «Агенство»',
    city: 'Алматы',
    sum: '123 356 тг.',
    all_sum: '223 356 тг.',
  },
  {
    key: 4,
    code: '#2020050301323',
    brand: 'CocaCola',
    date: '28.05.2020',
    advert: 'ТОО «Рекламодатель»',
    advert_agency: 'ТОО «Агенство»',
    city: 'Алматы',
    sum: '123 356 тг.',
    all_sum: '223 356 тг.',
  },
  {
    key: 5,
    code: '#2020050301323',
    brand: 'CocaCola',
    date: '28.05.2020',
    advert: 'ТОО «Рекламодатель»',
    advert_agency: 'ТОО «Агенство»',
    city: 'Алматы',
    sum: '123 356 тг.',
    all_sum: '223 356 тг.',
  },
];
const bookedSidesColumns = [
  {
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 80,
  },
  {
    title: 'Адрес',
    dataIndex: 'adress',
    width: 90,
  },
  {
    title: 'Формат',
    dataIndex: 'format',
    width: 100,
  },
  {
    title: 'Сторона',
    dataIndex: 'side',
    width: 100,
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 100,
  },
  {
    title: 'Брендинг',
    dataIndex: 'branding',
    width: 80,
  },
];
const extraChargeColumns = [
  {
    title: 'Наименование услуги',
    dataIndex: 'name',
    width: 80,
  },

  {
    title: 'Город',
    dataIndex: 'city',
    width: 80,
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 100,
  },
  {
    title: 'Кол-во',
    dataIndex: 'number',
    width: 80,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 90,
  },
  {
    title: 'Скидка',
    dataIndex: 'sale',
    width: 100,
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'price2',
    width: 100,
  },

  {
    title: 'Сумма',
    dataIndex: 'amount',
    width: 100,
  },
];
const hotPtcColumns = [
  {
    title: 'Тип',
    dataIndex: 'type',
    width: 80,
  },

  {
    title: 'Город',
    dataIndex: 'city',
    width: 80,
  },
  {
    title: 'Кол-во',
    dataIndex: 'number',
    width: 80,
  },
  {
    title: 'Аренда',
    dataIndex: 'renta',
    width: 80,
  },
  {
    title: 'Налог',
    dataIndex: 'tax',
    width: 90,
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
    title: 'Доп.расходы',
    dataIndex: 'addcost',
    width: 100,
  },
  {
    title: 'Сумма',
    dataIndex: 'amount',
    width: 100,
  },
];

const PanelDesign = (props) => {
  const [activeTab, setActiveTab] = useState('booked-sides');
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

  let mainContent = {
    'booked-sides': <Table
      key='booked-sides'
      columns={columnsTable}
      data={data1}
    />,
    'extra-charge': <Table
      key='extra-charge'
      columns={extraChargeColumns}
      data={data}
    />,
    'hot-ptc': <Table
      key='hot-ptc'
      columns={hotPtcColumns}
      data={data}
    />
  }

  let tabEditColData = {
    'booked-sides': {
      columnsForPopup: columnsForPopup,
      setColumnsForPopup: setColumnsForPopup,
      setColumnsTable: setColumnsTable
    },
    'extra-charge': {
      columnsForPopup: columnsForPopup,
      setColumnsForPopup: setColumnsForPopup,
      setColumnsTable: setColumnsTable
    },
    'hot-ptc': {
      columnsForPopup: columnsForPopup,
      setColumnsForPopup: setColumnsForPopup,
      setColumnsTable: setColumnsTable
    }
  }

  const listOfColumns = {
    'booked-sides': initColumnsForPopup,
    'extra-charge': [],
    'hot-ptc': [],
  };

  // useEffect(() => {
  //   console.log('columnsForPopup ', columnsForPopup)
  // }, [columnsForPopup]);

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <HeaderBar
        enableEditQuantityOfColumns={true}
        listOfColumns={listOfColumns[activeTab]}
        columnsConfig={tabEditColData[activeTab]}
      >
        <CustomTabList>
          <CustomTabBtn
            className={activeTab === 'booked-sides' && 'active'}
            onClick={() => setActiveTab('booked-sides')}
          >
            ЗАБРОНИРОВАННЫЕ СТОРОНЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'extra-charge' && 'active'}
            onClick={() => setActiveTab('extra-charge')}
          >
            ДОП. РАСХОДЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'hot-ptc' && 'active'}
            onClick={() => setActiveTab('hot-ptc')}
          >
            НОН РТС
          </CustomTabBtn>
        </CustomTabList>
      </HeaderBar>
      <Layout.Content>
        <Table
          key='booked-sides'
          columns={columnsTable}
          data={data1}
        />
      </Layout.Content>
    </div>
  );
};

export default PanelDesign;
