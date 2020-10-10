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
          </StyledPanel>
          <StyledPanel header="По адресу" key="2">
            <Form.Item name="adress_m">
              <Input placeholder="Адрес маркетинговый" size={'large'} />
            </Form.Item>
            <Form.Item name="adress_j">
              <Input placeholder="Адрес юридический" size={'large'} />
            </Form.Item>
          </StyledPanel>

          <StyledPanel header="По параметрам" key="4">
            <Form.Item name="family">
              <Input placeholder="Семейство" size={'large'} />
            </Form.Item>
            <Form.Item name="InventNumber">
              <Input placeholder="Инвентарный номер 1С" size={'large'} />
            </Form.Item>
            <Form.Item name="format">
              <Input placeholder="Формат" size={'large'} />
            </Form.Item>
            <Form.Item name="actual">
              <StyledSelect showSearch placeholder="Горит / Не горит" size={'large'}>
                <Option value={true}>Да</Option>
                <Option value={false}>Нет</Option>
              </StyledSelect>
            </Form.Item>
            <Form.Item name="coords">
              <Input placeholder="Координаты" size={'large'} />
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
