import React, { useState, useEffect } from 'react';
import { STab, STabList, STabPanel, STabs } from '../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import Table from '../../../components/Tablea';
import { StyledButton } from '../../../styles/styles';
import { useSelector, useDispatch } from 'react-redux';

const PanelDesign = (props) => {
  const tabs = [{ value: 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ' }, { value: 'ДОП. РАСХОДЫ' }, { value: 'НОН РТС' }];
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Дата начала',
      dataIndex: 'date',
      width: 90,
    },
    {
      title: 'Рекламодатель',
      dataIndex: 'advert',
      width: 100,
    },
    {
      title: 'Рекламное агенство',
      dataIndex: 'advert_agency',
      width: 100,
    },

    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },

    {
      title: 'Сумма без НДС',
      dataIndex: 'sum',
      width: 100,
    },
    {
      title: 'Общая сумма',
      dataIndex: 'all_sum',
      width: 100,
    },
  ];
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
  const estimateColums = ['Код стороны', 'Город', 'Адрес', 'Формат', 'Сторона', 'Период', 'Брендинг'];
  const estimateaddColums = [
    'Наименование услуги',
    'Город',
    'Период',
    'Кол-во',
    'Цена',
    'Скидка',
    'Стоимость после скидки',
    'Сумма',
  ];
  const estimatertsColums = ['Тип', 'Город', 'Кол-во', 'Аренда', 'Налог', 'Печать', 'Монтаж', 'Доп.расходы', 'сумма'];
  return (
    <STabs className="all" selectedTabClassName="is-selected" selectedTabPanelClassName="is-selected">
      <ControlToolbar position="static">
        <STabList>
          {tabs.map((tab, index) => {
            return (
              <STab key={index} onClick={() => props.setBlock(index)}>
                {tab.value}
              </STab>
            );
          })}
        </STabList>
      </ControlToolbar>
      <STabPanel>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
        </div>
      </STabPanel>
      <STabPanel>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
        </div>
      </STabPanel>
      <STabPanel>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} select={true} />
        </div>
      </STabPanel>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
          .all{
            width:70vw;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </STabs>
  );
};

export default PanelDesign;
