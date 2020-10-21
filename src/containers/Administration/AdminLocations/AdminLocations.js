
import React from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { useQuery, gql, useMutation } from '@apollo/client';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem } from '../AdminOutdoorFurniture/AdminConstructionItem';
import { GqlDatasource } from '../components/gql_datasource';
import { GridNoPadding, RowMargin1st } from '../components/Styled'
import { LocationState } from '../components/location_state';
import { srcAdvSide } from '../AdminOutdoorFurniture/LocationDatasources';
import { SliderState } from '../components/SlidingBottomPanel/SliderState';
import { AddSlider, EditSlider } from '../AdminOutdoorFurniture/Sliders';
import { RadiobuttonCRUDWithSearch } from '../AdminOutdoorFurniture/RadiobuttonCRUDWithSearch';


const stubStreets = [
  { name: "Майлина", childs: null },
  { name: "Монтажная", childs: null },
  { name: "Захарова", childs: null },
  { name: "Мирная", childs: null },
  { name: "Кубеева", childs: null },
];

const stubDistricts = [
  { name: "Медеуский", childs: stubStreets },
  { name: "Турксибский", childs: stubStreets },
  { name: "Алмалинский", childs: stubStreets },
  { name: "Ауэзовский", childs: stubStreets },
  { name: "Бостандыкский", childs: stubStreets },
];

const stubCities = [
  { name: "Актау", childs: stubDistricts },
  { name: "Алматы", childs: {} },
  { name: "Атырау", childs: stubDistricts },
  { name: "Актобе", childs: stubDistricts },
  { name: "Балхаш", childs: stubDistricts },
];



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

const srcCities = new GqlDatasource({query: GET_CITIES, method: "searchCity",  stub: stubCities});
const srcDistricts = new GqlDatasource({query: GET_DISTRICTS, method: "searchDistrict", stub: stubDistricts});
const srcStreets = new GqlDatasource({query: null, method: null, stub: stubStreets});


const AdminLocations = () => {
  const streets = new LocationState({title: "Названия улиц", datasource: srcStreets, idx: 2});
  const districts = new LocationState({title: "Список районов", datasource: srcDistricts, idx: 1});
  const cities = new LocationState({title: "Список городов", datasource: srcCities, idx: 0});
  districts.setParent(cities)
  streets.setParent(districts)

  const sliderState = new SliderState({name: "", key: ""})
  const chain = [ cities, districts, streets ];
  const propCtx = { chain, sliderState }

  return (
    <AdminTopLayout activeRoute={adminRoutesMap.locations}>
      {sliderState.addShowed && <AddSlider sliderState={sliderState} />}
      {sliderState.editMustShowed() && <EditSlider sliderState={sliderState} />}
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={cities} propCtx={propCtx} />
          </Col>
          <Col xs={4}>
            <AdminConstructionItem location={districts} propCtx={propCtx} className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <AdminConstructionItem location={streets} propCtx={propCtx} />
          </Col>
        </RowMargin1st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default AdminLocations;
