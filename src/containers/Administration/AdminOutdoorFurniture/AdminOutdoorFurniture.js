import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';


import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem } from '../components/AdminConstructionItem';
import { GqlDatasource } from '../components/gql_datasource';
import { GridNoPadding, RowMargin1st, RowMargin2st } from '../components/Styled';

const stubValues0 = [
  {name: "Сениор"},
  {name: "Мюпи"},
  {name: "Флагштоки"},
  {name: "Остановки"},
  {name: "Созданная конструкция №1"},
];
const stubValues1 = [
  {name: "Европейское"},
];
const stubModel = [
  {name: "CIP Forum"},
  {name: "CIP Szekely"},
];
const stubFormat = [
  {name: "Ситилайт Decaux"},
  {name: "Ситилайт Decaux MUPI"},
];
const stubSide = [
  {name: "Скроллерная A"},
  {name: "Скроллерная B"},
];
const stubMarketSide = [
  {name: "Скроллерная A1"},
  {name: "Скроллерная A2"},
  {name: "Скроллерная A3"},
];


const srcValues0 = new GqlDatasource(null, null, stubValues0);
const srcValues1 = new GqlDatasource(null, null, stubValues1);
const srcModel = new GqlDatasource(null, null, stubModel);
const srcFormat = new GqlDatasource(null, null, stubFormat);
const srcSide = new GqlDatasource(null, null, stubSide);
const srcMarketSide = new GqlDatasource(null, null, stubMarketSide);

const OutdoorFurniture = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.outdoor_furniture}>
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <AdminConstructionItem title="Семейство" datasource={srcValues0}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Подсемейство" datasource={srcValues1}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Модель" datasource={srcModel}/>
          </Col>
        </RowMargin1st>
        <RowMargin2st xs={12}>
          <Col xs={4}>
            <AdminConstructionItem title="Формат" datasource={srcFormat}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Сторона" datasource={srcSide}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Рекламная сторона" datasource={srcMarketSide}/>
          </Col>
        </RowMargin2st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
