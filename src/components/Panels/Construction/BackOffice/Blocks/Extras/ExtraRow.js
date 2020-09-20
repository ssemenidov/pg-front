import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { InputTitle, Row, BlockBody } from '../../../../../Styles/StyledBlocks';
import { StyledSelect } from '../../../../../../styles/styles';
import { RedDeleteBtn } from '../../../../../Styles/ButtonStyles';
import red_can from '../../../../../../img/outdoor_furniture/red_can.svg';
import InputAnchor from '../../../../../Inputs/InputAnchor';
import anchorIcon from '../../../../../../img/input/anchor.svg';

const InputWrapper = styled.div`
  width: 15%;
`;

export default function ExtraRow(props) {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();

  return (
    <Row>
      <InputWrapper>
        <InputTitle>Формат</InputTitle>
        {/* <InputAnchor
          value={props.current.format || ''}
          placeholder="Формат"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      format: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ]),
            );
          }}
        /> */}
        <StyledSelect
          defaultValue={
            <>
              <img src={anchorIcon} alt="" />
              <span>Формат</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Сторона</InputTitle>
        {/* <InputAnchor
          value={props.current.side || ''}
          placeholder="Сторона"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      side: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ])
            );
          }}
        /> */}
        <StyledSelect
          defaultValue={
            <>
              <img src={anchorIcon} alt="" />
              <span>Сторона</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Рекламная сторона</InputTitle>
        {/* <InputAnchor
          value={props.current.advertisingSide || ''}
          placeholder="Рекламная сторона"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      advertisingSide: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ]),
            );
          }}
        /> */}
        <StyledSelect
          defaultValue={
            <>
              <img src={anchorIcon} alt="" />
              <span>Рекламная сторона</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Назначение стороны</InputTitle>
        {/* <InputAnchor
          value={props.current.purposeSide || ''}
          placeholder="Назначение"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      purposeSide: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ]),
            );
          }}
        /> */}
        <StyledSelect
          defaultValue={
            <>
              <img src={anchorIcon} alt="" />
              <span>Назначение</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Размеры(см)</InputTitle>
        {/* <InputAnchor
          value={props.current.sizes || ''}
          placeholder="Размеры"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      sizes: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ]),
            );
          }}
        /> */}
        <StyledSelect
          defaultValue={
            <>
              <img src={anchorIcon} alt="" />
              <span>Размеры</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Доступность стороны</InputTitle>
        {/* <InputAnchor
          value={props.current.availabilitySide || ''}
          placeholder="Доступность"
          onChange={(e) => {
            dispatch(
              props.getConstructionProps('sides', [
                ...current.sides.map((side) => {
                  if (side._id === props.current._id) {
                    let obj = {
                      ...side,
                      availabilitySide: e.target.value,
                    };
                    return obj;
                  } else {
                    return side;
                  }
                }),
              ]),
            );
          }}
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
      </InputWrapper>
      <RedDeleteBtn onClick={props.removeClickHandler}>
        <img src={red_can} alt="" />
      </RedDeleteBtn>
    </Row>
  );
}
