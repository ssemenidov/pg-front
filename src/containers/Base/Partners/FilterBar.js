import React, { useContext, useState } from 'react';
import { partnersContext } from './Partners';
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
  const [filter, setFilter] = useContext(partnersContext);
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
          <StyledPanel header="По параметрам" key="1">
            <Form.Item name="partner">
              <Input placeholder="Контрагент" size={'large'} />
            </Form.Item>
            <Form.Item name="brand">
              <Input placeholder="Бренд" size={'large'} />
            </Form.Item>
            <Form.Item name="type">
              <Input placeholder="Тип Контрагента" size={'large'} />
            </Form.Item>
            <Form.Item name="sector">
              <Input placeholder="Cектор деятельности" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header=" По БИН" key="2">
            <Form.Item name="binNumber">
              <Input placeholder="Введите БИН" size={'large'} />
            </Form.Item>
          </StyledPanel>
        </Collapse>

        <BtnGroup>
          <SubmitButton htmlType="submit" >
            Поиск
          </SubmitButton>
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
