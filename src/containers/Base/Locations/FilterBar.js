import React, { useState, useContext } from 'react';
import { locationsContext } from './Locations';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker, Radio, Form, Input } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
const { Option } = Select;
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(locationsContext);
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
          <StyledPanel header="По местоположению" key="1">
            <Form.Item name="city">
              <Select placeholder="Город" size={'large'}>
                <Option value="Алматы">Алматы</Option>
                <Option value="Астана">Астана</Option>
                <Option value="Караганда">Караганда</Option>
                <Option value="Тараз">Тараз</Option>
                <Option value="Актау">Актау</Option>
              </Select>
            </Form.Item>
            <Form.Item name="district">
              <Select placeholder="Район" size={'large'}>
                <Option value="Турксибский">Турксибский</Option>
              </Select>
            </Form.Item>
            <Form.Item name="post">
              <Input placeholder="Почтовый индекс" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_m">
              <Input placeholder="Адрес маркетинговый" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_j">
              <Input placeholder="Адрес юридический" size={'large'} />
            </Form.Item>
            <Form.Item name="cadastralNumber">
              <Input placeholder="Кадастровый номер" size={'large'} />
            </Form.Item>
            <Form.Item name="targetPurpose">
              <Input placeholder="Целевое назначение" size={'large'} />
            </Form.Item>
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
          <StyledPanel header="Статус" key="5">
            <Radio.Group>
              <Radio value="yes">Есть конструкция</Radio>
              <Radio value="no">Нет конструкции</Radio>
            </Radio.Group>
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
