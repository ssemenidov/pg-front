import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';


import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import { StyledInput, StyledSelect } from '../../../../Styles/DesignList/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

export default function Tech() {
  const [item, setItem] = useContext(constructContext);
  return (
    <Medium>
      <BlockTitle>Общие параметры</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Экипаж</InputTitle>
            <StyledSelect
              defaultValue={item.crew ? item.crew.id:<img src={anchorIcon} /> }
              onChange={(value) => setItem({ ...item, crew: { ...item.crew, id: value } })}>
              <StyledSelect.Option value="Q3Jld05vZGU6MQ==">
              <img src={anchorIcon} />
              <span>Тусупбеков</span> 
                </StyledSelect.Option>

            </StyledSelect>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Инвентарный номер</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techInventNumber ? item.techInventNumber : ''}
              onChange={(e) => setItem({ ...item, techInventNumber: e.target.value })}></StyledInput>

          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Номер телефона конструкции</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techPhoneConstruction ? item.techPhoneConstruction : ''}
              onChange={(e) => setItem({ ...item, techPhoneConstruction: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
