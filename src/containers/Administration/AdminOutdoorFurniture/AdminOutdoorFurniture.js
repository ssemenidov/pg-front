import React, { useState } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';

import styled from 'styled-components';
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminConstructionItem } from '../components/AdminConstructionItem';
import { GqlDatasource } from '../components/gql_datasource';
import { GridNoPadding, RowMargin1st, RowMargin2st } from '../components/Styled';
import SlidingBottomPanel from '../components/SlidingBottomPanel/SlidingBottomPanel';
import { PersonCRUDForm } from '../Person/PersonCRUDForm';
import { CRUDForm } from '../components/SlidingBottomPanel/CRUDForm';
import {
  adaptivCol,
  adaptiveRow, SliderCellColRaw,
  SliderCol,
  SliderFormItem,
  SliderGrid, StyledButtonSlider, StyledOption,
  StyledSelect,
} from '../components/SlidingBottomPanel/PanelComponents';
import { Input } from 'antd';

const stubAdvSide = [
  {name: "Скроллерная A1", childs: null},
  {name: "Скроллерная A2", childs: null},
  {name: "Скроллерная A3", childs: null},
];
const stubSide = [
  {name: "Скроллерная A", childs: stubAdvSide},
  {name: "Скроллерная B", childs: stubAdvSide},
];
const stubFormat = [
  {name: "Ситилайт Decaux", childs: {}},
  {name: "Ситилайт Decaux MUPI", childs: stubSide},
];
const stubModel = [
  {name: "CIP Forum", childs: stubFormat},
  {name: "CIP Szekely", childs: stubFormat},
];
const stubValues1 = [
  {name: "Европейское", childs: stubModel},
];
const stubValues0 = [
  {name: "Сениор", childs: {}},
  {name: "Мюпи", childs: stubValues1},
  {name: "Флагштоки", childs: stubValues1},
  {name: "Остановки", childs: {}},
  {name: "Созданная конструкция №1", childs: stubValues1},
];


const srcValues0 = new GqlDatasource(null, null, stubValues0);
const srcValues1 = new GqlDatasource(null, null, stubValues1);
const srcModel = new GqlDatasource(null, null, stubModel);
const srcFormat = new GqlDatasource(null, null, stubFormat);
const srcSide = new GqlDatasource(null, null, stubSide);
const srcAdvSide = new GqlDatasource(null, null, stubAdvSide);


function hasEmpty(objects, length = null) {
  if (length === null) {
    length = objects.length;
  }
  for (let i = 0; i < length; ++i) {
    let obj = objects[i];
    if (Object.keys(obj).length === 0 && obj.constructor === Object)
      return true;
  }
  return false;
};


function generateSelector(datasource, setState, cleanupChain, idx) {
  return (data) => {
    if (datasource)
      datasource.setFilter(datasource.filter); // TODO
    if (setState) {
      if (data.childs !== null && !hasEmpty([data.childs])) {
        setState(data.childs);
      }
      else if (cleanupChain.length > idx) {
        for (let i = idx; i < cleanupChain.length; ++i) {
          cleanupChain[i]({});
        }
      }
    }
  };
};


const APPEND_TITLES = [
  "Семейство", "Подсемейство", "Модель", "Формат", "Сторону", "Рекламную сторону"
]
const APPEND_TITLES2 = [
  "семейства", "подсемейства", "модели", "формата", "стороны", "рекламной стороны"
]

function ConstructionItemChain({title, datasource, nextDatasource, setState, idx = 0,
                                 propCtx: { stateChain, cleanupChain, createAddSlider,  createEditSlider }})
{
  const appendHandler = (event) => {
    createAddSlider(APPEND_TITLES[idx], APPEND_TITLES2[idx]);
  };

  let editHandler = (event, record) => {
    event.preventDefault();
    createEditSlider(event, record, APPEND_TITLES[idx], APPEND_TITLES2[idx]);
  };

  if (stateChain === null || !idx || !hasEmpty(stateChain, idx))
    return <AdminConstructionItem title={title}
                                  datasource={datasource}
                                  selectHandler={generateSelector(nextDatasource, setState, cleanupChain, idx)}
                                  appendHandler={appendHandler} editHandler={editHandler}
    />
  return <></>;
}

const StyledButtonSliderW10rem = styled(StyledButtonSlider)`
    max-width: 15rem;
`

export function LocationCRUDForm({actionText="Добавить", entityName, ...props}) {
  const requiredProps = { rules: [ { required: true } ] };
  return (
    <CRUDForm {...props}>
      <SliderGrid fluid>
        <RowMargin1st {...{xl: 7, lg: 9, md: 12}}>
          <SliderCellColRaw {...{xl: 4, lg: 5, md: 8}}>
            <SliderFormItem label={`Название ${entityName}`} {...requiredProps} name='name'>
              <Input placeholder={`Введите название ${entityName}`} size={'large'} />
            </SliderFormItem>
          </SliderCellColRaw>
          <SliderCellColRaw {...{xl: 2, lg: 3, md: 4}}>
            <StyledButtonSliderW10rem type="primary" htmlType="submit">
              {actionText}
            </StyledButtonSliderW10rem>
          </SliderCellColRaw>
        </RowMargin1st>
      </SliderGrid>
    </CRUDForm>
  );
}


function AddSlider({closeHandler, title}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title={`Добавить ${title[0]}`} onClose={closeHandler}>
      <LocationCRUDForm actionText={"Добавить"} onFinish={onFinish}
                        entityName={title[1]}
      />
    </SlidingBottomPanel>
  )
}


function EditSlider({closeHandler, initialValues, title}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <SlidingBottomPanel title={`Редактировать ${title[0]}`} onClose={closeHandler}>
      <LocationCRUDForm actionText={"Сохранить изменения"} onFinish={onFinish} initialValues={initialValues}
                        entityName={title[1]}
      />
    </SlidingBottomPanel>
  )
}


function OutdoorFurniture() {
  let [selectedFamily, setSelectedFamily] = useState({});
  let [selectedSubFamily, setSelectedSubFamily] = useState({});
  let [selectedModel, setSelectedModel] = useState({});
  let [selectedFormat, setSelectedFormat] = useState({});
  let [selectedSide, setSelectedSide] = useState({});
  let [selectedAdvSide, setSelectedAdvSide] = useState({});

  let [sliderTitle, setSliderTitle] = useState(["", ""])

  const cleanupChain = [
    setSelectedFamily, setSelectedSubFamily, setSelectedModel, setSelectedFormat, setSelectedSide, setSelectedAdvSide
  ];
  const stateChain = [
    selectedFamily, selectedSubFamily, selectedModel, selectedFormat, selectedSide
  ];

  const [sliderAddShowed, setSliderAddShowed] = useState(false);
  const [sliderEditShowed, setSliderEditShowed] = useState(false);
  const [editedUserData, setEditedUserData] = useState({})

  const createAddSlider = ((title, title2) => {
    setSliderAddShowed(true);
    setSliderTitle([title, title2]);
  });
  const closeAddSlider = ((event) => { setSliderAddShowed(false); });

  // onClick={(event) => record.openEditSlider(event, record)}
  const createEditSlider = ((event, record, title, title2) => {
    let newState = Object.fromEntries(Object.keys(editedUserData).map((key) => [key, record[key]]));
    setEditedUserData(newState);

    if (sliderAddShowed)
      return;

    setSliderTitle([title, title2]);
    setSliderEditShowed(true);
  });

  const closeEditSlider = ((event) => { setSliderEditShowed(false) });

  const propCtx = { cleanupChain, stateChain, createAddSlider, createEditSlider }

  return (
    <AdminTopLayout activeRoute={adminRoutesMap.outdoor_furniture}>
      {sliderAddShowed && <AddSlider closeHandler={closeAddSlider} title={sliderTitle}/>}
      {(sliderEditShowed && !sliderAddShowed) && <EditSlider closeHandler={closeEditSlider}
                                                             initialValues={editedUserData}
                                                             title={sliderTitle}
      />}
      <GridNoPadding fluid>
        <RowMargin1st xs={12}>
          <Col xs={4}>
            <ConstructionItemChain title="Семейство" datasource={srcValues0} nextDatasource={srcValues1}
                                   setState={setSelectedFamily} propCtx={propCtx} idx={0}
            />
          </Col>
          <Col xs={4}>
            <ConstructionItemChain title="Подсемейство" datasource={srcValues1} nextDatasource={srcModel}
                                   className="grid-col-central-margin"
                                   setState={setSelectedSubFamily} propCtx={propCtx} idx={1}
            />
          </Col>
          <Col xs={4}>
            <ConstructionItemChain title="Модель" datasource={srcModel} nextDatasource={srcFormat}
                                   className="grid-col-central-margin"
                                   setState={setSelectedModel} propCtx={propCtx} idx={2}
            />
          </Col>
        </RowMargin1st>
        <RowMargin2st xs={12}>
          <Col xs={4}>
            <ConstructionItemChain title="Формат" datasource={srcFormat} nextDatasource={srcSide}
                                   setState={setSelectedFormat} propCtx={propCtx} idx={3}
            />
          </Col>
          <Col xs={4}>
            <ConstructionItemChain title="Сторона" datasource={srcSide} nextDatasource={srcAdvSide}
                                   className="grid-col-central-margin"
                                   setState={setSelectedSide} propCtx={propCtx} idx={4}
            />
          </Col>
          <Col xs={4}>
            <ConstructionItemChain title="Рекламная сторона" datasource={srcAdvSide} nextDatasource={null}
                                   setState={setSelectedAdvSide} propCtx={propCtx} idx={5}
            />
          </Col>
        </RowMargin2st>
      </GridNoPadding>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
