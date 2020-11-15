import { Card, Checkbox, DatePicker, Form, Input } from 'antd';
import { ReactComponent as CloseIcon } from '../../../img/sales/closeIcon.svg';
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import React from 'react';


const checkBoxOptions = [
  { label: 'Брендирование', value: 'branding' },
  { label: 'Дизайн', value: 'design' },
];

const CardTitle = () => {
  return (
    <>
        <span
          style={{
            color: '#003360',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginRight: '40px',
          }}>
          Быстрая бронь
        </span>
      <span
        style={{
          color: '#D42D11',
          fontWeight: 'bold',
        }}>
          (24 шт.)
        </span>
    </>
  );
};

const InputIcon = ({ img, alt }) => {
  return (
    <span
      style={{
        position: 'absolute',
        transform: 'translate(55% ,30%)',
        zIndex: '99',
      }}>
        <img src={img} alt={alt} />
      </span>
  );
};


const DateStateText = () => {
  return (
    <p
      style={{
        color: '#2C5DE5',
        fontSize: '14px',
        marginBottom: 0,
        fontWeight: 'bold',
      }}>
      Ок
    </p>
  );
};

export const BottomSlider = ({showCard, setShowCard, onFinish, form}) => (!showCard ? <></> : (
  <div
    style={{
      position: 'absolute',
      right: 0,
      width: '99%',
      bottom: 0,
    }}>
    <Card
      style={{
        boxShadow:
          '0px -4px 6px rgba(0, 0, 0, 0.0973558), 0px -10px 14px rgba(0, 0, 0, 0.12), 0px -25px 27px rgba(0, 0, 0, 0.15), 0px -85px 80px rgba(0, 0, 0, 0.05)',
        borderRadius: '8px 8px 0px 0px',
        borderBottom: 0,
      }}
      title={<CardTitle />}
      extra={
        <CloseIcon
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            setShowCard(!showCard);
          }}
        />
      }>
      <Form
        form={form}
        style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onFinish={onFinish}>
        <Form.Item
          name="startDate"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            width: '100%',
          }}>
          <p className="formItem-title">Дата начала</p>
          <InputIcon img={date} alt="date icon" />
          <DatePicker
            className="date-picker"
            suffixIcon={<DateStateText />}
            size={'large'}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="endDate"
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '300px',
            width: '100%',
          }}>
          <p className="formItem-title">Дата оканчания</p>
          <InputIcon img={date} alt="date icon" />
          <DatePicker
            className="date-picker"
            suffixIcon={<DateStateText />}
            size={'large'}
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="projectName"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <p className="formItem-title">Проект</p>
          <InputIcon img={inputIcon} alt="input icon" />
          <Input size="large" placeholder="Название проекта" className="projectName-input" />
        </Form.Item>

        <Form.Item
          name="additional"
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <p className="formItem-title">Дополнительно</p>
          <Checkbox.Group options={checkBoxOptions} defaultValue={['branding', 'design']} />
        </Form.Item>
        {/* <BtnGroup> */}
        <SubmitButton
          style={{
            padding: '13px 25px',
            fontWeight: 'bold',
          }}
          htmlType="submit"
          onClick={() => {}}>
          Забронировать
        </SubmitButton>
        {/* </BtnGroup> */}
      </Form>
    </Card>
  </div>
));
