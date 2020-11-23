import React, {useContext, useEffect} from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { Radio } from 'antd';

import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

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
  query searchDistrict(
    $city: String
    ) {
      searchDistrict(
    city_Title:$city
    ) {
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
  query searchPostcode(
    $city: String
    $district: String
    ) {
    searchPostcode(
    district_Title:  $district
    district_City_Title:$city
    ) {
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
  const district = useQuery( DISTRICT_T,{variables:
    {city: item.postcode && item.postcode.district && item.postcode.district.city && item.postcode.district.city.title,
  }
  }).data;
  const posts = useQuery( POST_T,{variables:
    {city: item.postcode && item.postcode.district && item.postcode.district.city && item.postcode.district.city.title,
    district: item.postcode && item.postcode.district && item.postcode.district.title,}
  }).data;

  if (!city || !district || !posts){
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
              defaultValue={item.legalAddressPostcode && item.legalAddressPostcode.district && item.legalAddressPostcode.district.city && item.legalAddressPostcode.district.city.title}
              onChange={(value, { title }) => setItem({
                ...item,
                legalAddressPostcode: {
                  ...item.legalAddressPostcode,
                  district: {
                    ...(item.legalAddressPostcode && item.legalAddressPostcode.district),
                    city: {
                      ...(item.legalAddressPostcode && item.legalAddressPostcode.district && item.legalAddressPostcode.district.city),
                      title: title,
                      id: value
                    }
                  }
                }
              })}
            >
              {city && city.searchCity.edges.map((item)=>
                <StyledSelect.Option
                    key={item.node.id}
                    value={item.node.id}
                    title={item.node.title}
                >
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
              defaultValue={
                (
                    item.legalAddressPostcode &&
                    item.legalAddressPostcode.district
                )
                    ? item.legalAddressPostcode.district.title
                    :  <img src={districtIcon} />
              }
              onChange={(value, { title }) => setItem({
                ...item,
                legalAddressPostcode: {
                  ...item.legalAddressPostcode,
                  district: {
                    ...(item.legalAddressPostcode && item.legalAddressPostcode.district),
                    title: title,
                    id: value
                  }
                }
              })}
            >
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option
                  key={item.node.id}
                  value={item.node.id}
                  title={item.node.title}
                >
                    <img src={districtIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
              )}
            </StyledSelect>
          </div>
          <div style={{ width: '38%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledSelect
              defaultValue={item.legalAddressPostcode ? item.legalAddressPostcode.title : <img src={postIcon} /> }
              onChange={(value) => setItem({ ...item, legalAddressPostcodeId: value })}
            >
             {posts && posts.searchPostcode.edges.map((item)=>
                <StyledSelect.Option
                    key={item.node.id}
                    value={item.node.id}
                    titl={item.node.title}
                >
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
              defaultValue={item.legalAddress ? item.legalAddress.address : ''}
              onChange={(e) => setItem({
                ...item,
                legalAddress: {
                  ...item.legalAddress,
                  address: e.target.value
                }
              })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Фактический адрес</InputTitle>
            <StyledInput
              prefix={<img src={ houseIcon } />}
              defaultValue={item.actualAddress ? item.actualAddress.address : ''}
              onChange={(e) => setItem({
                ...item,
                actualAddress: {
                  ...item.actualAddress,
                  address: e.target.value
                }
              })}></StyledInput>
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
