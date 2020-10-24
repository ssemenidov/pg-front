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
              <Select placeholder="Целевое назначение" size={'large'}>
                <Option value="case 1">case 1</Option>
                <Option value="case 2">case 2</Option>
              </Select>
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="По договорам" key="2">
            <Form.Item name="resolutionNumber">
              <Input placeholder="Номер договора" size={'large'} />
            </Form.Item>
            <Form.Item name="contract_Start">
              <DatePicker placeholder="Дата начала" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>
            <Form.Item name="contract_End">
              <DatePicker placeholder="Дата окончания" size={'large'} format='DD/MM/YYYY' style={{ width: '100%' }}/>
            </Form.Item>

          </StyledPanel>
          <StyledPanel header="По параметрам" key="3">
            <Form.Item name="area">
              <Input placeholder="Площадь" size={'large'} />
            </Form.Item>
            <Form.Item name="format">
              <Input placeholder="Формат" size={'large'} />
            </Form.Item>
            <Form.Item name="comment">
              <Input placeholder="Комментарий" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Другое" key="4">
            <Form.Item name="1">
              <Input placeholder="Поставновление от акимата" size={'large'} />
            </Form.Item>

            <Form.Item name="areaAct">
              <Input placeholder="Акт на землю" size={'large'} />
            </Form.Item>
            <Form.Item name="2">
              <Input placeholder="Статус оформления" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Статус" key="5">
            <Radio.Group>
              <Radio value="yes">Есть конструкция</Radio>
              <Radio value="no">Нет конструкции</Radio>
            </Radio.Group>
          </StyledPanel>
        </Collapse>
        <BtnGroup>
          <SubmitButton   htmlType="submit">Поиск</SubmitButton>
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
