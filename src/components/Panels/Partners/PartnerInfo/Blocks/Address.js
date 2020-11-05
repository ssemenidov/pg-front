import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import styled from 'styled-components';
import { Radio } from 'antd';
import { BlockBody, Row, Quarter, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledSelect , StyledInput} from '../../../../Styles/DesignList/styles';

import cityIcon from '../../../../../img/input/city.svg';
import districtIcon from '../../../../../img/input/district.svg';
import houseIcon from '../../../../../img/input/house.svg';
import postIcon from '../../../../../img/input/post.svg';

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
  const POST_T = gql`
  {
    searchPostcode {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;  
export default function Adress() {
  const [item, setItem] = useContext(partnerContext);
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  if (!city || !district || !post){
    return <span></span>;
  }
  return (
    <Quarter style={{ height: '100%' }}>
      <BlockTitle>Адрес</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Город</InputTitle>
            <StyledSelect
              defaultValue={item.city ? item.city.id : <img src={cityIcon} />}
              onChange={(value) => setItem({ ...item, city: { ...item.city, id: value } })}>
              {city && city.searchCity.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                  <img src={cityIcon} />
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>
          </div>
        </Row>
        <Row>
          <div style={{ width: '58%' }}>
          <InputTitle>Район</InputTitle>
            <StyledSelect
              defaultValue={item.district ? item.district.id :  <img src={districtIcon} />}
              onChange={(value) => setItem({ ...item, district: { ...item.district, id: value } })}>
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={districtIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
              )}
            </StyledSelect>
          </div>
          <div style={{ width: '38%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledSelect
              defaultValue={item.postcode ? item.postcode.id:<img src={postIcon} /> }
              onChange={(value) => setItem({ ...item, postcode: { ...item.postcode, id: value } })}>
              {post && post.searchPostcode.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={postIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}
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
