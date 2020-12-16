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
<<<<<<< HEAD
const GET_SIZES = gql`
query {
  searchSideSize {
    sideSize {
      edges {
        node {
          id
          size
=======
const LOCATION_PURPOSE_T = gql`
  query SearchLocPurpose($title: String) {
    searchLocPurpose(title_Icontains: $title) {
      edges {
        node {
          id
          title
>>>>>>> c38f954764e0cd9eb44d707db0764e2ccdc22478
        }
      }
    }
  }
<<<<<<< HEAD
}
`

export default function ExtraRow(props) {
  const [apiData, setApiData] = useContext(constructContext);
  const side=apiData.ownedSides.edges[props.index].node;
  
  const sizes = useQuery(GET_SIZES).data;
=======
`;
const GET_FORMATS = gql`
  query SearchFormat($id: ID, $title: String) {
    searchFormat(model_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
const SIDE_T = gql`
  query searchSide($id: ID, $format: ID) {
    searchSide(format_Model_Underfamily_Family_Id: $id, format_Id: $format) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

const GET_ADV_SIDES = gql`
  query SearchAdvertisingSide($id: ID, $title: String) {
    searchAdvertisingSide(side_Id: $id, title_Icontains: $title) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;
function ExtraRow(props) {
  const [apiData, setApiData] = useContext(constructContext);
  const side = props.list[props.index].node;
>>>>>>> c38f954764e0cd9eb44d707db0764e2ccdc22478
  const [deleteConstructionSide] = useMutation(SIDE_DELETE);
  const deleteSide = (e) => {
    props.deleteHandler();
    e.preventDefault();
    deleteConstructionSide({ variables: { id: side.id } });
  };
  const format = useQuery(GET_FORMATS).data;
  const sideData = useQuery(SIDE_T).data;
  const adverstingSide = useQuery(GET_ADV_SIDES).data;
  const locationPurpose = useQuery(LOCATION_PURPOSE_T).data;
  return (
    <Row>
      <InputWrapper>
        <InputTitle>Формат</InputTitle>
        <StyledSelect
          defaultValue={side.advertisingSide ? side.advertisingSide.side.format.title : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, format: { ...apiData.format, id: value } })}>
          {format &&
            format.searchFormat &&
            [...format.searchFormat.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
              <StyledSelect.Option key={item.node.id} value={item.node.title}>
                <img src={anchorIcon} />
                <span>{item.node.title}</span>
              </StyledSelect.Option>
            ))}
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Сторона</InputTitle>

        <StyledSelect
          defaultValue={side.advertisingSide ? side.advertisingSide.side.title : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, side: { ...apiData.side, id: value } })}>
          {sideData &&
            sideData.searchSide &&
            [...sideData.searchSide.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
              <StyledSelect.Option key={item.node.id} value={item.node.title}>
                <img src={anchorIcon} />
                <span>{item.node.title}</span>
              </StyledSelect.Option>
            ))}
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Рекламная сторона</InputTitle>

        <StyledSelect
          defaultValue={side.advertisingSide ? side.advertisingSide.title : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, advertisingSide: { ...apiData.advertisingSide, id: value } })}>
          {adverstingSide &&
            adverstingSide.searchAdvertisingSide &&
            [...adverstingSide.searchAdvertisingSide.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
              <StyledSelect.Option key={item.node.id} value={item.node.title}>
                <img src={anchorIcon} />
                <span>{item.node.title}</span>
              </StyledSelect.Option>
            ))}
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Назначение стороны</InputTitle>
        <StyledSelect
          defaultValue={side.purposeSide ? side.purposeSide.title : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, purposeSide: { ...apiData.purposeSide, id: value } })}>
          {locationPurpose &&
            locationPurpose.searchLocPurpose &&
            [...locationPurpose.searchLocPurpose.edges, { node: { id: 'Empty', title: '' } }].map((item) => (
              <StyledSelect.Option key={item.node.id} value={item.node.title}>
                <img src={anchorIcon} />
                <span>{item.node.title}</span>
              </StyledSelect.Option>
            ))}
        </StyledSelect>
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Размеры(см)</InputTitle>
<<<<<<< HEAD
        <StyledSelect
              prefix={<img src={anchorIcon} />}
              defaultValue={side.advertisingSide ? side.advertisingSide.side.size : ''}
              onChange={(value) => setApiData({ ...apiData, size: value })}>

                {
                  sizes && sizes.searchSideSize.sideSize.edges.map((item)=>
                      <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                        <span>{item.node.size}</span>
                        </StyledSelect.Option>
                  )
                }

              </StyledSelect>
=======
        <StyledInput
          prefix={<img src={anchorIcon} />}
          defaultValue={side.advertisingSide ? side.advertisingSide.side.size : ''}
          onChange={(e) => setApiData({ ...apiData, size: e.target.value })}></StyledInput>
>>>>>>> c38f954764e0cd9eb44d707db0764e2ccdc22478
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Доступность стороны</InputTitle>
        <StyledSelect
          prefix={<img src={anchorIcon} />}
          defaultValue={side.availabilitySide ? side.availabilitySide : <img src={anchorIcon} />}
          onChange={(value) => setApiData({ ...apiData, availabilitySide: value })}>
          <StyledSelect.Option value={true}>
            <img src={anchorIcon} />
            <span> Доступна</span>
          </StyledSelect.Option>
          <StyledSelect.Option value={false}>
            <img src={anchorIcon} />
            <span>Недоступна</span>
          </StyledSelect.Option>
        </StyledSelect>
      </InputWrapper>
      <RedDeleteBtn onClick={deleteSide}>
        <img src={red_can} alt="" />
      </RedDeleteBtn>
    </Row>
  );
}
export default React.memo(ExtraRow);
