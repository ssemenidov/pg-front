import React, { useState,useContext } from 'react';
import {  agreementsContext } from '../../../containers/Base/Documents/Agreements/InnerForm';
import { Radio, DatePicker ,Form,Input} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

const AgreementsSearch = () => {
  const [form] = Form.useForm();
  const [filter, setFilter] = useContext(agreementsContext);
  const onFinish = (values) => {
    setFilter(values);

    console.log(filter);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    
    <Medium>
      <BlockTitle>Поиск договора</BlockTitle>
      <BlockBody>
      <Form form={form} onFinish={onFinish}>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Номер договора</InputTitle>
            <Form.Item name="resolutionNumber" >
              <Input placeholder="Номер договора" size={'large'} />
            </Form.Item>
          </div>
          <div style={{ margin: '0 0 0  0.75vw' }}>
            <InputTitle>Инициатор</InputTitle>
            <Form.Item name="initiator" >
              <Input placeholder="Инициатор" size={'large'} />
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
            <InputTitle>Создатель</InputTitle>
            <Form.Item name="creator" >
              <Input placeholder="Создатель" size={'large'} />
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Тип договора</InputTitle>
            <Form.Item name="resolutionType" >
              <Input placeholder="Тип договора" size={'large'} />
            </Form.Item>
          </div>
          <div style={{ margin: '0 0 0 ц0.75vw', display: 'flex', flexDirection: ' column', alignItems: 'flex-end' }}>
            <InputTitle>Дата начала действия договора</InputTitle>
            <Form.Item name="startdate" >
            <DatePicker style={{ height: '40px', width: '203px' }} />
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Дата заключения договора</InputTitle>
            <Form.Item name="conclusiondate" >
            <DatePicker style={{ height: '40px', width: '203px' }} />
            </Form.Item>
          </div>
          <div style={{ margin: '0 0 0 0.75vw', display: 'flex', flexDirection: ' column', alignItems: 'flex-end' }}>
            <InputTitle>Дата окончания действия договора</InputTitle>
            <Form.Item name="enddate" >
            <DatePicker style={{ height: '40px', width: '203px' }} />
            </Form.Item>
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle>Статус возврата</InputTitle>
            <Form.Item name="returnStatus" >
            <Radio.Group >
              <Radio value={1}>Есть</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
            </Form.Item>
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
    </Medium>
  );
};

export default AgreementsSearch;
