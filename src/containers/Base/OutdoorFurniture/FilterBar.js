import React, { useContext, useState } from 'react';
import { outContext } from './OutdoorFurniture';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledSelect,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker, Form, Input } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

const { Option } = Select;
const { Panel } = Collapse;
const FilterBar = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(outContext);
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
              <Input placeholder="Выберите город" size={'large'} />
            </Form.Item>
            <Form.Item name="district">
              <Input placeholder="Выберите район" size={'large'} />
            </Form.Item>
            <Form.Item name="post">
              <Input placeholder="Почтовый индекс" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По адресу" key="2">
            <Form.Item name="adress_m">
              <StyledSelect showSearch placeholder="Адрес маркетинговый" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="adress_j">
              <StyledSelect showSearch placeholder="Адрес юридический" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="По параметрам" key="4">
            <Form.Item name="district">
              <StyledSelect showSearch placeholder="Семейство" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="InventNumber">
              <StyledSelect showSearch placeholder="Инвентарный номер 1С" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="format">
              <StyledSelect showSearch placeholder="Формат" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="actual">
              <StyledSelect showSearch placeholder="Горит / Не горит" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="coords">
              <StyledSelect showSearch placeholder="Координаты" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </StyledSelect>
            </Form.Item>
            <Checkbox defaultChecked>Демонтированная конструкция</Checkbox>
            <br />
            <Checkbox defaultChecked>Доступная конструкция</Checkbox>
            <br />
            <Checkbox defaultChecked>Наличие помехи</Checkbox>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton htmlType="submit">Поиск</SubmitButton>
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
