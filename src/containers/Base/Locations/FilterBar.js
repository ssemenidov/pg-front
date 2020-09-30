import React, { useState } from 'react';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker, Radio } from 'antd';
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
          <StyledSelect defaultValue="Город" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Район" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Юридический адрес" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Маркетинговый адрес" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Почтовый индекс" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Кадастровый номер" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Целевое назначение" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
        <StyledPanel header="По договорам" key="2">
          <StyledSelect defaultValue="Номер договора" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Дата начала" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Дата окончания " size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
        <StyledPanel header="По параметрам" key="3">
          <StyledSelect defaultValue="Площадь" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Формат" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Комментарий" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>

        <StyledPanel header="Другое" key="4">
          <StyledSelect defaultValue="Поставновление от акимата" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Акт на землю" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Статус оформления" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>
        <StyledPanel header="Другое" key="5">
          <Radio.Group>
            <Radio value="yes">Есть конструкция</Radio>
            <Radio value="no">Нет конструкции</Radio>
          </Radio.Group>
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
