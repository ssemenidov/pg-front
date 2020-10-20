import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import Multiline from '../../../../Inputs/Multiline';
import { useSelector, useDispatch } from 'react-redux';
import {DatePicker,Select} from 'antd';
export const Contract = (props) => {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Договор аренды</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '19%' }}>
            <InputTitle>Статус оформления</InputTitle>
            <InputAnchor placeholder="На оформлении" />
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Номер договора</InputTitle>
            <InputAnchor placeholder="347856345" />
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Начало договора</InputTitle>
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
          </div>
          
          <div style={{ width: '19%' }}>
            <InputTitle>Регистрация договора</InputTitle>
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Окончание договора</InputTitle>
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Contract;
