import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import { Radio, notification } from 'antd';
import styled from 'styled-components';

import { BlockBody, Row, Quarter, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect , StyledInput} from '../../../../../styles/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';
import houseIcon from '../../../../../img/input/house.svg';
export default function Adress() {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Quarter style={{ height: '100%' }}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Город</InputTitle>

            <StyledSelect
              defaultValue={item.city && item.city.id }
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
              <StyledSelect.Option value="Q2l0eU5vZGU6MQ==">Алматы</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mg==">Астана</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mw==">Караганда</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6NA==">Тараз</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '58%' }}>
          <InputTitle>Район</InputTitle>
            <StyledSelect
              defaultValue={item.district && item.district.id }
              onChange={(value) => setItem({ ...item, district: { ...item.district, id: value } })}>
              <StyledSelect.Option value="RGlzdHJpY3ROb2RlOjE=">Турксибский</StyledSelect.Option>
            
            </StyledSelect>
          </div>
          <div style={{ width: '38%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledSelect
              defaultValue={item.postcode && item.postcode.id }
              onChange={(value) => setItem({ ...item, postcode: { ...item.postcode, id: value } })}>
              <StyledSelect.Option value="UG9zdGNvZGVOb2RlOjE=">1234</StyledSelect.Option>
          
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>

            <StyledInput
              prefix={<img src={ houseIcon } />}      
              defaultValue={item.legalAddress ? item.legalAddress : ''}
              onChange={(e) => setItem({ ...item, legalAddress: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Фактический адрес</InputTitle>

            <StyledInput
              prefix={<img src={ houseIcon } />}      
              defaultValue={item.actualAddress ? item.actualAddress : ''}
              onChange={(e) => setItem({ ...item, actualAddress: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Quarter>
  );
}

const StyledRadio = styled(Radio.Group)`
  height: 40px !important;
  display: flex;
  align-items: center;

  span {
    color: #1a1a1a !important;
  }
`;
