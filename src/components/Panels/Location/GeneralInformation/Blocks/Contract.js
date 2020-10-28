import React, { useContext, useEffect } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect , StyledInput} from '../../../../Styles/DesignList/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

import {DatePicker,Select,Input} from 'antd';
import moment from "moment";
export const Contract = (props) => {
  const [item, setItem] = useContext(locationContext);

  function onChangeDatePicker(date, fieldName) {
    const dateNow = date && date;

    if(dateNow) {
      setItem({
        ...item,
        [fieldName]: new Date(dateNow)
      })
    }
  }

  function handleChangeSelect(value) {
    setItem({
      ...item,
      rentRegistrationStatus: value
    })
  }

  useEffect(() => {
    console.log('change item ', item)
  }, [item]);

  return (
    <Medium>
      <BlockTitle>Договор аренды</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '19%' }}>
            <InputTitle>Статус оформления</InputTitle>
            <StyledSelect
              onChange={handleChangeSelect}
              defaultValue={item.rentRegistrationStatus ? item.rentRegistrationStatus : ''}
            >
              <StyledSelect.Option value='case 1'>case 1</StyledSelect.Option>
              <StyledSelect.Option value='case 2'>case 2</StyledSelect.Option>
              <StyledSelect.Option value='case 3'>case 3</StyledSelect.Option>
              <StyledSelect.Option value='case 4'>case 4</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Номер договора</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.rentContractNumber ? item.rentContractNumber : ''}
              onChange={(e) => {setItem({...item, rentContractNumber: e.target.value })}}
            ></StyledInput>
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Начало договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractStart ? moment(item.rentContractStart) : ''}
              onChange={(e) => onChangeDatePicker(e, 'rentContractStart')}
            />
          </div>

          <div style={{ width: '19%' }}>
            <InputTitle>Регистрация договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractCreatedAt ? moment(item.rentContractCreatedAt) : ''}
              onChange={(e) => onChangeDatePicker(e, 'rentContractCreatedAt')}
            />
          </div>
          <div style={{ width: '19%' }}>
            <InputTitle>Окончание договора</InputTitle>
            <DatePicker
              placeholder="01/01/2020"
              size={'large'}
              format='DD/MM/YYYY'
              style={{ width: '100%' }}
              defaultValue={item.rentContractEnd ? moment(item.rentContractEnd) : ''}
              onChange={(e) => onChangeDatePicker(e, 'rentContractEnd')}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Contract;
