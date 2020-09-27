import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import tableFreeIcon from '../../../img/sales/table-free-icon.svg';
import tableSoldIcon from '../../../img/sales/table-sold-icon.svg';
import { useHistory } from 'react-router';
import freeIcon from '../../../img/sales/free.svg';
import bookedIcon from '../../../img/sales/booked.svg';
import soldIcon from '../../../img/sales/sold.svg';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Период',
      dataIndex: 'period',
      width: 150,
    },
    {
      title: 'A1',
      dataIndex: 'A1',
      width: 150,
    },
    {
      title: 'A2',
      dataIndex: 'A2',
      width: 150,
    },
    {
      title: 'A3',
      dataIndex: 'A3',
      width: 150,
    },
    {
      title: 'A4',
      dataIndex: 'A4',
      width: 150,
    },
    {
      title: 'B1',
      dataIndex: 'B1',
      width: 150,
    },
    {
      title: 'B2',
      dataIndex: 'B2',
      width: 150,
    },
    {
      title: 'B3',
      dataIndex: 'B3',
      width: 150,
    },
    {
      title: 'B4',
      dataIndex: 'B4',
      width: 150,
    },
    {
      title: 'D1',
      dataIndex: 'D1',
      width: 150,
    },
    {
      title: 'D2',
      dataIndex: 'D2',
      width: 150,
    },
  ];

  const data = [
    {
      period: '16 - 01 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
    },
    {
      period: '02 - 15 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
    },
    {
      period: '16 - 30 марта',
      A1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      A2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      A4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#78A90D' }}>Свободно</p>
          <img src={freeIcon} />
        </>
      ),
      B1: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B2: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#117BD4' }}>Забронировано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Jacobs
          </strong>
          <img src={bookedIcon} />
        </>
      ),
      B3: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
      B4: (
        <>
          <p style={{ fontSize: '10px', position: 'absolute', margin: '5px 10px', color: '#D42D11' }}>Продано</p>
          <strong style={{ color: '#00284C', position: 'absolute', fontSize: '12px', margin: '20px 10px' }}>
            Coca-Cola
          </strong>
          <img src={soldIcon} />
        </>
      ),
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
