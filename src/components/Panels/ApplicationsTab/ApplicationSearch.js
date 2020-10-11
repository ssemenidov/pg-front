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
            <InputTitle>Номер приложения</InputTitle>
            <InputAnchor placeholder="Номер приложения" />
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Создатель</InputTitle>
            <InputAnchor placeholder="Создатель" />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Наименование контрагента</InputTitle>
            <InputAnchor placeholder="Наименование контрагента" />
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Менеджер по продажам</InputTitle>
            <InputAnchor placeholder="Менеджер по продажам" />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Номер договора</InputTitle>
            <InputAnchor placeholder="Тип договора" />
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Период приложения</InputTitle>
            <DatePicker style={{ height: '53px', width: '203px' }} />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Бренд</InputTitle>
            <InputAnchor placeholder="Бренд" />
  
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Дата создания</InputTitle>
            <DatePicker style={{ height: '53px', width: '203px' }} />
          </div>
        </Row>
        <Row>
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
