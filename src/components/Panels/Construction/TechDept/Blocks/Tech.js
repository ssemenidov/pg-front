import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import { StyledInput, StyledSelect } from '../../../../../styles/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

export default function Tech() {
  const current = useSelector((state) => state.construction.currentConstruction);
  const dispatch = useDispatch();
  return (
    <Medium>
      <BlockTitle>Общие параметры</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Экипаж</InputTitle>
            {/* <InputAnchor
              value={current ? current.crew : ""}
              placeholder="Экипаж"
              onChange={(e) => dispatch(getConstructionProps("crew", e.target.value))}
            /> */}
            <StyledSelect
              defaultValue={
                <>
                  <img src={anchorIcon} />
                  <span>Экипаж</span>
                </>
              }
              suffixIcon={null}>
              <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
              <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Инвентарный номер</InputTitle>
            {/* <InputAnchor
              value={current ? current.generalInventoryNumber : ''}
              placeholder="Инвентарный"
              onChange={(e) => dispatch(getConstructionProps('generalInventoryNumber', e.target.value))}
            /> */}
            <StyledInput placeholder="Инвентарный номер" prefix={<img src={anchorIcon} />} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Номер телефона конструкции</InputTitle>
            {/* <InputAnchor
              value={current ? current.constructionPhoneNumber : ''}
              placeholder="Номер телефона"
              onChange={(e) => dispatch(getConstructionProps('constructionPhoneNumber', e.target.value))}
            /> */}
            <StyledInput placeholder="Номер телефона" prefix={<img src={anchorIcon} />} />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
