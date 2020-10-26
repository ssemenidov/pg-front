import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { RedDeleteBtn, SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import red_can from '../../../../../img/outdoor_furniture/red_can.svg';

export const Construction = ({ code, marketingAddress, remove, open }) => {

  return (
    <Medium>
      <BlockTitle>Конструкция - номер</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код конструкции</InputTitle>
            <InputAnchor
              placeholder={code}
              value={code}
            />
          </div>
        </Row>
        <Row style={{ borderTop: '1px solid #d3dff0' }}>
          <InputTitle>Информация о конструкции</InputTitle>
        </Row>
        <Row>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <InputTitle style={{ width: '45%' }}>Маркетинговый адрес</InputTitle>
          <InputAnchor
            style={{ width: '50%' }}
            placeholder={marketingAddress}
            value={marketingAddress}
          />
          </div>
        </Row>
        <Row style={{ borderBottom: '1px solid #d3dff0' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <p>Формат</p>
            <p>Сениор</p>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <SecondaryBtnStyled
              type="button"
              onClick={(e) => open(e)}
            >
              Открыть конструкцию
            </SecondaryBtnStyled>
            <RedDeleteBtn
              type="button"
              onClick={(e) => remove(e)}
            >
              <img src={red_can} alt="img" />
            </RedDeleteBtn>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default Construction;
