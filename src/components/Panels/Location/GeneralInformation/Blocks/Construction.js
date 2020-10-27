import React from 'react';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { RedDeleteBtn, SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import red_can from '../../../../../img/outdoor_furniture/red_can.svg';

export const Construction = ({ code, marketingAddress, familyConstruction, remove, open }) => {

  return (
    <Medium>
      <BlockTitle>Конструкция - номер</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Код конструкции</InputTitle>
            <InputAnchor
              placeholder="050001.00361.01"
              value={code ? code : 'Нет данных'}
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
            placeholder="Алматы, Абая ост."
            value={marketingAddress ? marketingAddress : 'Нет данных'}
          />
          </div>
        </Row>
        <Row style={{ borderBottom: '1px solid #d3dff0' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <p>Формат</p>
            <p>
              {
                (
                  familyConstruction
                  && familyConstruction.underFamilyConstruction
                  && familyConstruction.underFamilyConstruction.edges.length
                )
                ? 'null'
                : 'Нет данных'
              }
            </p>
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
