import React, { useContext } from 'react';
import { constructContext } from '../../../../../../containers/Base/Construction/Construction';
import { useQuery, gql, useMutation } from '@apollo/client';

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
const SIDE_DELETE = gql`
  mutation Delete($id: ID!) {
    deleteConstructionSide(id: $id) {
      deletedId
    }
  }
`;
export default function ExtraRow(props) {
  const [item, setItem] = useContext(constructContext);
  const [deleteConstructionSide] = useMutation(SIDE_DELETE);
  const deleteSide=()=>{
    deleteConstructionSide({variables:{id:item.constructionSide.edges[props.index].node.id}})
  }
  return (
    <Row>
      <InputWrapper>
        <InputTitle>Формат</InputTitle>
       
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
      <RedDeleteBtn onClick={deleteSide}>
        <img src={red_can} alt="" />
      </RedDeleteBtn>
    </Row>
  );
}
