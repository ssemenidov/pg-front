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
  const [apiData, setApiData] = useContext(constructContext);
  const side=apiData.ownedSides.edges[props.index].node;
  const [deleteConstructionSide] = useMutation(SIDE_DELETE);
  const deleteSide=()=>{
    deleteConstructionSide({variables:{id:side.id}})
  }
  return (
    <Row>
      <InputWrapper>
        <InputTitle>Формат</InputTitle>

        <StyledSelect
              defaultValue={side.advertisingSide ? side.advertisingSide.side.format.title:<img src={anchorIcon} /> }
              onChange={(value) => setApiData({ ...apiData, format: { ...apiData.format, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Сторона</InputTitle>

        <StyledSelect
              defaultValue={side.advertisingSide ? side.advertisingSide.side.title :<img src={anchorIcon} />}
              onChange={(value) => setApiData({ ...apiData, side: { ...apiData.side, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Рекламная сторона</InputTitle>

        <StyledSelect
              defaultValue={side.advertisingSide ? side.advertisingSide.title :<img src={anchorIcon} /> }
              onChange={(value) => setApiData({ ...apiData, advertisingSide: { ...apiData.advertisingSide, id: value } })}>

        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Назначение стороны</InputTitle>
        <StyledSelect
              defaultValue={side.purposeSide ? side.purposeSide.title :<img src={anchorIcon} />}
              onChange={(value) => setApiData({ ...apiData, purposeSide: { ...apiData.purposeSide, id: value } })}>
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Размеры(см)</InputTitle>
        <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={side.advertisingSide ? side.advertisingSide.side.size : ''}
              onChange={(e) => setApiData({ ...apiData, size: e.target.value })}></StyledInput>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Доступность стороны</InputTitle>
        <StyledSelect
          prefix={<img src={anchorIcon} />}
          defaultValue={side.availabilitySide ? side.availabilitySide : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, availabilitySide: value })}>
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
