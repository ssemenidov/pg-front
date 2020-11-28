import React from 'react';
// import { ReactComponent as ArrowDown } from '../../../../img/icon_dropdown_select.svg';
import { CityFilterDropdown } from '../utils';

export const initColumnsForPopupBookedSides = [
  {
    key: 'code',
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
    isShowed: true,
  },
  {
    key: 'city',
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    isShowed: true,
  },
  {
    key: 'address',
    title: 'Адрес',
    dataIndex: 'address',
    width: 130,
    isShowed: true,
  },
  {
    key: 'format',
    title: 'Формат',
    dataIndex: 'format',
    width: 130,
    isShowed: true,
  },
  {
    key: 'side',
    title: 'Сторона',
    dataIndex: 'side',
    width: 130,
    isShowed: true,
  },
  {
    key: 'period',
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true,
  },
  {
    key: 'branding',
    title: 'Брендинг (да/нет)',
    dataIndex: 'branding',
    width: 130,
    isShowed: true,
  },

  {
    title: 'АРЕНДА',
    children: [
      {
        key: 'rentByPrice',
        title: 'Аренда по прайсу',
        dataIndex: 'rentByPrice',
        width: 130,
        isShowed: false,
      },
      {
        key: 'discountByPrice',
        title: 'Скидка по прайсу',
        dataIndex: 'discountByPrice',
        width: 130,
        isShowed: false,
      },
      {
        key: 'rentOnClient',
        title: 'Аренда на клиента',
        dataIndex: 'rentOnClient',
        width: 130,
        isShowed: false,
      },
      {
        key: 'discountOnClient',
        title: 'Скидка на клиента',
        dataIndex: 'discountOnClient',
        width: 130,
        isShowed: false,
      },
      {
        key: 'rentAfterDiscount',
        title: 'Аренда после скидки',
        dataIndex: 'rentAfterDiscount',
        width: 130,
        isShowed: false,
      },
    ],
  },
  {
    title: 'НАЛОГ',
    children: [
      {
        key: 'tax',
        title: 'Налог',
        dataIndex: 'tax',
        width: 130,
        isShowed: false,
      },
      {
        key: 'discountOnTax',
        title: 'Скидка на налог',
        dataIndex: 'discountOnTax',
        width: 130,
        isShowed: false,
      },
      {
        key: 'taxAfterDiscount',
        title: 'Налог после скидки',
        dataIndex: 'taxAfterDiscount',
        width: 130,
        isShowed: false,
      },
      {
        key: 'vat',
        title: 'НДС/ без НДС',
        dataIndex: 'vat',
        width: 130,
        isShowed: false,
      },
    ],
  },
  {
    key: 'mount',
    title: 'Монтаж',
    dataIndex: 'mount',
    width: 130,
    isShowed: false,
  },
  {
    key: 'print',
    title: 'Печать',
    dataIndex: 'print',
    width: 130,
    isShowed: false,
  },
  {
    key: 'sum',
    title: 'Итого',
    dataIndex: 'sum',
    width: 130,
    isShowed: false,
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        key: 'percentAK',
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false,
      },
      {
        key: 'sumAK',
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false,
      },
      {
        key: 'sumWithoutAK',
        title: 'Сумма за вычетом АК',
        dataIndex: 'sumWithoutAK',
        width: 130,
        isShowed: false,
      },
    ],
  },
];

export const initColumnsTableBookedSides = [
  {
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
    // filterIcon: <ArrowDown />,
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

export const initColumnsForPopupExtraCharge = [
  {
    title: 'Наименование услуги',
    dataIndex: 'nameOfService',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'priceAfterDiscount',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: 130,
    isShowed: true,
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Сумма за вычетом АК',
        dataIndex: 'sumWithoutAK',
        width: 130,
        isShowed: false,
      },
    ],
  },
];

export const initColumnsTableExtraCharge = [
  {
    title: 'Наименование услуги',
    dataIndex: 'nameOfService',
    width: 130,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
    // filterIcon: <ArrowDown />,
  },
  {
    title: 'Период',
    dataIndex: 'period',
    width: 130,
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 130,
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    width: 130,
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'priceAfterDiscount',
    width: 130,
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: 130,
  },
];

export const initColumnsForPopupHotPtc = [
  {
    title: 'Тип',
    dataIndex: 'code',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    isShowed: true,
  },
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentInput',
        width: 130,
        isShowed: true,
      },
      {
        title: 'Налог',
        dataIndex: 'taxInput',
        width: 130,
        isShowed: true,
      },
      {
        title: 'Печать',
        dataIndex: 'printInput',
        width: 130,
        isShowed: true,
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountInput',
        width: 130,
        isShowed: true,
      },
      {
        title: 'Производсто',
        dataIndex: 'manufactureInput',
        width: 130,
        isShowed: true,
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsInput',
        width: 100,
        isShowed: true,
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 100,
        isShowed: true,
      },
    ],
  },
  {
    title: 'СУММА ПРОДАЖИ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Налог',
        dataIndex: 'taxSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Печать',
        dataIndex: 'printSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Производство',
        dataIndex: 'manufactureSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsSell',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Сумма',
        dataIndex: 'sumSell',
        width: 130,
        isShowed: false,
      },
    ],
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false,
      },
      {
        title: 'Сумма за вычетом АК',
        dataIndex: 'sumWithoutAK',
        width: 130,
        isShowed: false,
      },
    ],
  },
  {
    title: 'Маржа',
    dataIndex: 'margin',
    width: 130,
    isShowed: false,
  },
];

export const initColumnsTableHotPtc = [
  {
    title: 'Тип',
    dataIndex: 'code',
    width: 130,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
    // filterIcon: <ArrowDown />,
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
  },
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentInput',
        width: 130,
      },
      {
        title: 'Налог',
        dataIndex: 'taxInput',
        width: 130,
      },
      {
        title: 'Печать',
        dataIndex: 'printInput',
        width: 130,
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountInput',
        width: 130,
      },
      {
        title: 'Производство',
        dataIndex: 'manufactureInput',
        width: 130,
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsInput',
        width: 130,
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 130,
      },
    ],
  },
];

