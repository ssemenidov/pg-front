import React, { useState, useEffect } from 'react';
import { STab, STabList, STabPanel, STabs } from '../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import Table from '../../../components/Tablea';
import { StyledButton } from '../../../styles/styles';

import styled from 'styled-components';

const PanelDesign = (props) => {
  const tabs = [{ value: 'Закрепленные стороны' }, { value: 'Дизайн' }];

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
    },
    {
      title: 'Рекламное агенство',
      dataIndex: 'advert_agency',
    },

    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },

    {
      title: 'Сумма без НДС',
      dataIndex: 'sum',
    },
    {
      title: 'Общая сумма',
      dataIndex: 'all_sum',
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
  const outdoorFurnitureColums = [
    'Код',
    'Город',
    'Почтовый индекс',
    'Маркетинговый адрес',
    'Юридический адрес',
    'Формат',
    'Координаты',
    'Горит',
  ];
  return (
    <STabs selectedTabClassName="is-selected" selectedTabPanelClassName="is-selected">
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
        <div className="design-info">
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vw' }}>
            <DesignItem>Дизайн 1</DesignItem>
            <DesignItem>Дизайн 2</DesignItem>
            <DesignItem>Дизайн 3</DesignItem>
            <DesignItem>Дизайн 4</DesignItem>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vw' }}>
            <DesignItem>Дизайн 5</DesignItem>
            <DesignItem>Дизайн 6</DesignItem>
            <DesignItem>Дизайн 7</DesignItem>
            <DesignItem>Дизайн 8</DesignItem>
          </div>
        </div>
      </STabPanel>
      <style>
        {`.outdoor-table-bar {
       width: 100%;
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

const DesignItem = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  padding: 5vw;
`;
