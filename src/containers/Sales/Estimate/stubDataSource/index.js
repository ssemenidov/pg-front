export const initColumnsForPopupBookedSides = [
  {
    key: 'code',
    title: 'Код стороны',
    dataIndex: 'code',
    width: 130,
    isShowed: true
  },
  {
    key: 'city',
    title: 'Город',
    dataIndex: 'city',
    width: 130,
    isShowed: true
  },
  {
    key: 'address',
    title: 'Адрес',
    dataIndex: 'address',
    width: 130,
    isShowed: true
  },
  {
    key: 'format',
    title: 'Формат',
    dataIndex: 'format',
    width: 130,
    isShowed: true
  },
  {
    key: 'side',
    title: 'Сторона',
    dataIndex: 'side',
    width: 130,
    isShowed: true
  },
  {
    key: 'period',
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true
  },
  {
    key: 'branding',
    title: 'Брендинг (да/нет)',
    dataIndex: 'branding',
    width: 130,
    isShowed: true
  },
  {
    title: 'АРЕНДА',
    children: [
      {
        key: 'rentByPrice',
        title: 'Аренда по прайсу',
        dataIndex: 'rentByPrice',
        width: 130,
        isShowed: false
      },
      {
        key: 'discountByPrice',
        title: 'Скидка по прайсу',
        dataIndex: 'discountByPrice',
        width: 130,
        isShowed: false
      },
      {
        key: 'rentOnClient',
        title: 'Аренда на клиента',
        dataIndex: 'rentOnClient',
        width: 130,
        isShowed: false
      },
      {
        key: 'discountOnClient',
        title: 'Скидка на клиента',
        dataIndex: 'discountOnClient',
        width: 130,
        isShowed: false
      },
      {
        key: 'rentAfterDiscount',
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
        key: 'tax',
        title: 'Налог',
        dataIndex: 'tax',
        width: 130,
        isShowed: false
      },
      {
        key: 'discountOnTax',
        title: 'Скидка на налог',
        dataIndex: 'discountOnTax',
        width: 130,
        isShowed: false
      },
      {
        key: 'taxAfterDiscount',
        title: 'Налог после скидки',
        dataIndex: 'taxAfterDiscount',
        width: 130,
        isShowed: false
      },
      {
        key: 'vat',
        title: 'НДС/ без НДС',
        dataIndex: 'vat',
        width: 130,
        isShowed: false
      },
    ]
  },
  {
    key: 'mount',
    title: 'Монтаж',
    dataIndex: 'mount',
    width: 130,
    isShowed: false
  },
  {
    key: 'print',
    title: 'Печать',
    dataIndex: 'print',
    width: 130,
    isShowed: false
  },
  {
    key: 'sum',
    title: 'Итого',
    dataIndex: 'sum',
    width: 130,
    isShowed: false
  },
  {
    title: 'АГЕНТСКАЯ КОМИССИЯ',
    children: [
      {
        key: 'percentAK',
        title: 'Процент АК',
        dataIndex: 'percentAK',
        width: 130,
        isShowed: false
      },
      {
        key: 'sumAK',
        title: 'Сумма АК',
        dataIndex: 'sumAK',
        width: 130,
        isShowed: false
      },
      {
        key: 'sumWithoutAK',
        title: 'Сумма за вычетом АК',
        dataIndex: 'sumWithoutAK',
        width: 130,
        isShowed: false
      }
    ]
  }
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
export const dataBookedSides = [
  {
    key: 1,
    code: '#2020050301323',
    city: 'Алматы',
    address: 'Гоголя-Пушкина, (северо-восток)',
    format: 'Сениор',
    side: 'Скроллерная А',
    period: '29.03.2020 - 30.05.2020',
    branding: 'Да',
    rentByPrice: 'stub data',
    discountByPrice: 'stub data',
    rentOnClient: 'stub data',
    discountOnClient: 'stub data',
    rentAfterDiscount: 'stub data',
    tax: 'stub data',
    discountOnTax: 'stub data',
    taxAfterDiscount: 'stub data',
    vat: 'stub data',
    mount: 'stub data',
    print: 'stub data',
    sum: 'stub data',
    percentAK: 'stub data',
    sumAK: 'stub data',
    sumWithoutAK: 'stub data'
  }
];

export const initColumnsForPopupExtraCharge = [
  {
    title: 'Наименование услуги',
    dataIndex: 'nameOfService',
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
    title: 'Период',
    dataIndex: 'period',
    width: 130,
    isShowed: true
  },
  {
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    isShowed: true
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    width: 130,
    isShowed: true
  },
  {
    title: 'Скидка',
    dataIndex: 'discount',
    width: 130,
    isShowed: true
  },
  {
    title: 'Стоимость после скидки',
    dataIndex: 'priceAfterDiscount',
    width: 130,
    isShowed: true
  },
  {
    title: 'Сумма',
    dataIndex: 'sum',
    width: 130,
    isShowed: true
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
  }
];
export const dataExtraCharge = [
  {
    key: 1,
    nameOfService: 'Дополнительный фотоотчет',
    city: 'Алматы',
    period: '29.03.2020 - 30.05.2020',
    quantity: '1',
    price: '5000,00 тг.',
    discount: '10%',
    priceAfterDiscount: '4500,00 тг.',
    sum: '9000,00 тг.',
    percentAK: 'stub data',
    sumAK: 'stub data',
    sumWithoutAK: 'stub data'
  }
];

export const initColumnsForPopupHotPtc = [
  {
    title: 'Тип',
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
    title: 'Кол-во',
    dataIndex: 'quantity',
    width: 130,
    isShowed: true
  },
  {
    title: 'ВХОДЯЩАЯ СТОИМОСТЬ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentInput',
        width: 130,
        isShowed: true
      },
      {
        title: 'Налог',
        dataIndex: 'taxInput',
        width: 130,
        isShowed: true
      },
      {
        title: 'Печать',
        dataIndex: 'printInput',
        width: 130,
        isShowed: true
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountInput',
        width: 130,
        isShowed: true
      },
      {
        title: 'Доп.расходы',
        dataIndex: 'extraChargeInput',
        width: 130,
        isShowed: true
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 130,
        isShowed: true
      }
    ]
  },
  {
    title: 'СУММА ПРОДАЖИ',
    children: [
      {
        title: 'Аренда',
        dataIndex: 'rentSell',
        width: 130,
        isShowed: false
      },
      {
        title: 'Налог',
        dataIndex: 'taxSell',
        width: 130,
        isShowed: false
      },
      {
        title: 'Печать',
        dataIndex: 'printSell',
        width: 130,
        isShowed: false
      },
      {
        title: 'Монтаж',
        dataIndex: 'mountSell',
        width: 130,
        isShowed: false
      },
      {
        title: 'Производство',
        dataIndex: 'manufactureSell',
        width: 130,
        isShowed: false
      },
      {
        title: 'Сумма',
        dataIndex: 'sumSell',
        width: 130,
        isShowed: false
      }
    ]
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
  },
  {
    title: 'Маржа',
    dataIndex: 'margin',
    width: 130,
    isShowed: false
  }
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
        title: 'Доп.расходы',
        dataIndex: 'extraChargeInput',
        width: 130,
      },
      {
        title: 'Сумма',
        dataIndex: 'sumInput',
        width: 130,
      }
    ]
  },
];
export const dataHotPtc = [
  {
    key: 1,
    code: 'Радио',
    city: 'Актау',
    quantity: '3',
    rentInput: '300000,00 тг.',
    taxInput: '0,00 тг.',
    printInput: '0,00 тг.',
    mountInput: '0,00 тг.',
    extraChargeInput: '15000,00 тг.',
    sumInput: '1575000,00 тг.',
    rentSell: 'stub data',
    taxSell: 'stub data',
    printSell: 'stub data',
    mountSell: 'stub data',
    manufactureSell: 'stub data',
    sumSell: 'stub data',
    percentAK: 'stub data',
    sumAK: 'stub data',
    sumWithoutAK: 'stub data',
    margin: 'stub data'
  }
];
