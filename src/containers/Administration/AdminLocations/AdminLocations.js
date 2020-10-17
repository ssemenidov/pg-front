import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import AdminConstructionItem from '../AdminOutdoorFurniture/ConstructionItem';


const stubCities = [
  { name: "Актау" },
  { name: "Алматы" },
  { name: "Атырау" },
  { name: "Актобе" },
  { name: "Балхаш" },
];

const stubDistricts = [
  { name: "Медеуский" },
  { name: "Турксибский" },
  { name: "Алмалинский" },
  { name: "Ауэзовский" },
  { name: "Бостандыкский" },
]

const stubStreets = [
  { name: "Майлина" },
  { name: "Монтажная" },
  { name: "Захарова" },
  { name: "Мирная" },
  { name: "Кубеева" },
]


const AdminLocations = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.locations}>
      <Grid fluid className="resetPadding">
        <Row xs={12}  className="grid-row-margin-1st">
          <Col xs={4}>
            <AdminConstructionItem title="Список городов" values={stubCities}/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Список районов" values={stubDistricts}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Названия улиц" values={stubStreets}/>
          </Col>
        </Row>
      </Grid>
    </AdminTopLayout>
  );
};

export default AdminLocations;
