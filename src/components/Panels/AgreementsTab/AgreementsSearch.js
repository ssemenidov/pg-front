import React, { useState } from 'react';
import { Radio, DatePicker } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../Styles/StyledBlocks';
import InputAnchor from '../../Inputs/InputAnchor';
//import DatePicker from '../../Inputs/DatePicker';
import GroupRadio from '../../Inputs/GroupRadio';
import { StyledButton } from '../../../styles/styles';

const AgreementsSearch = () => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Medium>
      <BlockTitle>Поиск договора</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Номер договора</InputTitle>
            <InputAnchor placeholder="Номер договора" />
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Инициатор</InputTitle>
            <InputAnchor placeholder="Инициатор" />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Наименование контрагента</InputTitle>
            <InputAnchor placeholder="Наименование контрагента" />
          </div>
          <div style={{ margin: '0 0 0 0.75vw' }}>
            <InputTitle>Создатель</InputTitle>
            <InputAnchor placeholder="Создатель" />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Тип договора</InputTitle>
            <InputAnchor placeholder="Тип договора" />
          </div>
          <div style={{ margin: '0 0 0 ц0.75vw', display: 'flex', flexDirection: ' column', alignItems: 'flex-end' }}>
            <InputTitle>Дата начала действия договора</InputTitle>
            <DatePicker style={{ height: '53px', width: '203px' }} />
          </div>
        </Row>
        <Row>
          <div style={{ margin: '0 0.75vw 0 0' }}>
            <InputTitle>Дата заключения договора</InputTitle>
            <DatePicker style={{ height: '53px', width: '203px' }} />
          </div>
          <div style={{ margin: '0 0 0 0.75vw', display: 'flex', flexDirection: ' column', alignItems: 'flex-end' }}>
            <InputTitle>Дата окончания действия договора</InputTitle>
            <DatePicker style={{ height: '53px', width: '203px' }} />
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle>Статус возврата</InputTitle>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Есть</Radio>
              <Radio value={2}>Нет</Radio>
            </Radio.Group>
          </div>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <StyledButton
            style={{ margin: '0 15px 0 0', background: '#EEF3FF', color: '#2C5DE5', border: '1px solid #2C5DE5' }}
            backgroundColor="#2c5de5">
            Очистить
          </StyledButton>
          <StyledButton style={{ margin: '0' }} backgroundColor="#2c5de5">
            Искать
          </StyledButton>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default AgreementsSearch;
