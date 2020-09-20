import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../styles/styles';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';

import cityIcon from '../../../../../img/input/input-city.svg';
import anchorIcon from '../../../../../img/input/anchor.svg';
import mailIcon from '../../../../../img/input/mail.svg';
import ownerIcon from '../../../../../img/input/owner.svg';

export default function Intro() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Город</InputTitle>
            {/* <InputAnchor
              value={current.city || ''}
              placeholder="Город"
              onChange={(e) => dispatch(getConstructionProps('city', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={cityIcon} />
                  <span>Город</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '35%' }}>
            <InputTitle>Район</InputTitle>
            {/* <InputAnchor
              value={current.district || ''}
              placeholder="Район"
              onChange={(e) => dispatch(getConstructionProps('district', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} />
                  <span>Район</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '22%' }}>
            <InputTitle>Код района</InputTitle>
            {/* <InputAnchor
              value={current.postalCode || ''}
              placeholder="Индекс"
              onChange={(e) => dispatch(getConstructionProps('postalCode', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={mailIcon} />
                  <span>Код</span>
                </>
              }>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Владелец</InputTitle>
            {/*<InputAnchor
              value={current.owner || ''}
              placeholder="Владелец"
              onChange={(e) => dispatch(getConstructionProps('owner', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={ownerIcon} />
                  <span>Владелец</span>
                </>
              }>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            {/* <InputAnchor
              value={current.marketingAddress || ''}
              placeholder="Маркетинговый адрес"
              onChange={(e) => dispatch(getConstructionProps('marketingAddress', e.target.value))}
            /> */}
            <StyledInput prefix={<img src={anchorIcon} />} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            {/* <DatePicker
              value={current.dateOfCreation || new Date()}
              onChange={(e) => {
                dispatch(getConstructionProps('dateOfCreation', e.toString()));
              }}
            /> */}
            <StyledDatePicker />
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            {/* <Multiline
              value={current.generalComment || ''}
              onChange={(e) => dispatch(getConstructionProps('generalComment', e.target.value))}
            /> */}
            <StyledInput placeholder={'...'} />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
