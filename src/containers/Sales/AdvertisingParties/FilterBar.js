import React, { useState,useContext } from 'react';
import { adverContext } from './AdvertisingParties';
import { useQuery, gql, useMutation } from '@apollo/client';
import {
  FilterMenu,
  SearchTitle,
  FilterText,

  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker,Form } from 'antd';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import anchorIcon from '../../../img/input/anchor.svg';
import cityIcon from '../../../img/input/city.svg';
import districtIcon from '../../../img/input/district.svg';
import phoneIcon from '../../../img/input/phone.svg';
import constructionIcon from '../../../img/input/construction.svg';
import arrowsIcon from '../../../img/input/arrows.svg';
const { Option } = Select;
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
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(adverContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log('values ', values);
  };

  const onReset = () => {
    form.resetFields();
  };
  const city = useQuery(CITY_T).data;
  const district = useQuery(DISTRICT_T).data;
  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}></Form>
      <Collapse expandIconPosition={'right'}>
        <StyledPanel header="По дате" key="1">
        <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
        </StyledPanel>
        <StyledPanel header="Статус брони" key="2">
          <Checkbox defaultChecked>
            <div className="dot-1"></div>
            <span>Свободно</span>
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-2"></div>
            Забронировано
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-3"></div>
            Утверждено
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-4"></div>
            Продано
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-4"></div>
            Недоступно
          </Checkbox>
          <br />
          <Checkbox defaultChecked>
            <div className="dot-4"></div>
            Все
          </Checkbox>
        </StyledPanel>
        <StyledPanel header="По городу" key="3">
        <Form.Item name="city">
          <StyledSelect
            showSearch placeholder={<><img src={cityIcon} /><span>Город</span> </>} size={'large'}>
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
        </StyledPanel>

        <StyledPanel header="По параметрам" key="4">
          <Form.Item name="type">
            <StyledSelect  placeholder={<><img src={ constructionIcon} /> <span>Тип конструкции</span> </>} size={'large'}>
              <StyledSelect.Option value="case 1"><img src={ constructionIcon} /><span> case 1</span></StyledSelect.Option>
              <StyledSelect.Option value="case 2"><img src={ constructionIcon} /><span> case 2</span></StyledSelect.Option>
            </StyledSelect> 
          </Form.Item>
          <Form.Item name="format">
            <StyledSelect  placeholder={<><img src={ phoneIcon} /> <span>Формат кострукции</span> </>} size={'large'}>
              <StyledSelect.Option value="case 1"><img src={ phoneIcon} /><span> case 1</span></StyledSelect.Option>
              <StyledSelect.Option value="case 2"><img src={ phoneIcon} /><span> case 2</span></StyledSelect.Option>
            </StyledSelect>
          </Form.Item>
          <Form.Item name="side">
            <StyledSelect  placeholder={<><img src={arrowsIcon} /> <span>Сторона кострукции</span> </>} size={'large'}>
              <StyledSelect.Option value="case 1"><img src={arrowsIcon} /><span> case 1</span></StyledSelect.Option>
              <StyledSelect.Option value="case 2"><img src={arrowsIcon} /><span> case 2</span></StyledSelect.Option>
            </StyledSelect>
          </Form.Item>
          <Form.Item name="size">
            <StyledSelect  placeholder={<><img src={arrowsIcon} /> <span>Сторона кострукции</span> </>} size={'large'}>
              <StyledSelect.Option value="case 1"><img src={arrowsIcon} /><span> case 1</span></StyledSelect.Option>
              <StyledSelect.Option value="case 2"><img src={arrowsIcon} /><span> case 2</span></StyledSelect.Option>
            </StyledSelect>
          </Form.Item>


          <Checkbox defaultChecked>Освещение</Checkbox>
        </StyledPanel>
      </Collapse>
      <BtnGroup>
          <SubmitButton   htmlType="submit" onClick={() => alert('Фильтр')}>Поиск</SubmitButton>
          <ResetButton onClick={onReset}>Очистить</ResetButton>
      </BtnGroup>
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
