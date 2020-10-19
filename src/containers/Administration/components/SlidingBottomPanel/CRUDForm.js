import { Form } from 'antd';
import React, { useState } from 'react';

export function CRUDForm({
                           onFinish=((values) => {}),
                           initialValues={level: "admin", position: "Менеджер"},
                           children
                         })
{
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

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark='optional'
      validateMessages={validateMessages}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      {children}
    </Form>
  )
}
