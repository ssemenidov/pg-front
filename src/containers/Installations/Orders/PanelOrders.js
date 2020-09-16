import React, { useState, useEffect } from 'react';
import { STab, STabList, STabPanel, STabs } from '../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import Table from '../../../components/Table';
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
  const tabs = [{ value: 'Закрепленные стороны' }];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOutdoorFurnitureData());
    dispatch(getCities());

    dispatch(getDistricts());
    dispatch(getPostalCodes());
  }, [dispatch]);

  const rowKeys = useSelector((state) => state.table.rowKeys);
  const rows = useSelector((state) => state.table.outdoorFurnitureTableData);
  console.log(rowKeys, rows);
  const [fastSearch, setFastSearch] = useState();
  const outdoorFurnitureColums = [
    'Код',
    'Экипаж',
    'Адрес',
    'Формат',
    'Сторона',
    '№ фото',
    'Монтаж',
    'Демонтаж',
    'Выгружено',
  ];
  return (
    <>
      <Table
        linkProps={'/base/construction/'}
        columns={outdoorFurnitureColums}
        rows={rows}
        rowKeys={rowKeys}
        handleFastSearch={() => {
          dispatch(getOutdoorFurnitureFiltered(fastSearch));
        }}
        handleChangeFastSearch={(e) => setFastSearch(e.target.value)}
      />

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
