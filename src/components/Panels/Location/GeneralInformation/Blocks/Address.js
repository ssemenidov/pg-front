import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { getLocationProps } from '../../../../../store/actions/locationActions';
import { useSelector, useDispatch } from 'react-redux';
import { StyledSelect } from '../../../../../styles/styles';

export const Address = (props) => {
  const state = useSelector((state) => state.location.currentLocation);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            {/* <InputTitle>Город</InputTitle>
            <InputAnchor
              value={Object.keys(state).length !== 0 ? state.city : ''}
              onChange={(e) => dispatch(getLocationProps('city', e.target.value))}
              placeholder="Алматы"
            /> */}
            <InputTitle>Город</InputTitle>
            <StyledSelect defaultValue={<span>Город</span>} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Район</InputTitle>
            {/* <InputAnchor
              value={Object.keys(state).length !== 0 ? state.district : ''}
              onChange={(e) => dispatch(getLocationProps('district', e.target.value))}
              placeholder="Медеуский р-н."
            /> */}
            <StyledSelect defaultValue={<span>Район</span>} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код района</InputTitle>
            {/* <InputAnchor
              value={Object.keys(state).length !== 0 ? state.postalCode : ''}
              onChange={(e) => dispatch(getLocationProps('postalCode', e.target.value))}
              placeholder="1012034"
            /> */}
            <StyledSelect defaultValue={<span>Код района</span>} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>
            {/* <InputAnchor
              value={Object.keys(state).length !== 0 ? state.legalAddress : ''}
              onChange={(e) => dispatch(getLocationProps('legalAddress', e.target.value))}
              placeholder="Абая - ост. ГорВодоКанал"
            /> */}
            <StyledSelect defaultValue={<span>Юридический адрес</span>} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Address;
