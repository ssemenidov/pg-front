import React, { useContext, useState } from 'react';

import {  applicationsContext } from './ApplicationsTab';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import InputAnchor from '../../Inputs/InputAnchor';
//import DatePicker from '../../Inputs/DatePicker';
import GroupRadio from '../../Inputs/GroupRadio';
import { Radio, DatePicker,Form,Input } from 'antd';
import { StyledButton } from '../../../styles/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import styled from 'styled-components';

const ApplicationSearch = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(applicationsContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log(filter);
  };

  const onReset = () => {
    form.resetFields();
  };
  return (
    <Medium>
      <BlockTitle>Поиск приложения</BlockTitle>
      <BlockBody>
      <Form form={form} onFinish={onFinish}>
        <Row>
         <SearchItem>
          <InputTitle>Код приложения</InputTitle>
          <Form.Item name="code" >
              <Input placeholder="Код приложения" size={'large'} />
            </Form.Item>
          
          </SearchItem> 
           <SearchItem> 
          <InputTitle>Менеджер по продажам</InputTitle>
          <Form.Item name="saleManager" >
              <Input placeholder="Менеджер по продажам" size={'large'} />
            </Form.Item>
          
        

          </SearchItem> 
        </Row>
        <Row>
         <SearchItem> 
          <InputTitle>Номер договора</InputTitle>
             <Form.Item name="contractType" >
              <Input placeholder="Тип договора" size={'large'} />
            </Form.Item>

          </SearchItem> 
           <SearchItem> 
          <InputTitle>Менеджер бэк-офиса</InputTitle>
             <Form.Item name="backManager" >
              <Input placeholder="Менеджер бэк-офиса" size={'large'} />
            </Form.Item>
          </SearchItem> 
        </Row>
        <Row>
         <SearchItem> 
          <InputTitle>Номер приложения</InputTitle>
             <Form.Item name="application" >
              <Input placeholder="Номер приложения" size={'large'} />
            </Form.Item>
           
          </SearchItem> 
           <SearchItem> 
            <InputTitle>Период приложения</InputTitle>
            <Form.Item name="period" >
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem> 
        </Row>
        <Row>
         <SearchItem> 
          <InputTitle>Наименование контрагента</InputTitle>
             <Form.Item name="partner" >
              <Input placeholder="Наименование контрагента" size={'large'} />
            </Form.Item>
           
          </SearchItem> 
           <SearchItem> 
          <InputTitle>Дата создания</InputTitle>
          <Form.Item name="create" >
          <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
            </Form.Item>
          </SearchItem> 
        </Row>
        <Row>
         <SearchItem> 
            <InputTitle>Бренд</InputTitle>
             <Form.Item name="brand" >
              <Input placeholder="Бренд" size={'large'} />
              </Form.Item>
  
          </SearchItem> 
          <SearchItem> 

            <InputTitle>Статус возврата</InputTitle>
            <Form.Item name="returnStatus" >
            <Radio.Group   style={{width:"100%"}}>
              <Radio value={1}style={{    width: "50%"}}>Есть</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
            </Form.Item>
            </SearchItem> 
        </Row>
   
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <BtnGroup>
          <SubmitButton  htmlType="submit">Поиск</SubmitButton>
          <ResetButton style={{    marginRight: 'auto'}} onClick={onReset}>Очистить</ResetButton>
        </BtnGroup>
        </Row>
        </Form>
      </BlockBody>
      <style>
        {`

        `}
      </style>
    </Medium>
  );
};

export default ApplicationSearch;
const SearchItem = styled.div`
  display: flex;
  flex-direction: column;

  width:48%;
  .ant-form-item{
    margin-bottom:0;
  }
`;