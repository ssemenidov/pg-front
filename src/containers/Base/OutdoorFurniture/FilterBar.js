import React, { useContext, useState } from 'react';
import { outContext } from './OutdoorFurniture';
import { useQuery, gql, useMutation } from '@apollo/client';

import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, Form} from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import postIcon from '../../../img/input/post.svg';
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
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(outContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log('values ', values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  // if (!city || !district || !post){
  //   return <span></span>;
  // }
  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="По местоположению" key="1">
            <Form.Item name="city">
              <StyledSelect
                placeholder={<><img src={cityIcon} /><span>Город</span> </>} size={'large'}>
                {city && city.searchCity.edges.map((item)=>
                  <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={cityIcon} />
                    <span>{item.node.title}</span>
                  </StyledSelect.Option>
                )}
              </StyledSelect>
             
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect placeholder={<><img src={districtIcon} /><span>Район</span> </>} size={'large'}>
              {district && district.searchDistrict.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={districtIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}
              </StyledSelect>
            </Form.Item>
            <Form.Item name="post">
            <StyledSelect placeholder={<><img src={postIcon} /><span>Почтовый индекс</span> </>} size={'large'}>
            {post && post.searchPostcode.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.id}>
                    <img src={postIcon} />
                  <span>{item.node.title}</span>
                  </StyledSelect.Option>
             )}
              </StyledSelect>           
               </Form.Item>
          </StyledPanel>
          <StyledPanel header="По адресу" key="2">
            <Form.Item name="adress_m">
              <StyledInput    prefix={<img src={anchorIcon} />} placeholder="Адрес маркетинговый" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_j">
              <StyledInput    prefix={<img src={anchorIcon} />} placeholder="Адрес юридический" size={'large'} />
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="По параметрам" key="4">
            <Form.Item name="family">
              <StyledSelect placeholder={<><img src={anchorIcon} /><span>Семейство</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 2</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="InventNumber">
              <StyledInput    prefix={<img src={anchorIcon} />} placeholder="Инвентарный номер 1С" size={'large'} />
            </Form.Item>
            <Form.Item name="format">
              <StyledSelect placeholder={<><img src={anchorIcon} /><span>Формат</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={anchorIcon} /><span> case 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={anchorIcon} /><span> case 2</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="actual">
              <StyledSelect showSearch placeholder={<><img src={anchorIcon} /> <span>Горит / Не горит</span> </>} size={'large'}>
                <StyledSelect.Option value={true}><img src={anchorIcon} /><span> Да</span></StyledSelect.Option>
                <StyledSelect.Option value={false}><img src={anchorIcon} /><span> Нет</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="coords">
              <StyledInput    prefix={<img src={anchorIcon} />} placeholder="Координаты" size={'large'} />
            </Form.Item>
            <Checkbox defaultChecked>Демонтированная конструкция</Checkbox>
            <br />
            <Checkbox defaultChecked>Доступная конструкция</Checkbox>
            <br />
            <Checkbox defaultChecked>Наличие помехи</Checkbox>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton htmlType="submit">Поиск</SubmitButton>
          <ResetButton onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
      </Form>
      <style>
        {`
        .ant-collapse-content{
           background-color: #f5f7fa !important;
        }
        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
