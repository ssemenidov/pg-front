import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';
import AdminConstructionItem from './ConstructionItem';
import { Col, Grid, Row } from 'react-flexbox-grid';

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

const OutdoorFurniture = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.outdoor_furniture}>
      <Grid fluid className="resetPadding">
        <Row xs={12}  className="grid-row-margin-1st">
          <Col xs={4}>
            <AdminConstructionItem title="Семейство" values={stubValues0}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Подсемейство" values={stubValues1}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Модель" values={stubModel}/>
          </Col>
        </Row>
        <Row xs={12} className="grid-row-margin-2nd">
          <Col xs={4}>
            <AdminConstructionItem title="Формат" values={stubFormat}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Сторона" values={stubSide}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Рекламная сторона" values={stubMarketSide}/>
          </Col>
        </Row>
      </Grid>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
