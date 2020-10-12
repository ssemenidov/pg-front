import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import Multiline from '../../../../Inputs/Multiline';
import { getLocationProps } from '../../../../../store/actions/locationActions';
import { useSelector, useDispatch } from 'react-redux';

export const EditInformation = (props) => {
  const [item, setItem] = useContext(locationContext);
  const state = useSelector((state) => state.location.currentLocation);
  const dispatch = useDispatch();

  return (
    <Medium>
      <BlockTitle>Редактирование информации</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Площадь (га)</InputTitle>
            <InputAnchor
              value={item.area ? item.area :""}
              onChange={(e) => {setItem({...item, area:e.target.value})}}
              placeholder="34"
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Кадастровый номер</InputTitle>
            <InputAnchor

            value={item.cadastralNumber ? item.cadastralNumber :""}
            onChange={(e) => {setItem({...item, cadastralNumber:e.target.value})}}
              placeholder="00-000-000-000"
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Целевое назначение</InputTitle>
            <InputAnchor
            
              value={item.targetPurpose ? item.targetPurpose :""}
              onChange={(e) => {setItem({...item, targetPurpose:e.target.value})}}
              placeholder="Рекламно-информационный объект"
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Комментарий</InputTitle>
            
            <Multiline
              value={item.comment ? item.comment :""}
              onChange={(e) => {setItem({...item, comment:e.target.value})}}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
