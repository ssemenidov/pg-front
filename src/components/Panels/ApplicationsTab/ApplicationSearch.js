import React, { useContext, useState } from 'react';

import {  applicationsContext } from './ApplicationsTab';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import InputAnchor from '../../Inputs/InputAnchor';
//import DatePicker from '../../Inputs/DatePicker';
import GroupRadio from '../../Inputs/GroupRadio';
import { Radio, DatePicker,Form,Input } from 'antd';
import { StyledButton } from '../../../styles/styles';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

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
          <div style={{ margin: '0 0.75vw 0 0' }}>
          <InputTitle>Код проекта</InputTitle>
          <Form.Item name="code" >
              <Input placeholder="Код проекта" size={'large'} />
            </Form.Item>
          
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
          <InputTitle>Менеджер по продажам</InputTitle>
          <Form.Item name="saleManager" >
              <Input placeholder="Менеджер по продажам" size={'large'} />
            </Form.Item>
          
        

          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
          <InputTitle>Номер договора</InputTitle>
             <Form.Item name="contractType" >
              <Input placeholder="Тип договора" size={'large'} />
            </Form.Item>

          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
          <InputTitle>Менеджер бэк-офиса</InputTitle>
             <Form.Item name="backManager" >
              <Input placeholder="Менеджер бэк-офиса" size={'large'} />
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
          <InputTitle>Номер приложения</InputTitle>
             <Form.Item name="application" >
              <Input placeholder="Номер приложения" size={'large'} />
            </Form.Item>
           
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Период приложения</InputTitle>
            <Form.Item name="period" >
            <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY' style={{  width: '203px' }}/>
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
          <InputTitle>Наименование контрагента</InputTitle>
             <Form.Item name="partner" >
              <Input placeholder="Наименование контрагента" size={'large'} />
            </Form.Item>
           
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
          <InputTitle>Дата создания</InputTitle>
          <Form.Item name="create" >
          <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '203px' }}/>
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Бренд</InputTitle>
             <Form.Item name="brand" >
              <Input placeholder="Бренд" size={'large'} />
            </Form.Item>
  
          </div>
          <div>
            <InputTitle>Статус возврата</InputTitle>
            <Radio.Group  >
              <Radio value={1}>Есть</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
          </div>
        </Row>
   
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <BtnGroup>
          <SubmitButton onClick={() => alert('Фильтр')}  htmlType="submit">Поиск</SubmitButton>
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
