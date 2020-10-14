import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import Multiline from '../../../../Inputs/Multiline';
import { useSelector, useDispatch } from 'react-redux';
import { DatePicker } from 'antd';

export const GroundAct = (props) => {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Акт на землю</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '49%' }}>
            <InputTitle>Номер</InputTitle>
            <InputAnchor placeholder="347856345" />
          </div>
          <div style={{ width: '49%' }}>
            <InputTitle>Дата</InputTitle>
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default GroundAct;
