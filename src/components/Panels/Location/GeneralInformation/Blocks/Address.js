import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { getLocationProps } from '../../../../../store/actions/locationActions';
import { useSelector, useDispatch } from 'react-redux';
import { StyledSelect } from '../../../../../styles/styles';

export const Address = (props) => {
  const [item, setItem] = useContext(locationContext);

  return (
    <Medium style={{    height: '100%'}}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
         
            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={item.city ? item.city.id : 'Город'}
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
              <StyledSelect.Option value="Q2l0eU5vZGU6MQ==">Алматы</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mg==">Астана</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mw==">Караганда</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6NA==">Тараз</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Район</InputTitle>
       
            <StyledSelect defaultValue={<span>Район</span>} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код района</InputTitle>
      
            <InputAnchor
              value={item.postcode? item.postcode:""}
              onChange={(e) => {setItem({...item, postcode:e.target.value})}}
              placeholder="Код района"
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>
            <InputAnchor
              value={item.address? item.address:""}
              onChange={(e) => {setItem({...item, address:e.target.value})}}
              placeholder="Абая - ост. ГорВодоКанал"
            />
  
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Address;
