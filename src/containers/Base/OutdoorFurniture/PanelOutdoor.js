import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

import { useHistory } from 'react-router';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: 'Почтовый индекс',
      dataIndex: 'post',
      width: 80,
    },
    {
      title: 'Адрес маркетинговый',
      dataIndex: 'adress_m',
      width: 150,
    },
    {
      title: 'Адрес юридический',
      dataIndex: 'adress_j',
      width: 150,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 150,
    },
    {
      title: 'Координаты',
      dataIndex: 'coords',
      width: 150,
    },
    {
      title: 'Горит',
      dataIndex: 'fire',
      width: 80,
    },
    {
      width: 60,
      title: '',
      render: (text, record) => (
        <span onClick={() => alert('Click')} style={{ cursor: 'pointer' }}>
          <img src={icon_pen} alt="" />
        </span>
      ),
    },
  ];
  const data = [
    {
      key: 1,
      code: '204845847',
      city: 'Алматы',
      post: '101001',
      adress_m: 'пр. Достык д. 25',
      adress_j: 'пр. Достык д. 25',
      format: 'Сениор',
      coords: '43.252502° 76.953135°',
      fire: 'Да',
    },
    {
      key: 2,
      code: '204845847',
      city: 'Алматы',
      post: '101001',
      adress_m: 'пр. Достык д. 25',
      adress_j: 'пр. Достык д. 25',
      format: 'Сениор',
      coords: '43.252502° 76.953135°',
      fire: 'Да',
    },
    {
      key: 3,
      code: '204845847',
      city: 'Алматы',
      post: '101001',
      adress_m: 'пр. Достык д. 25',
      adress_j: 'пр. Достык д. 25',
      format: 'Сениор',
      coords: '43.252502° 76.953135°',
      fire: 'Да',
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} />
      </div>
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
    </>
  );
};

export default PanelDesign;
