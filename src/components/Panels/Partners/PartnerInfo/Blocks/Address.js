import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Radio, notification } from 'antd';
import styled from 'styled-components';

import { BlockBody, Row, Quarter, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect } from '../../../../../styles/styles';
import GroupRadio from '../../../../Inputs/GroupRadio';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import anchorIcon from '../../../../../img/input/anchor.svg';

export default function Adress() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();

  return (
    <Quarter style={{ height: '100%' }}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Город</InputTitle>

            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Алматы</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '58%' }}>
            <InputTitle>Доступность конструкции</InputTitle>

            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>Медеуский р-н.</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '38%' }}>
            <InputTitle>Почтовый индекс</InputTitle>

            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>1012034.</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>

            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>пр.Достык 25, офис 52</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Фактический адрес</InputTitle>

            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} alt="" />
                  <span>пр.Достык 25, офис 52</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
      </BlockBody>
    </Quarter>
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
