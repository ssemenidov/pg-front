import React, { useState, useContext, createContext, useMemo } from 'react';
import { useHistory } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Form, Button, Input } from 'antd';
import styled  from "styled-components";

import PanelPerson from './PanelPersons'
import { adminRoutesMap } from '../Main/adminRoutes';
import '../Style/style.css'
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout'
import SlidingBottomPanel  from '../components/SlidingBottomPanel'
import { InputTitle } from '../../../components/Styles/StyledBlocks';
import { StyledButton } from '../../../styles/styles';
import { colorAccent } from '../Style/Styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';

const SliderGrid = styled(Grid)`
  padding: .7rem 2rem .7rem 1rem;
`

const SliderCellColRaw = styled(Col)`
  padding-top: .5rem;
`

const adaptiveRow = {xl: 6, lg: 9, md: 12}
const adaptivCol = {xl: 2, lg: 3, sm: 6}

const OpacityInputTitle = styled(InputTitle)`
    opacity: 0;
`

function SliderCol({title, children}) {
  return <SliderCellColRaw {...adaptivCol}>
      {/*{title ? <InputTitle>{title}</InputTitle> : <OpacityInputTitle>.</OpacityInputTitle>}*/}
      {children}
  </SliderCellColRaw>
}

const StyledButtonSlider = styled(Button)`
  width: 100%;
  background: ${colorAccent} !important;
  padding: 13px 25px;
  border-radius: 4px;
  margin: 2rem 0 0 0;
  font-family: 'SF UI Display Light', sans-serif;
  white-space: nowrap;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff !important;
  border: none;
  height: 2.5rem;
`

let SliderFormItem = styled(Form.Item)`
    font-size: 12pt;
    font-weight: 700;
    margin-bottom: 0;
`

function AddUserSlider({}) {
  let formData = {
    name: "",
    position: "",
    level: "",
    phone: "",
    email: ""
  }
  // let [state, setState] = useState()

  // return (event) => setState(prevState => ({ ...prevState, [fieldName]: event.target.value }));
  function setStField(fieldName) {
    return function(event) {
      formData[fieldName] = event.target.value;
      console.log(formData)
    }
  };
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMark }) => {
    // setRequiredMarkType(requiredMark);
  };

  const validateMessages = {
    required: 'Необходимо ввести ${label}!',
    types: {
      email: '${label} - некорректный email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  let requiredProps = { tooltip: "Это обязательное поле", rules: [ { required: true } ] };


  return (
    <SlidingBottomPanel title="Добавить нового сотрудника" height={450}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        validateMessages={validateMessages}
      >
        <SliderGrid fluid className="resetPadding">
          <Row {...adaptiveRow} className="grid-row-margin-1st">
            <SliderCol title="Ф.И.О.">
              <SliderFormItem label="Ф.И.О." {...requiredProps} name={['user', 'name']}>
                <Input placeholder="Введите ФИО сотрудника" size={'large'} />
              </SliderFormItem>
            </SliderCol>
            <SliderCol>
              <SliderFormItem label="Должность" {...requiredProps} name={['user', 'position']} >
                <Input placeholder="Менеджер" size={'large'} />
              </SliderFormItem>
            </SliderCol>
            <SliderCol>
              <SliderFormItem label="Уровень доступа" {...requiredProps} name={['user', 'level']}>
                <Input placeholder="Администратор" size={'large'} />
              </SliderFormItem>
            </SliderCol>
          </Row>
          <Row {...adaptiveRow} className="grid-row-margin-1st">
            <SliderCol>
              <SliderFormItem required label="Номер телефона" name={['user', 'phone']}>
                <Input placeholder="Введите номер телефона" size={'large'} />
              </SliderFormItem>
            </SliderCol>
            <SliderCol>
              <SliderFormItem label="Е-mail"  rules={[{ required: true, type: "email" }]} name={['user', 'email']}>
                <Input placeholder="Введите номер телефона" size={'large'} />
              </SliderFormItem>
            </SliderCol>
            <SliderCol>
              <StyledButtonSlider type="primary" htmlType="submit">
                Добавить
              </StyledButtonSlider>
            </SliderCol>
          </Row>
        </SliderGrid>
      </Form>



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
