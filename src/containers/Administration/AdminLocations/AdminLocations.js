
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { useQuery, gql, useMutation } from '@apollo/client';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem, GqlDatasource } from '../components/AdminConstructionItem';



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

const GET_CITIES = gql`
  query SearchCity($title: String) {
    searchCity(title: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const GET_DISTRICTS = gql`
  query SearchCity($title: String) {
    searchDistrict(title: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const srcCities = new GqlDatasource(GET_CITIES, "searchCity",  stubCities);
const srcDistricts = new GqlDatasource(GET_DISTRICTS, "searchDistrict", stubDistricts);
const srcStreets = new GqlDatasource(null, null, stubStreets);

const AdminLocations = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.locations}>
      <Grid fluid className="resetPadding">
        <Row xs={12}  className="grid-row-margin-1st">
          <Col xs={4}>
            <AdminConstructionItem title="Список городов" datasource={srcCities} />
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Список районов" datasource={srcDistricts}  className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Названия улиц" datasource={srcStreets}/>
          </Col>
        </Row>
      </Grid>
    </AdminTopLayout>
  );
};

export default AdminLocations;
