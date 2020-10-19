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
            <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
      
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Агентская коммисия</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              ></StyledInput>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>АК распространяется</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
            
          </InputWrapper>
          <InputWrapper>
            <InputTitle>На какие услуги распространяется АК</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              ></StyledInput>

          </InputWrapper>
        </Row>
      </BlockBody>
    </Large>
  );
}
