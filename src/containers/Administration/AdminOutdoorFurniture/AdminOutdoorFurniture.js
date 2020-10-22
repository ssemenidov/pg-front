import React, { useState, useEffect } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem } from './AdminConstructionItem';
import { GridNoPadding, RowMargin1st, RowMargin2st } from '../components/Styled';
import { SlidingBottomPanel } from '../components/SlidingBottomPanel/SlidingBottomPanel';
import { LocationCRUDForm } from './LocationCRUDForm';
import { SliderState } from '../components/SlidingBottomPanel/SliderState';
import { LocationState } from './location_state';
import { AddSlider, EditSlider } from './Sliders';
import { RadiobuttonCRUDWithSearch } from './RadiobuttonCRUDWithSearch';
import {srcFamily, srcSubFamily, srcModel, srcFormat, srcSide, srcAdvSide } from './OutdoorFurnitureDatasources'


const APPEND_TITLES = [
  "Семейство", "Подсемейство", "Модель", "Формат", "Сторону", "Рекламную сторону"
]

const APPEND_TITLES2 = [
  "семейства", "подсемейства", "модели", "формата", "стороны", "рекламной стороны"
]


function OutdoorFurniture() {
  const advSide = new LocationState({title: "Рекламная сторона", datasource: srcAdvSide, idx: 5});
  const side = new LocationState({title: "Сторона", datasource: srcSide, childType: advSide, idx: 4});
  const format = new LocationState({title: "Формат", datasource: srcFormat, childType: side, idx: 3});
  const model = new LocationState({title: "Модель", datasource: srcModel, childType: format, idx: 2});
  const subFamily = new LocationState({title: "Подсемейство", datasource: srcSubFamily, childType: model, idx: 1});
  const family = new LocationState({title: "Семейство", datasource: srcFamily, childType: subFamily, idx: 0});
  subFamily.setParent(family);
  model.setParent(subFamily);
  format.setParent(model);
  side.setParent(format);
  advSide.setParent(side);

  const sliderState = new SliderState({name: "", key: ""})
  const chain = [ family, subFamily, model, format, side, advSide ];
  const propCtx = { chain, sliderState, APPEND_TITLES, APPEND_TITLES2 }

  return (
    <AdminTopLayout activeRoute={adminRoutesMap.outdoor_furniture}>
      {sliderState.addShowed && <AddSlider sliderState={sliderState} />}
      {sliderState.editMustShowed() && <EditSlider sliderState={sliderState} />}
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={family} propCtx={propCtx}/>
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={subFamily} className="grid-col-central-margin" propCtx={propCtx}/>
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={model} className="grid-col-central-margin" propCtx={propCtx}/>
          </Col>
        </RowMargin1st>
        <RowMargin2st xs={12}>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={format} propCtx={propCtx} />
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={side} className="grid-col-central-margin" propCtx={propCtx} />
          </Col>
          <Col xs={4}>
            <RadiobuttonCRUDWithSearch location={advSide} propCtx={propCtx} />
          </Col>
        </RowMargin2st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
