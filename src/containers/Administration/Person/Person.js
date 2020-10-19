import React, { useState, useContext, createContext, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Form, Input } from 'antd';
import styled  from "styled-components";

import PanelPerson from './PanelPersons'
import { adminRoutesMap } from '../Main/adminRoutes';
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout'
import SlidingBottomPanel  from '../components/SlidingBottomPanel/SlidingBottomPanel'
import { RowMargin1st } from '../components/Styled';
import { SliderGrid, SliderCol, SliderFormItem, StyledSelect } from '../components/SlidingBottomPanel/PanelComponents'
import { StyledOption, adaptiveRow, StyledButtonSlider } from '../components/SlidingBottomPanel/PanelComponents'

import '../Style/style.css'


function UserCRUDForm({actionText="Добавить"}) {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [form] = Form.useForm();

  const validateMessages = {
    required: 'Необходимо ввести ${label}!',
    types: {
      email: '${label} - некорректный email!',
    },
  };
  const requiredProps = { rules: [ { required: true } ] };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark='optional'
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <SliderGrid fluid>
        <RowMargin1st {...adaptiveRow}>
          <SliderCol title="Ф.И.О.">
            <SliderFormItem label="Ф.И.О." {...requiredProps} name='name'>
              <Input placeholder="Введите ФИО сотрудника" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Должность" {...requiredProps} name='position' >
              <StyledSelect placeholder="Должность" size={'large'} defaultValue="Менеджер">
                <StyledOption value="Менеджер">Администратор</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Уровень доступа" {...requiredProps} name='level'>
              <StyledSelect placeholder="Выберите уровень доступа" size={'large'} defaultValue="admin">
                <StyledOption value="admin">Администратор</StyledOption>
                <StyledOption value="user">Пользователь</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCol>
        </RowMargin1st>
        <RowMargin1st {...adaptiveRow}>
          <SliderCol>
            <SliderFormItem required label="Номер телефона" name='phone'>
              <Input placeholder="Введите номер телефона" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Е-mail"  rules={[{ required: true, type: "email" }]} name='email'>
              <Input placeholder="Введите email" size={'large'} />
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <StyledButtonSlider type="primary" htmlType="submit">
              {actionText}
            </StyledButtonSlider>
          </SliderCol>
        </RowMargin1st>
      </SliderGrid>
    </Form>
  );
}

function AddUserSlider({}) {
  return (
    <SlidingBottomPanel title="Добавить нового сотрудника" height={450}>
      <UserCRUDForm actionText={"Добавить"}/>
    </SlidingBottomPanel>
  )
}


const Partners = () => {
  const history = useHistory();
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.person} buttonName="Создать сотрудника">
      <AddUserSlider />
      <PanelPerson style={{ flex: '0 1 auto' }} history={history} />
    </AdminTopLayout>
  );
};


export default Partners;
