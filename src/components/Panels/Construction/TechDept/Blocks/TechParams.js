import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BlockBody, BlockTitle, BlockTitleText, InputTitle, Medium, Row } from '../../../../Styles/StyledBlocks';
import { StyledInput, StyledSelect } from '../../../../../styles/styles';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import InputAnchor from '../../../../Inputs/InputAnchor';
import anchorIcon from '../../../../../img/input/anchor.svg';

export default function TechParams() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Технические параметры</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Техническая проблема</InputTitle>
            {/* <InputAnchor
              value={current ? current.techProblem : ""}
              onChange={(e) =>
                dispatch(getConstructionProps("techProblem", e.target.value))
              }
            /> */}
            <StyledSelect defaultValue={<img src={anchorIcon} />} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Комментарий</InputTitle>
            {/* <InputAnchor
              value={current ? current.techComment : ""}
              onChange={(e) =>
                dispatch(getConstructionProps("techComment", e.target.value))
              }
            /> */}
            <StyledInput placeholder="..." prefix={<img src={anchorIcon} />} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Статус по подключению</InputTitle>
            {/* <InputAnchor
              value={current ? current.connectionStatus : ""}
              onChange={(e) =>
                dispatch(getConstructionProps("connectionStatus", e.target.value))
              }
            /> */}
            <StyledSelect defaultValue={<img src={anchorIcon} />} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Помеха</InputTitle>
            {/* <InputAnchor
              value={current ? current.markup : ''}
              onChange={(e) => dispatch(getConstructionProps('markup', e.target.value))}
            /> */}
            <StyledSelect defaultValue={<img src={anchorIcon} />} suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
