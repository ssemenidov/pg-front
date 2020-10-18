import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem, GqlDatasource } from '../components/AdminConstructionItem';

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
      <Grid fluid className="resetPadding">
        <Row xs={12}  className="grid-row-margin-1st">
          <Col xs={4}>
            <AdminConstructionItem title="Семейство" datasource={srcValues0}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Подсемейство" datasource={srcValues1}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Модель" datasource={srcModel}/>
          </Col>
        </Row>
        <Row xs={12} className="grid-row-margin-2nd">
          <Col xs={4}>
            <AdminConstructionItem title="Формат" datasource={srcFormat}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Сторона" datasource={srcSide}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Рекламная сторона" datasource={srcMarketSide}/>
          </Col>
        </Row>
      </Grid>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
