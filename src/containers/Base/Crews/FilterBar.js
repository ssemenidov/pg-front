import React, { useState, useContext } from 'react';
import { crewsContext } from './Crews';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import {  Collapse, Checkbox, DatePicker, Form} from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledButton,StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';

import anchorIcon from '../../../img/input/anchor.svg';
import districtIcon from '../../../img/input/district.svg';
import postIcon from '../../../img/input/post.svg';
import cityIcon from '../../../img/input/input-city.svg';
import ownerIcon from '../../../img/input/owner.svg';
import phoneIcon from '../../../img/input/phone.svg';
import constructionIcon from '../../../img/input/construction.svg';
import marketIcon from '../../../img/input/market.svg';
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(crewsContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log(filter);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="Поиск по адресу" key="1">
          <Form.Item name="city">
              <StyledSelect placeholder={<><img src={cityIcon} /><span>Город</span> </>} size={'large'}
              >
                <StyledSelect.Option value="Алматы"><img src={cityIcon} /><span> Алматы</span></StyledSelect.Option>
                <StyledSelect.Option value="Астана"><img src={cityIcon} /><span> Астана</span></StyledSelect.Option>
                <StyledSelect.Option value="Караганда"><img src={cityIcon} /><span> Караганда</span></StyledSelect.Option>
                <StyledSelect.Option value="Тараз"><img src={cityIcon} /><span> Тараз</span></StyledSelect.Option>
                <StyledSelect.Option value="Актау"><img src={cityIcon} /><span> Актау</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect placeholder={<><img src={districtIcon} /><span>Район</span> </>} size={'large'}>
                <StyledSelect.Option value="Турксибский"><img src={districtIcon} /><span>Турксибский</span></StyledSelect.Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="address">
              <StyledInput
              placeholder="Адрес"
              size={'large'}
              prefix={<img src={  cityIcon } />}
                        />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по экипажу" key="2">
            <Form.Item name="name">
              <StyledInput placeholder="Имя" size={'large'}  prefix={<img src={  ownerIcon } />}/>
            </Form.Item>
            <Form.Item name="phoneNumber">
              <StyledInput placeholder="Номер телефона" size={'large'} prefix={<img src={  phoneIcon }/>}/>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по конструкции" key="4">
            <Form.Item name="constructionType">
              <StyledInput placeholder="Тип конструкции" size={'large'} prefix={<img src={  constructionIcon }/>}/>
            </Form.Item>
            <Form.Item name="constructionFormat">
              <StyledInput placeholder="Формат конструкции" size={'large'} prefix={<img src={  phoneIcon }/>}/>
            </Form.Item>
            <Form.Item name="startDate">
              <StyledInput placeholder="Дата начала" size={'large'} prefix={<img src={  marketIcon }/>}/>
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit" >Поиск</SubmitButton>
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
