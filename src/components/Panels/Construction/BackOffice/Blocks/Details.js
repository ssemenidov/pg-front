import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radio, notification } from 'antd';
import styled from 'styled-components';

import { BlockBody, Row, Medium, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect } from '../../../../../styles/styles';
import GroupRadio from '../../../../Inputs/GroupRadio';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import anchorIcon from '../../../../../img/input/anchor.svg';

const openNotification = (placement) => {
  notification.info({
    message: 'Уведомление',
    description: 'Нобходимо привязать местоположение к конструкции!',
    placement,
  });
};

export default function Details() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();

  return (
    <Medium>
      <BlockTitle>Детали конструкции</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Семейство конструкции</InputTitle>
            {/* <InputAnchor
              value={current.familyConstruction || ''}
              placeholder="Семейство"
              onChange={(e) => dispatch(getConstructionProps('familyConstruction', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Семейство</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Доступность конструкции</InputTitle>
            {/* <InputAnchor
              value={current.availabilityConstruction || ''}
              placeholder="Доступность"
              onChange={(e) => dispatch(getConstructionProps('availabilityConstruction', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Доступность</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Подсемейство конструкции</InputTitle>
            {/* <InputAnchor
              value={current.subfamilyConstruction || ''}
              placeholder="Подсемейство"
              onChange={(e) => dispatch(getConstructionProps('subfamilyConstruction', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Подсемейство</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Модель</InputTitle>
            {/* <InputAnchor
              value={current.model || ''}
              placeholder="Модель"
              onChange={(e) => dispatch(getConstructionProps('model', e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Модель</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle onClick={() => openNotification('bottomRight')}>Наличие земли (!)</InputTitle>
            {/* <GroupRadio
              value={current.availabilityLand || ''}
              onChange={(e) => dispatch(getConstructionProps('availabilityLand', e.target.value))}
            /> */}
            <StyledRadio>
              <Radio value={0}>Есть</Radio>
              <Radio value={1}>Нет</Radio>
            </StyledRadio>
          </div>
          <StyledButton backgroundColor="#2C5DE5">Открыть местоположение</StyledButton>
        </Row>
      </BlockBody>
    </Medium>
  );
}

const StyledRadio = styled(Radio.Group)`
  height: 40px !important;
  display: flex;
  align-items: center;

  span {
    color: #1a1a1a !important;
  }
`;
