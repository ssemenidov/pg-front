import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import { BlockBody, Quarter, BlockTitle, InputTitle, Row } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect , StyledInput} from '../../../../../styles/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';

export default function BankAccount() {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Quarter style={{ height: '100%' }}>
      <BlockTitle>Банковский счет</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Банк получателя</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}      
              defaultValue={item.legalAddress ? item.legalAddress : ''}
              onChange={(e) => setItem({ ...item, legalAddress: e.target.value })}></StyledInput>
            
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>ИИК</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}      
              defaultValue={item.iik ? item.iik : ''}
              onChange={(e) => setItem({ ...item, iik: e.target.value })}></StyledInput>
            
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>БИК</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}      
              defaultValue={item.bik ? item.bik : ''}
              onChange={(e) => setItem({ ...item, bik: e.target.value })}></StyledInput>
            
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%', marginBottom: '21px' }}>
            <InputTitle>Кбе</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}      
              defaultValue={item.kbe ? item.kbe : ''}
              onChange={(e) => setItem({ ...item, kbe: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Quarter>
  );
}
