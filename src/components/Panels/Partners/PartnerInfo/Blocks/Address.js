import React, { useContext } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';


import styled from 'styled-components';
import { Radio } from 'antd';

import { BlockBody, Row, Quarter, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledSelect , StyledInput} from '../../../../Styles/DesignList/styles';

import cityIcon from '../../../../../img/input/city.svg';
import districtIcon from '../../../../../img/input/district.svg';
import houseIcon from '../../../../../img/input/house.svg';
import postIcon from '../../../../../img/input/post.svg';


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
              defaultValue={item.city ? item.city.id:  <img src={cityIcon} />}
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
              <StyledSelect.Option value="Q2l0eU5vZGU6MQ==">  <img src={cityIcon} /><span> Алматы</span></StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mg==">  <img src={cityIcon} /><span>Астана</span></StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mw==">  <img src={cityIcon} /><span>Караганда</span></StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6NA==">  <img src={cityIcon} /><span>Тараз</span></StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '58%' }}>
          <InputTitle>Район</InputTitle>
            <StyledSelect
              defaultValue={item.district ? item.district.id: <img src={districtIcon} /> }
              onChange={(value) => setItem({ ...item, district: { ...item.district, id: value } })}>
              <StyledSelect.Option value="RGlzdHJpY3ROb2RlOjE="> <img src={districtIcon} /> <span>Турксибский</span></StyledSelect.Option>
            </StyledSelect>
          </div>
          <div style={{ width: '38%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledSelect
              defaultValue={item.postcode ? item.postcode.id:<img src={postIcon} /> }
              onChange={(value) => setItem({ ...item, postcode: { ...item.postcode, id: value } })}>
              <StyledSelect.Option value="UG9zdGNvZGVOb2RlOjE="><img src={postIcon} /> <span>1234</span> </StyledSelect.Option>
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
