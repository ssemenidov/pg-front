import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';

import { StyledSelect } from '../../../../../styles/styles';
const CITY_T = gql`
    {
      searchCity {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
  const DISTRICT_T = gql`
    {
      searchDistrict {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
export const Address = (props) => {
  const [item, setItem] = useContext(locationContext);
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  if (!city || !district){
    return <span></span>;
  }
  return (
    <Medium style={{    height: '100%'}}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
         
            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={item.city ? item.city.id :""}
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
             {city && city.searchCity.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>{item.node.title}</StyledSelect.Option>
             )}
             
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
             <InputTitle>Район</InputTitle>
             <StyledSelect
              defaultValue={item.district ? item.district.id :""}
              onChange={(value) => setItem({ ...item, district: { ...item.district, id: value } })}>
             {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>{item.node.title}</StyledSelect.Option>
             )}
             
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
