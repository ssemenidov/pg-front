import React, { useState, useContext } from 'react';
import { crewsContext } from './Crews';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker, Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
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
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="Поиск по адресу" key="1">
            <Form.Item name="city">
              <StyledSelect defaultValue="Выберите город" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="district">
              <StyledSelect defaultValue="Выберите район" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="address">
              <StyledSelect defaultValue="Введите адрес" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="Поиск по экипажу" key="2">
            <Form.Item name="name">
              <StyledSelect defaultValue="Имя" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="phoneNumber">
              <StyledSelect defaultValue="Номер телефона" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="Поиск по конструкции" key="4">
            <Form.Item name="constructionType">
              <StyledSelect defaultValue="Тип конструкции" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="constructionFormat">
              <StyledSelect defaultValue="Формат конструкции" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="startDate">
              <StyledSelect defaultValue="Дата начала" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton onClick={() => alert('Фильтр')}>Поиск</SubmitButton>
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
