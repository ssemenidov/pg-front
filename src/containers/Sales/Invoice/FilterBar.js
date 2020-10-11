import React, { useContext, useState } from 'react';
import { invoiceContext } from './Invoice';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, DatePicker, Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(invoiceContext);
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
           <DatePicker placeholder="2020-01-01" style={{ width: '100%' }} />
          </Form.Item>
        </StyledPanel>
        <StyledPanel header="По параметрам" key="2">
          <Form.Item name="projectCode">
           <StyledSelect defaultValue="Код проекта  " size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="applicationNumber">
           <StyledSelect defaultValue="Номер приложения" size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="brand">
           <StyledSelect defaultValue="Бренд" size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="advertiser">
           <StyledSelect defaultValue="Рекламодатель" size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="advAgency">
           <StyledSelect defaultValue="Рекламное агенство " size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="respManager">
            <StyledSelect defaultValue="Ответств. менеджер" size={'large'}>
             <Option value="case 1">case 1</Option>
             <Option value="case 2">case 2</Option>
           </StyledSelect>
          </Form.Item>
          <Form.Item name="advManager">
           <StyledSelect defaultValue="Менеджер по продажам" size={'large'}>
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
