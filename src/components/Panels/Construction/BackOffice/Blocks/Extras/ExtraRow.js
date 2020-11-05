import React, { useContext } from 'react';
import { constructContext } from '../../../../../../containers/Base/Construction/Construction';
import { useQuery, gql, useMutation } from '@apollo/client';

import styled from 'styled-components';

import { InputTitle, Row, BlockBody } from '../../../../../Styles/StyledBlocks';

import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../Styles/DesignList/styles';

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
  const side=item.constructionSide.edges[props.index].node;
  const [deleteConstructionSide] = useMutation(SIDE_DELETE);
  const deleteSide=()=>{
    deleteConstructionSide({variables:{id:side.id}})
  }
  return (
    <Row>
      <InputWrapper>
        <InputTitle>Формат</InputTitle>

        <StyledSelect
              defaultValue={side.format ? side.format.id:<img src={anchorIcon} /> }
              onChange={(value) => setItem({ ...item, format: { ...item.format, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Сторона</InputTitle>

        <StyledSelect
              defaultValue={side.side ? side.side.id :<img src={anchorIcon} />}
              onChange={(value) => setItem({ ...item, side: { ...item.side, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Рекламная сторона</InputTitle>

        <StyledSelect
              defaultValue={side.advertisingSide ? (<><img src={anchorIcon} />{side.advertisingSide.id}</>) :<img src={anchorIcon} />}
              onChange={(value) => setItem({ ...item, advertisingSide: { ...item.advertisingSide, id: value } })}>
        
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Назначение стороны</InputTitle>
        <StyledSelect
              defaultValue={side.purposeSide ? side.purposeSide.id :<img src={anchorIcon} />}
              onChange={(value) => setItem({ ...item, purposeSide: { ...item.purposeSide, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Размеры(см)</InputTitle>
        <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={side.size ? side.size : ''}
              onChange={(e) => setItem({ ...item, size: e.target.value })}></StyledInput>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Доступность стороны</InputTitle>
        <StyledSelect
          prefix={<img src={anchorIcon} />}
          defaultValue={side.availabilitySide ? side.availabilitySide : <img src={anchorIcon} />}
          onChange={(value) => setItem({ ...item, availabilitySide: value })}>
            <StyledSelect.Option value={true}><img src={anchorIcon} /><span> Доступна</span></StyledSelect.Option>
            <StyledSelect.Option value={false}><img src={anchorIcon} /><span>Недоступна</span></StyledSelect.Option>
        </StyledSelect>
      

      </InputWrapper>
      <RedDeleteBtn onClick={deleteSide}>
        <img src={red_can} alt="" />
      </RedDeleteBtn>
    </Row>
  );
}
