import React, { useState } from 'react';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;
const FilterBar = () => {
  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Collapse expandIconPosition={'right'}>
        <StyledPanel header="Поиск по адресу" key="1">
          <StyledSelect defaultValue="Выберите город" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Выберите район" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Введите адрес" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
        <StyledPanel header="Поиск по экипажу" key="2">
          <StyledSelect defaultValue="Имя" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Номер телефона" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>

        <StyledPanel header="Поиск по конструкции" key="4">
          <StyledSelect defaultValue="Тип конструкции" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Формат конструкции" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Дата начала" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
      </Collapse>
      <BtnGroup>
        <SubmitButton onClick={() => alert('Фильтр')}>Поиск</SubmitButton>
        <ResetButton>Очистить</ResetButton>
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
