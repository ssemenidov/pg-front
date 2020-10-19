
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { useQuery, gql, useMutation } from '@apollo/client';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem } from '../components/AdminConstructionItem';
import { GqlDatasource } from '../components/gql_datasource';
import { GridNoPadding, RowMargin1st } from '../components/Styled'



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
  query SearchDistrict($title: String) {
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
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <AdminConstructionItem title="Список городов" datasource={srcCities} />
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Список районов" datasource={srcDistricts} className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem title="Названия улиц" datasource={srcStreets}/>
          </Col>
        </RowMargin1st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default AdminLocations;
