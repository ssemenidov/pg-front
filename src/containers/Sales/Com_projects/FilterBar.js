import React, { useState, useContext } from 'react';
import { comProjectContext } from './Com_projects';

import {
  FilterMenu,
  SearchTitle,
  FilterText,

  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, DatePicker, Form,Input } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(comProjectContext);
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
          <StyledPanel header="По дате" key="1">
            <Form.Item name="date">
              <DatePicker placeholder="Дата начала" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По параметрам" key="2">
          <Form.Item name="code">
            <Input placeholder="Код проекта" size={'large'} />
            </Form.Item>
            <Form.Item name="brand">
              <Select placeholder="Бренд" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="advertiser">
              <Select placeholder="Рекламодатель" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="advAgency">
              <Select placeholder="Рекламное агенство " size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="sector">
              <Select placeholder="Сектор деятельности" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="backOfficeManager">
              <Select placeholder="Менеджер бэк-офиса" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
            <Form.Item name="sellManager">
              <Select placeholder="Менеджер по продажам" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
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
