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
        <StyledPanel header="По местоположению" key="1">
          <StyledSelect defaultValue="Выберите город" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Выберите район" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Почтовый индекс" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
        <StyledPanel header="По адресу" key="2">
          <StyledSelect defaultValue="Адрес маркетинговый" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Адрес юридический" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>

        <StyledPanel header="По параметрам" key="4">
          <StyledSelect defaultValue="Семейство" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Инвентарный номер 1С" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Формат" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>

          <StyledSelect defaultValue="Горит / Не горит" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Координаты" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <Checkbox defaultChecked>Демонтированная конструкция</Checkbox>
          <br />
          <Checkbox defaultChecked>Доступная конструкция</Checkbox>
          <br />
          <Checkbox defaultChecked>Наличие помехи</Checkbox>
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
