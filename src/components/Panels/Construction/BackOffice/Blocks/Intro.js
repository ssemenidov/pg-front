import React, { useContext } from 'react';
import moment from 'moment';
import { useQuery, gql, useMutation } from '@apollo/client';

import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../Styles/DesignList/styles';
import { DatePicker } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';

import anchorIcon from '../../../../../img/input/anchor.svg';
import cityIcon from '../../../../../img/input/city.svg';
import districtIcon from '../../../../../img/input/district.svg';
import postIcon from '../../../../../img/input/post.svg';
import ownerIcon from '../../../../../img/input/owner.svg';

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
export default function Intro() {
  const [item, setItem] = useContext(constructContext);
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  if (!city || !district || !post){
    return <span></span>;
  }
  return (
    <Medium>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '35%' }}>

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
          <div style={{ width: '35%' }}>
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
          <div style={{ width: '22%' }}>
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
          <div style={{ width: '35%' }}>
            <InputTitle>Владелец</InputTitle>
            <StyledInput
              prefix={<img src={ownerIcon} />}
              defaultValue={item.owner ? item.owner : ''}
              onChange={(e) => setItem({ ...item, owner: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.marketingAddress ? item.marketingAddress : ''}
              onChange={(e) => setItem({ ...item, marketingAddress: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            <DatePicker placeholder="01/01/2020"
             size={'large'}
             format='DD/MM/YYYY'
             style={{  width: '100%' }}
             defaultValue={item.createdAt ? moment(item.createdAt) : ''}
             onChange={(date) => setItem({ ...item, createdAt:new Date(date) })}
             />

          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput
              placeholder='...'
              defaultValue={item.backComment ? item.backComment : ''}
              onChange={(e) => setItem({ ...item, backComment: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
