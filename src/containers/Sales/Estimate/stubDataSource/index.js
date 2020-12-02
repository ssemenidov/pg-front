import { CityFilterDropdown, PeriodFilterDropdown } from '../utils';

export const initColumnsForPopupBookedSides = [
  {
    key: 'code',
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
    isShowed: true,
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
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
    filterDropdown: PeriodFilterDropdown,
    onFilter: (a, b) => {
      console.log('filtering...');
    },
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
    key: 'period',
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true,
    filterDropdown: PeriodFilterDropdown,
    onFilter: (a, b) => {
      console.log('filtering...');
    },
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
    sorter: (a, b) => {
      if (a.nameOfService < b.nameOfService) {
        return -1;
      }
      if (a.nameOfService > b.nameOfService) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
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
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 130,
    isShowed: true,
    sorter: (a, b) => {
      return Number(a.price.split(' ')[0]) - Number(b.price.split(' ')[0]);
    },
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    width: 130,
    isShowed: true,
    sorter: (a, b) => {
      return Number(a.discount.split('%')[0]) - Number(b.discount.split('%')[0]);
    },
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'priceAfterDiscount',
    width: 130,
    isShowed: true,
    sorter: (a, b) => {
      return Number(a.priceAfterDiscount.split(' ')[0]) - Number(b.priceAfterDiscount.split(' ')[0]);
    },
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: 130,
    isShowed: true,
    sorter: (a, b) => {
      return Number(a.sum.split(' ')[0]) - Number(b.sum.split(' ')[0]);
    },
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.percentAK.split('%')[0]) - Number(b.percentAK.split('%')[0]);
        },
      },
      {
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.sumAK.split(' ')[0]) - Number(b.sumAK.split(' ')[0]);
        },
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
    sorter: (a, b) => {
      if (a.nameOfService < b.nameOfService) {
        return -1;
      }
      if (a.nameOfService > b.nameOfService) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
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
    sorter: (a, b) => a.quantity - b.quantity,
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 130,
    sorter: (a, b) => {
      return Number(a.price.split(' ')[0]) - Number(b.price.split(' ')[0]);
    },
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    width: 130,
    sorter: (a, b) => {
      return Number(a.discount.split('%')[0]) - Number(b.discount.split('%')[0]);
    },
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'priceAfterDiscount',
    width: 130,
    sorter: (a, b) => {
      return Number(a.priceAfterDiscount.split(' ')[0]) - Number(b.priceAfterDiscount.split(' ')[0]);
    },
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: 130,
    sorter: (a, b) => {
      return Number(a.sum.split(' ')[0]) - Number(b.sum.split(' ')[0]);
    },
  },
];

export const initColumnsForPopupHotPtc = [
  {
    title: 'Тип',
    dataIndex: 'code',
    width: 130,
    isShowed: true,
    sorter: (a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    isShowed: true,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    isShowed: true,
    sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
  },
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentInput',
        width: 130,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.rentInput.split(' ')[0]) - Number(b.rentInput.split(' ')[0]);
        },
      },
      {
        title: 'Налог',
        dataIndex: 'taxInput',
        width: 130,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.taxInput.split(' ')[0]) - Number(b.taxInput.split(' ')[0]);
        },
      },
      {
        title: 'Печать',
        dataIndex: 'printInput',
        width: 130,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.printInput.split(' ')[0]) - Number(b.printInput.split(' ')[0]);
        },
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountInput',
        width: 130,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.mountInput.split(' ')[0]) - Number(b.mountInput.split(' ')[0]);
        },
      },
      {
        title: 'Производсто',
        dataIndex: 'manufactureInput',
        width: 130,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.manufactureInput.split(' ')[0]) - Number(b.manufactureInput.split(' ')[0]);
        },
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsInput',
        width: 100,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.costsInput.split(' ')[0]) - Number(b.costsInput.split(' ')[0]);
        },
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 100,
        isShowed: true,
        sorter: (a, b) => {
          return Number(a.sumInput.split(' ')[0]) - Number(b.sumInput.split(' ')[0]);
        },
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
        sorter: (a, b) => {
          return Number(a.rentSell.split(' ')[0]) - Number(b.rentSell.split(' ')[0]);
        },
      },
      {
        title: 'Налог',
        dataIndex: 'taxSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.taxSell.split(' ')[0]) - Number(b.taxSell.split(' ')[0]);
        },
      },
      {
        title: 'Печать',
        dataIndex: 'printSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.printSell.split(' ')[0]) - Number(b.printSell.split(' ')[0]);
        },
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.mountSell.split(' ')[0]) - Number(b.mountSell.split(' ')[0]);
        },
      },
      {
        title: 'Производство',
        dataIndex: 'manufactureSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.manufactureSell.split(' ')[0]) - Number(b.manufactureSell.split(' ')[0]);
        },
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.costsSell.split(' ')[0]) - Number(b.costsSell.split(' ')[0]);
        },
      },
      {
        title: 'Сумма',
        dataIndex: 'sumSell',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return Number(a.sumSell.split(' ')[0]) - Number(b.sumSell.split(' ')[0]);
        },
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
        sorter: (a, b) => {
          return a.percentAK.split('%')[0] - b.percentAK.split('%')[0];
        },
      },
      {
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false,
        sorter: (a, b) => {
          return a.sumAK.split(' ')[0] - b.sumAK.split(' ')[0];
        },
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
    sorter: (a, b) => {
      if (a.code < b.code) {
        return -1;
      }
      if (a.code > b.code) {
        return 1;
      }
      return 0;
    },
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    filterDropdown: CityFilterDropdown,
    onFilter: (val, record) => {
      return record.city === val;
    },
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    sorter: (a, b) => Number(a.quantity) - Number(b.quantity),
  },
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.rentInput.split(' ')[0]) - Number(b.rentInput.split(' ')[0]);
        },
      },
      {
        title: 'Налог',
        dataIndex: 'taxInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.taxInput.split(' ')[0]) - Number(b.taxInput.split(' ')[0]);
        },
      },
      {
        title: 'Печать',
        dataIndex: 'printInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.printInput.split(' ')[0]) - Number(b.printInput.split(' ')[0]);
        },
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.mountInput.split(' ')[0]) - Number(b.mountInput.split(' ')[0]);
        },
      },
      {
        title: 'Производство',
        dataIndex: 'manufactureInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.manufactureInput.split(' ')[0]) - Number(b.manufactureInput.split(' ')[0]);
        },
      },
      {
        title: 'Доп. расходы',
        dataIndex: 'costsInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.costsInput.split(' ')[0]) - Number(b.costsInput.split(' ')[0]);
        },
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 130,
        sorter: (a, b) => {
          return Number(a.sumInput.split(' ')[0]) - Number(b.sumInput.split(' ')[0]);
        },
      },
    ],
  },
];
