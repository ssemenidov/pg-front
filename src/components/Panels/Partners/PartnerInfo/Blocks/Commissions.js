import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../styles/styles';


import { BlockBody, Large, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import styled from 'styled-components';
import anchorIcon from '../../../../../img/input/anchor.svg';
const InputWrapper = styled.div`
  width: 22%;
`;

export default function Commissions() {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Large>
      <BlockTitle style={{ padding: '15px 26px 15px 24px' }}>Агентская коммисия</BlockTitle>
      <BlockBody>
        <Row>
          <InputWrapper>
            <InputTitle>Тип АК</InputTitle>
            <StyledSelect
              defaultValue={item.agencyCommissionType && item.agencyCommissionType.id }
              onChange={(value) => setItem({ ...item, agencyCommissionType: { ...item.agencyCommissionType, id: value } })}>

            </StyledSelect>
      
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Агентская коммисия</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}      
              defaultValue={item.agencyCommission ? item.agencyCommission : ''}
              onChange={(e) => setItem({ ...item, agencyCommission: e.target.value })}></StyledInput>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>АК распространяется</InputTitle>
            <StyledSelect>

            </StyledSelect>
            
          </InputWrapper>
          <InputWrapper>
            <InputTitle>На какие услуги распространяется АК</InputTitle>
            <StyledSelect>

            </StyledSelect>
          </InputWrapper>
        </Row>
      </BlockBody>
    </Large>
  );
}
