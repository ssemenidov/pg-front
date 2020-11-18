
import React from 'react';
import { Col } from 'react-flexbox-grid';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { GridNoPadding, RowMargin1st } from '../components/Styled'
import { LocationState } from '../AdminOutdoorFurniture/location_state';
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { AddSlider, EditSlider } from '../AdminOutdoorFurniture/Sliders';
import { RadiobuttonCRUDWithSearch } from '../AdminOutdoorFurniture/RadiobuttonCRUDWithSearch';

import { srcCountries, srcCities, srcDistricts } from './LocationDatasources';

const APPEND_TITLES = [
  "Страну", "Город", "Район"
]

const APPEND_TITLES2 = [
  "страны", "города", "района"
]

const AdminLocations = () => {
  const districts = new LocationState({title: "Список районов", datasource: srcDistricts, idx: 2});
  const cities = new LocationState({title: "Список городов", datasource: srcCities, idx: 1});
  const countries = new LocationState({title: "Список стран", datasource: srcCountries, idx: 0});
  districts.setParent(cities)
  cities.setParent(countries)

  const sliderState = new SliderState({name: "", key: ""})
  const chain = [ countries, cities, districts ];
  const propCtx = { chain, sliderState, APPEND_TITLES, APPEND_TITLES2  }

  return (
    <AdminTopLayout activeRoute={adminRoutesMap.locations}>
      {sliderState.addShowed && <AddSlider sliderState={sliderState} />}
      {sliderState.editMustShowed() && <EditSlider sliderState={sliderState} />}
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={countries} propCtx={propCtx} />
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={cities} propCtx={propCtx} className="grid-col-central-margin"/>
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={districts} propCtx={propCtx} />
          </Col>
        </RowMargin1st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default AdminLocations;
