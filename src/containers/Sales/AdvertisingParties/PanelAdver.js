import React, { useState, useEffect } from 'react';
import Table from '../../../components/Tablea';
import { Card, Popover, DatePicker, Form, Input, Checkbox } from 'antd';
import tableFreeIcon from '../../../img/sales/table-free-icon.svg';
import tableSoldIcon from '../../../img/sales/table-sold-icon.svg';
import Tab from './Tab';
import { StyledButton } from '../../../components/Styles/DesignList/styles';

import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

// ICONS
import date from '../../../img/left-bar/filter/date.svg';
import inputIcon from '../../../img/sales/projectNameInput.svg';
import { ReactComponent as CloseIcon } from '../../../img/sales/closeIcon.svg';
import { useHistory } from 'react-router';

const PanelDesign = (props) => {
  const [showCard, setShowCard] = useState(true);
  const [form] = Form.useForm();
  const columns = [
    {
      title: 'код рекламной стороны',
      dataIndex: 'code',
      width: 200,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 100,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>2 марта - 8 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline1',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>9 марта - 15 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline2',
      key: 'timeline',
    },
    {
      title: (
        <>
          <strong style={{ background: 'unset', color: '#1A1A1A !important' }}>16 марта - 22 марта</strong>
          <p style={{ margin: '0', color: '#8AA1C1' }}>Пн Вт Ср Чт Пт Сб Вс</p>
        </>
      ),
      dataIndex: 'timeline3',
      key: 'timeline',
    },
  ];
  const data = [
    {
      key: 1,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 2,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: (
        <Popover content={<Tab history={useHistory()}></Tab>} placement="bottom">
          <div className="page-label">
            <span>Coca-Cola</span>
            <img src={tableSoldIcon} />
          </div>
        </Popover>
      ),
      timeline2: (
        <Popover content={<Tab history={useHistory()}></Tab>} placement="bottom">
          <div className="page-label">
            <span>Coca-Cola</span>
            <img src={tableSoldIcon} />
          </div>
        </Popover>
      ),
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 3,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 4,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
    {
      key: 5,
      code: '#123123123',
      format: 'Сениор',
      city: 'Алматы',
      timeline1: <img src={tableFreeIcon} />,
      timeline2: <img src={tableFreeIcon} />,
      timeline3: <img src={tableFreeIcon} />,
    },
  ];

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

  const checkBoxOptions = [
    { label: 'Брендирование', value: 'branding' },
    { label: 'Дизайн', value: 'design' },
  ];

  const [filter, setFilter] = useState({});

  const onFinish = (values) => {
    console.log(values);
    setFilter(values);
  };

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} link="/sales/project_card" />
      </div>
      {showCard && (
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
              <BtnGroup>
                <SubmitButton
                  style={{
                    padding: '13px 25px',
                    fontWeight: 'bold',
                  }}
                  htmlType="submit"
                  onClick={() => {}}>
                  Забронировать
                </SubmitButton>
              </BtnGroup>
            </Form>
          </Card>
        </div>
      )}
      <style>
        {`.outdoor-table-bar {
            width: 100%;
            margin-left:auto;
          }

          .formItem-title {
            font-weight: bold;
            color: #1A1A1A;
            font-size: 14px
          }

          .date-picker>div {
            margin-left: 25px;
          }

          .projectName-input {
            padding-left: 30px;
          }
         `}
      </style>
    </>
  );
};

export default PanelDesign;
