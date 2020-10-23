import React, { useContext, useEffect } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect , StyledInput} from '../../../../../styles/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

import {DatePicker,Select,Input} from 'antd';
export const Contract = (props) => {
  const [item, setItem] = useContext(locationContext);

  return (
    <Medium>
      <BlockTitle>Договор аренды</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '19%' }}>
            <InputTitle>Статус оформления</InputTitle>
            <StyledSelect>
              <StyledSelect.Option value='case 1'>case 1</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Номер договора</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.areaAct ? item.areaAct : ''}
              onChange={(e) => {setItem({...item, areaAct: e.target.value})}}
            ></StyledInput>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Начало договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
            />
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
