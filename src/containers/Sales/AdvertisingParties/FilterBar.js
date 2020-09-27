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
      <Collapse defaultActiveKey={['1']} expandIconPosition={'right'}>
        <StyledPanel header="По дате" key="1">
          <DatePicker style={{ width: '100%' }} />
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
        </StyledPanel>
        <StyledPanel header="По городу" key="3">
          <StyledSelect defaultValue="Выберите город" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
        </StyledPanel>

        <StyledPanel header="По параметрам" key="4">
          <StyledSelect defaultValue="Семейство" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Подсемейство" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Модель" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Формат" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Сторона" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Рекламная сторона" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <StyledSelect defaultValue="Назначение стороны" size={'large'}>
            <Option value="case 1">case 1</Option>
            <Option value="case 2">case 2</Option>
          </StyledSelect>
          <Checkbox defaultChecked>
            <span>Пакет</span>
          </Checkbox>
          <br />
          <Checkbox defaultChecked>Освещение</Checkbox>
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
