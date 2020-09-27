import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import tableFreeIcon from '../../../img/sales/table-free-icon.svg';
import tableSoldIcon from '../../../img/sales/table-sold-icon.svg';
import { useHistory } from 'react-router';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>2 марта - 8 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline1',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>9 марта - 15 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline2',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>16 марта - 22 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline3',
      key: 'timeline',
    },
  ];
  const data = [
    {
      key: 1,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 2,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: (
        <div className="page-label">
          <span>Coca-Cola</span>
          <img src={tableSoldIcon} />
        </div>
      ),
      timeline2: (
        <div className="page-label">
          <span>Coca-Cola</span>
          <img src={tableSoldIcon} />
        </div>
      ),
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 3,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 4,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 5,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
  ];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data}
          history={useHistory()}
          link="/sales/project_card"
        />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 100%;
            margin-left:auto;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
