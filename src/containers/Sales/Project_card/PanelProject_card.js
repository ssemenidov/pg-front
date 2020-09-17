import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { StyledButton } from '../../../styles/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  getOutdoorFurnitureData,
  getCities,
  getDistricts,
  getPostalCodes,
  getOutdoorFurnitureFiltered,
} from '../../../store/actions/actions';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Text',
      dataIndex: 'text',
      width: 100,
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
  ];
  const data = [
    {
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      text: 'text',
    },
  ];
  const outdoorFurnitureColums = ['Код', 'Формат', 'Text', 'Город', 'Период', 'Адрес', 'Брендинг'];

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} />
      </div>

      <style>
        {`.outdoor-table-bar {
            width: 65.5vw;
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
