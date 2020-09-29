import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      width: 200,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 100,
      //sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => <a>Delete</a>,
    },
  ];
  const data = [
    {
      key: 1,
      date: '2018-02-11',
      amount: 120,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 2,
      date: '2018-03-11',
      amount: 243,
      type: 'income',
      note: 'transfer',
    },
    {
      key: 3,
      date: '2018-04-11',
      amount: 98,
      type: 'income',
      note: 'transfer',
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
