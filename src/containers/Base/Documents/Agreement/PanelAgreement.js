import React, { useState, useEffect } from 'react';
import Table from '../../../../components/Tablea';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../components/Styles/StyledBlocks';
import InputAnchor from '../../../../components/Inputs/InputAnchor';
import DatePicker from '../../../../components/Inputs/DatePicker';

import { useHistory } from 'react-router';
const PanelDesign = (props) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 200,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
    },
  ];

  const data = [
    {
      key: '1',
      name: 'test',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'test',
      age: 42,
      address: '10 Downing Street',
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
                <InputAnchor placeholder="Наименование контрагента" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker value={new Date()} />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker value={new Date()} />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker value={new Date()} />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Создатель</InputTitle>
                <InputAnchor placeholder="Создатель" />
              </div>
              <div style={{ margin: '0 0 0 ц0.75vw' }}>
                <InputTitle>Инициатор</InputTitle>
                <InputAnchor placeholder="Инициатор" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Тип договора</InputTitle>
                <InputAnchor placeholder="Тип договора" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Срок оплаты</InputTitle>
                <InputAnchor placeholder="Срок оплаты" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <InputAnchor placeholder="Подписант в именительном падеже" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <InputAnchor placeholder="Подписант в родительном падеже" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <InputAnchor placeholder="Документ" />
              </div>
              <div style={{ margin: '0 0 0 0.75vw' }}>
                <InputTitle>Статус возврата</InputTitle>
                <InputAnchor placeholder="Нет" />
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Документы</InputTitle>
              </div>
            </Row>
            <Row>
              <div style={{ margin: '0 0.75vw 0 0' }}>
                <InputTitle>Комментарий</InputTitle>
                <InputAnchor placeholder="Комментарий" />
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
