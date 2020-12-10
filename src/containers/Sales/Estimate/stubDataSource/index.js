import { column, column_sorter, notnull, column_num, null2str, null2strKey, null2bool } from '../../../../components/Table/utils'
import { CityFilterDropdown, PeriodFilterDropdown } from '../utils';


const filterCity = {
  filterDropdown: CityFilterDropdown,
  onFilter: (val, record) => record.city === val,
}

const filterPeriod = {
  filterDropdown: PeriodFilterDropdown,
  onFilter: (a, b) => {
    const start = new Date(b.period.split(' - ')[0].split('.').reverse().join('-')).setHours(0, 0, 0, 0);
    const end = new Date(b.period.split(' - ')[1].split('.').reverse().join('-')).setHours(0, 0, 0, 0);
    return start <= a && end >= a;
  },
}

const sorterQuantity = (a, b) => notnull(a) ? (notnull(b) ? Number(a.quantity) - Number(b.quantity) : 1) : -1;

export const initColumnsForPopupBookedSides = [
  column('Код стороны', 'code', 130),
  column('Город', 'city', 130, true, true, filterCity),
  column('Адрес', 'address', 130),
  column('Формат', 'format', 130),
  column('Сторона', 'side', 130),
  column('Период', 'period', 130, true, true, filterPeriod),
  column('Брендинг (да/нет)', 'branding', 130, true, true),
  {
    title: 'АРЕНДА',
    children: [
      column('Аренда по прайсу', 'rentByPrice', 130, false),
      column('Скидка по прайсу', 'discountByPrice', 130, false),
      column('Аренда на клиента', 'rentOnClient', 130, false),
      column('Скидка на клиента', 'discountOnClient', 130, false),
      column('Аренда после скидки', 'rentAfterDiscount', 130, false),
    ],
  },
  {
    title: 'НАЛОГ',
    children: [
      column('Налог', 'tax', 130, false),
      column('Скидка на налог', 'discountOnTax', 130, false),
      column('Налог после скидки', 'taxAfterDiscount', 130, false),
      column('НДС/ без НДС', 'vat', 130, false),
    ],
  },
  column('Монтаж', 'mount', 130, false),
  column('Печать', 'print', 130, false),
  column('Итого', 'sum', 130, false),
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column('Процент АК', 'percentAK', 130, false),
      column('Сумма АК', 'sumAK', 130, false),
      column('Сумма за вычетом АК', 'sumWithoutAK', 130, false),
    ],
  },
];


export const initColumnsTableBookedSides = [
  column('Код стороны', 'code', 130),
  column('Город', 'city', 130, true, true, filterCity),
  column('Адрес', 'address', 130),
  column('Формат', 'format', 130),
  column('Сторона', 'side', 130),
  column('Период', 'period', 130, true, true, filterPeriod),
  column('Брендинг (да/нет)', 'branding', 130)
];


export const initColumnsForPopupExtraCharge = [
  column('Наименование услуги', 'nameOfService', 130, true, true),
  column('Город', 'city', 130, true, true, filterCity),
  column('Период', 'period', 130, true, true, filterPeriod),
  column_sorter('Кол-во', 'quantity', 130, true, sorterQuantity),
  column_num('Цена', 'price', 130, true),
  column_num('Скидка', 'discount', 130, true),
  column_num('Стоимость после скидки', 'priceAfterDiscount', 130, true),
  column_num('Сумма', 'sum', 130, true),
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column_num('Процент АК', 'percentAK', 130, false),
      column_num('Сумма АК', 'sumAK', 130, false),
      column_num('Сумма за вычетом АК', 'sumWithoutAK', 130, false),
    ],
  },
];


export const initColumnsTableExtraCharge = [
  column('Наименование услуги', 'nameOfService', 130, true, true),
  column('Город', 'city', 130, true, true, filterCity),
  column('period', 'Период', 130, true, true, filterPeriod),
  column_sorter('Кол-во', 'quantity', 130, true, true, sorterQuantity),
  column_num('Цена', 'price', 130, true, true),
  column_num('Скидка', 'discount', 130, true),
  column_num('Стоимость после скидки', 'priceAfterDiscount', 130, true),
  column_num('Сумма', 'sum', 130, true),
];


export const initColumnsForPopupHotPtc = [
  column('Тип', 'code', 130, true, true),
  column('Город', 'city', 130, true, true, filterCity),
  column_num('Кол-во', 'quantity', 130, true),
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      column_num('Аренда', 'rentInput', 130, true),
      column_num('Налог', 'taxInput', 130, true),
      column_num('Печать', 'printInput', 130, true),
      column_num('Монтаж', 'mountInput', 130, true),
      column_num('Производсто', 'manufactureInput', 130, true),
      column_num('Доп. расходы', 'costsInput', 100, true),
      column_num('Сумма', 'sumInput', 100, true),
    ],
  },
  {
    title: 'СУММА ПРОДАЖИ',
    children: [
      column_num('Аренда', 'rentSell', 130, false),
      column_num('Налог', 'taxSell', 130, false),
      column_num('Печать', 'printSell', 130, false),
      column_num('Монтаж', 'mountSell', 130, false),
      column_num('Производство', 'manufactureSell', 130, false),
      column_num('Доп. расходы', 'costsSell', 130, false),
      column_num('Сумма', 'sumSell', 130, false),
    ],
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      column_num('Процент АК', 'percentAK', 130, false),
      column_num('Сумма АК', 'sumAK', 130, false),
      column_num('Сумма за вычетом АК', 'sumWithoutAK', 130, false),
    ],
  },
  column_num('Маржа', 'margin', 130, false),
];


export const initColumnsTableHotPtc = [
  column('Тип', 'code', 130, true, true),
  column('Город', 'city', 130, true, true, filterCity),
  column_sorter('Кол-во', 'quantity', 130, true, sorterQuantity),
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      column_num('Аренда', 'rentInput', 130, true),
      column_num('Налог', 'taxInput', 130, true),
      column_num('Печать', 'printInput', 130, true),
      column_num('Монтаж', 'mountInput', 130, true),
      column_num('Производство', 'manufactureInput', 130, true),
      column_num('Доп. расходы', 'costsInput', 130, true),
      column_num('Сумма', 'sumInput', 130, true),
    ],
  },
];
