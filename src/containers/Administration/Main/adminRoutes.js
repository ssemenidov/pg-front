
export const adminUrl = '/administration'
export const adminTitle = 'Администрация'

export const adminRoutesMap = {
    person:            { to: `${adminUrl}/person`,            name: "Сотрудники", idx: 0 },
    outdoor_furniture: { to: `${adminUrl}/outdoor_furniture`, name: "Конструкции", idx: 1  },
    locations:         { to: `${adminUrl}/locations`,         name: "Местоположения", idx: 2  },
    packages:          { to: `${adminUrl}/packages`,          name: "Пакеты", idx: 3  },
    crews:             { to: `${adminUrl}/crews`,             name: "Экипажи", idx: 4  },
    prices:            { to: `${adminUrl}/prices`,            name: "Цены", idx: 5  },
}

if (process.env.NODE_ENV !== 'production') {
  adminRoutesMap.test_image = { to: `${adminUrl}/test_image`,        name: "Тест выгрузки на allbot.online", idx: 6 };
}


export const adminRoutes = {
  root: { to: adminUrl, name: '', idx: -1 },
  ...adminRoutesMap
}

export const adminRoutesArr = Object.entries(adminRoutesMap).map(
      x => { return { key: x[0], ...x[1]} }
  ).sort((a,b) => a.idx < b.idx)


