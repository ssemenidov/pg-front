import React, { useState, useContext } from 'react';
import { comProjectContext } from './Com_projects';

// ICONS
import date from '../../../img/left-bar/filter/date.svg';
import advAgency from '../../../img/left-bar/filter/advAgency.svg';
import advertiser from '../../../img/left-bar/filter/advertiser.svg';
import brand from '../../../img/left-bar/filter/brand.svg';
import creator from '../../../img/left-bar/filter/creator.svg';
import manager from '../../../img/left-bar/filter/manager.svg';
import section from '../../../img/left-bar/filter/section.svg';

import { ReactComponent as ArrowDown } from '../../../img/left-bar/filter/arrow_down.svg';

import { FilterMenu, SearchTitle, FilterText, StyledPanel } from '../../../components/Styles/StyledFilters';
import { Select, Collapse, DatePicker, Form, Input } from 'antd';
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

  const InputIcon = ({ img, alt }) => {
    return (
      <span
        style={{
          position: 'absolute',
          transform: 'translate(55% ,30%)',
          zIndex: '99',
        }}>
        <img src={img} alt={alt} />
      </span>
    );
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
            <InputIcon img={date} alt="date icon" />
            <Form.Item name="date">
              <DatePicker
                suffixIcon={<ArrowDown />}
                placeholder="Выберите период"
                size={'large'}
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                className="date-picker"
              />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По параметрам" key="2">
              <InputIcon img={brand} alt="brand icon" />
            <Form.Item name="brand">
              <Select placeholder="Бренд" size={'large'} className="placeholder-font">
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
              <InputIcon img={advertiser} alt="advertiser icon" />
            <Form.Item name="advertiser">
              <Select placeholder="Рекламодатель" size={'large'} className="placeholder-font">
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
              <InputIcon img={advAgency} alt="advAgency icon" />
            <Form.Item name="advAgency">
              <Select placeholder="Рекламное агенство " size={'large'} className="placeholder-font">
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
              <InputIcon img={section} alt="section icon" />
            <Form.Item name="sector">
              <Select placeholder="Сектор деятельности" size={'large'} className="placeholder-font">
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
              <InputIcon img={creator} alt="creator icon" />
            <Form.Item name="backOfficeManager">
              <Select placeholder="Создатель" size={'large'} className="placeholder-font">
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
              <InputIcon img={manager} alt="manager icon" />
            <Form.Item name="sellManager">
              <Select placeholder="Менеджер по продажам" size={'large'} className="placeholder-font">
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

        .date-picker>div {
          margin-left: 25px;
        }

        .date-picker>div::placeholder {
          color: #656565;
        }

        .placeholder-font {
          font-weight: normal;
        }

        .placeholder-font>div> .ant-select-selection-placeholder {
          margin-left: 25px !important;
        }

        .placeholder-font>div> .ant-select-selection-item {
          padding-left: 25px !important;
        }




        `}
      </style>
    </FilterMenu>
  );
};

export default FilterBar;
