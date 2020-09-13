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
  const tabs = [{ value: 'ЗАБРОНИРОВАННЫЕ СТОРОНЫ' }, { value: 'ДОП. РАСХОДЫ' }, { value: 'НОН РТС' }];

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
          <Table
            linkProps={'/base/construction/'}
            columns={estimateColums}
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
        <div className="outdoor-table-bar">
          <Table
            linkProps={'/base/construction/'}
            columns={estimateaddColums}
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
        <div className="outdoor-table-bar">
          <Table
            linkProps={'/base/construction/'}
            columns={estimatertsColums}
            rows={rows}
            rowKeys={rowKeys}
            handleFastSearch={() => {
              dispatch(getOutdoorFurnitureFiltered(fastSearch));
            }}
            handleChangeFastSearch={(e) => setFastSearch(e.target.value)}
          />
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
