import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input } from 'antd';

import {
  adaptiveRow, SliderCol, SliderFormItem, SliderGrid, StyledButtonSlider, StyledOption, StyledSelect
} from '../components/SlidingBottomPanel/PanelComponents';

import { RowMargin1st } from '../components/Styled';


export function PersonCRUDForm({
                                 actionText="Добавить",
                                 onFinish=((values) => {}),
                                 initialValues={level: "admin", position: "Менеджер"},
                               }) {
  let [form] = Form.useForm();

  let [state, setState] = useState(initialValues)

  for (let key in initialValues) {
    if (state[key] !== initialValues[key]) {
      setState(initialValues);
      setTimeout(() => form.setFieldsValue(initialValues), 0);
      break;
    }
  }

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
      initialValues={initialValues}
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
              <StyledSelect placeholder="Должность" size={'large'}>
                <StyledOption value="Менеджер">Менеджер</StyledOption>
              </StyledSelect>
            </SliderFormItem>
          </SliderCol>
          <SliderCol>
            <SliderFormItem label="Уровень доступа" {...requiredProps} name='level'>
              <StyledSelect placeholder="Выберите уровень доступа" size={'large'}>
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
