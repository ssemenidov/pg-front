import React, { useState, useEffect } from 'react';
import Table from '../../../../components/Tablea';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../components/Styles/StyledBlocks';
import { Select,DatePicker} from 'antd';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../styles/styles';

import anchorIcon from '../../../../img/input/anchor.svg';

const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Код договора',
      dataIndex: 'code',

      width: 130,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',

      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'sector',
      width: 100,
    },
    {
      title: 'Создано',
      dataIndex: 'create',
      width: 100,
    },
    {
      title: 'Создатель',
      dataIndex: 'creator',
      width: 100,
    },
    {
      title: 'Приложение',
      dataIndex: 'application',
      width: 100,
    },
  ];

  const data = [
    {
      key: 1,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 2,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 3,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 4,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
    {
      key: 5,
      code: '#2020050301323',
      brand: 'CocaCola',
      sector: 'Производство напитков',
      create: '29.05.2020',
      creator: 'Колобов Анемподист',
      application: '02394.pdf',
    },
  ];

  return (
    <>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Наименование контрагента</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '207px' }}/>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '207px' }}/>
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '207px' }}/>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Создатель</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
              <div style={{ margin: '0 0 0 ц0.75vw' }}>
                <InputTitle>Инициатор</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Тип договора</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Срок оплаты</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Статус возврата</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
            </Row>

            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Комментарий</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
             ></StyledInput>
              </div>
            </Row>
          </BlockBody>
        </Medium>
      </div>
      <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data} />
        </div>
        <style>
          {`.outdoor-table-bar {
            width: 100%;
          }
          `}
        </style>
      </div>
    </>
  );
};

export default PanelDesign;
