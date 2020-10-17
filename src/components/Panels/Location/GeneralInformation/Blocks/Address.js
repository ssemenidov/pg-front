import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';

import { StyledSelect } from '../../../../../styles/styles';

export const Address = (props) => {
  const [item, setItem] = useContext(locationContext);

  return (
    <Medium style={{    height: '100%'}}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
         
            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={item.city ? item.city.id : 'Город'}
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
              <StyledSelect.Option value="Q2l0eU5vZGU6MQ==">Алматы</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mg==">Астана</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6Mw==">Караганда</StyledSelect.Option>
              <StyledSelect.Option value="Q2l0eU5vZGU6NA==">Тараз</StyledSelect.Option>
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
             <InputTitle>Район</InputTitle>
            <StyledSelect
              defaultValue={item.district && item.district.id }
              onChange={(value) => setItem({ ...item, district: { ...item.district, id: value } })}>
              <StyledSelect.Option value="RGlzdHJpY3ROb2RlOjE=">Турксибский</StyledSelect.Option>
            
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код района</InputTitle>
      
            <Input
              value={item.postcode? item.postcode:""}
              onChange={(e) => {setItem({...item, postcode:e.target.value})}}
              placeholder="Код района"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Юридический адрес</InputTitle>
            <Input
              value={item.address? item.address:""}
              onChange={(e) => {setItem({...item, address:e.target.value})}}
              placeholder="Абая - ост. ГорВодоКанал"
              size={'large'}
            />
  
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Address;
