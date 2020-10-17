import React, { useState, useContext } from 'react';
import { crewsContext } from './Crews';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import { Select, Collapse, Checkbox, DatePicker, Form,Input} from 'antd';
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
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <Form form={form} onFinish={onFinish}>
        <Collapse expandIconPosition={'right'}>
          <StyledPanel header="Поиск по адресу" key="1">
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
            <Form.Item name="address">
              <Input placeholder="Введите адрес" size={'large'}/>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по экипажу" key="2">
            <Form.Item name="name">
              <Input placeholder="Имя" size={'large'}/>
            </Form.Item>
            <Form.Item name="phoneNumber">
              <Input placeholder="Номер телефона" size={'large'}/>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по конструкции" key="4">
            <Form.Item name="constructionType">
              <Input placeholder="Тип конструкции" size={'large'}/>
            </Form.Item>
            <Form.Item name="constructionFormat">
              <Input placeholder="Формат конструкции" size={'large'}/>
            </Form.Item>
            <Form.Item name="startDate">
              <Input placeholder="Дата начала" size={'large'}/>
            </Form.Item>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit" >Поиск</SubmitButton>
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
