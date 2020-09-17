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
import styled from 'styled-components';

const PanelDesign = (props) => {
  const tabs = [{ value: 'Закрепленные стороны' }, { value: 'Дизайн' }];

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
