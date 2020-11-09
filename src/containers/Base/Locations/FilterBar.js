import React, { useState, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { locationsContext } from './Locations';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Collapse, Checkbox, DatePicker, Radio, Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import postIcon from '../../../img/input/post.svg';
import houseIcon from '../../../img/input/house.svg';
import grateIcon from '../../../img/input/grate.svg';
import flagIcon from '../../../img/input/flag.svg';
import commentIcon from '../../../img/input/comment.svg';
import areaIcon from '../../../img/input/area.svg';
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
  const [filter, setFilter] = useContext(locationsContext);
  const onFinish = (values) => {
    setFilter(values);


  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery( CITY_T).data;
  const district = useQuery( DISTRICT_T).data;
  const post = useQuery( POST_T).data;
  // if (!city || !district || !post) {
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
            <Form.Item name="adress_m">
              <StyledInput prefix={<img src={houseIcon} />} placeholder="Адрес маркетинговый" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_j">
              <StyledInput prefix={<img src={houseIcon} />} placeholder="Адрес юридический" size={'large'} />
            </Form.Item>
            <Form.Item name="cadastralNumber">
              <StyledInput prefix={<img src={grateIcon} />} placeholder="Кадастровый номер" size={'large'} />
            </Form.Item>
            <Form.Item name="targetPurpose">
              <StyledSelect placeholder={<><img src={flagIcon} /><span>Целевое назначение</span> </>} size={'large'}>
                <StyledSelect.Option value="case 1"><img src={flagIcon} /><span>назначение 1</span></StyledSelect.Option>
                <StyledSelect.Option value="case 2"><img src={flagIcon} /><span>назначение 2</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По договорам" key="2">
            <Form.Item name="resolutionNumber">
              <StyledInput prefix={<img src={grateIcon} />} placeholder="Номер договора" size={'large'} />
            </Form.Item>
            <Form.Item name="contract_Start">
              <DatePicker placeholder="Дата начала" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item name="contract_End">
              <DatePicker placeholder="Дата окончания" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>

          </StyledPanel>
          <StyledPanel header="По параметрам" key="3">
            <Form.Item name="area">
              <StyledInput prefix={<img src={areaIcon} />} placeholder="Площадь" size={'large'} />
            </Form.Item>
            <Form.Item name="format">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Формат" size={'large'} />
            </Form.Item>
            <Form.Item name="comment">
              <StyledInput prefix={<img src={commentIcon} />} placeholder="Комментарий" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Другое" key="4">
            <Form.Item name="1">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Поставновление от акимата" size={'large'} />
            </Form.Item>

            <Form.Item name="areaAct">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Акт на землю" size={'large'} />
            </Form.Item>
            <Form.Item name="2">
              <StyledInput prefix={<img src={anchorIcon} />} placeholder="Статус оформления" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Статус" key="5">
            <Radio.Group>
              <Radio value="yes">Есть конструкция</Radio>
              <Radio value="no">Нет конструкции</Radio>
            </Radio.Group>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit">Поиск</SubmitButton>
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
