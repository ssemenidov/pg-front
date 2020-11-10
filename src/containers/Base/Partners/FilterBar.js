import React, { useContext, useState } from 'react';
import { partnersContext } from './Partners';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  StyledPanel,
} from '../../../components/Styles/StyledFilters';
import {  Collapse,  Form } from 'antd';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import anchorIcon from '../../../img/input/anchor.svg';
import grateIcon from '../../../img/input/grate.svg';

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
          <StyledPanel header="Поиск по параметрам" key="1">
            <Form.Item name="partner">
              <StyledInput   prefix={<img src={anchorIcon} />} placeholder="Контрагент" size={'large'} />
            </Form.Item>
            <Form.Item name="brand">
              <StyledInput   prefix={<img src={anchorIcon} />} placeholder="Бренд" size={'large'} />
            </Form.Item>
            <Form.Item name="type">
              <StyledInput   prefix={<img src={anchorIcon} />} placeholder="Тип Контрагента" size={'large'} />
            </Form.Item>
            <Form.Item name="sector">
              <StyledInput   prefix={<img src={anchorIcon} />} placeholder="Cектор деятельности" size={'large'} />
            </Form.Item>
          </StyledPanel>
          <StyledPanel header="Поиск по БИН" key="2">
            <Form.Item name="binNumber">
              <StyledInput   prefix={<img src={grateIcon} />} placeholder="Введите БИН" size={'large'} />
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
