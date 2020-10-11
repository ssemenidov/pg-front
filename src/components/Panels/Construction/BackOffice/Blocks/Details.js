import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { Radio, notification } from 'antd';
import styled from 'styled-components';

import { BlockBody, Row, Medium, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, StyledSelect,StyledInput } from '../../../../../styles/styles';
import GroupRadio from '../../../../Inputs/GroupRadio';
import InputAnchor from '../../../../Inputs/InputAnchor';
import { SecondaryBtnStyled } from '../../../../Styles/ButtonStyles';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';
import anchorIcon from '../../../../../img/input/anchor.svg';

const openNotification = (placement) => {
  notification.info({
    message: 'Уведомление',
    description: 'Нобходимо привязать местоположение к конструкции!',
    placement,
  });
};

export default function Details() {
  const [item, setItem] = useContext(constructContext);
  return (
    <Medium>
      <BlockTitle>Детали конструкции</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Семейство конструкции</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.backFamilyConstruction ? item.backFamilyConstruction : 'Семейство'}
              onChange={(e) =>
                setItem({ ...item, backFamilyConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Доступность конструкции</InputTitle>
            
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.backAvailabilityConstruction ? item.backAvailabilityConstruction : 'Доступность'}
              onChange={(e) =>
                setItem({ ...item, backAvailabilityConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Подсемейство конструкции</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item. backUnderFamilyConstruction ? item. backUnderFamilyConstruction : 'Подсемейство'}
              onChange={(e) =>
                setItem({ ...item,  backUnderFamilyConstruction: e.target.value  })
              }></StyledInput>
           
          
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Модель</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.backModelConstruction ? item.backModelConstruction : 'Модель'}
              onChange={(e) =>
                setItem({ ...item,  backModelConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle onClick={() => openNotification('bottomRight')}>Наличие земли (!)</InputTitle>
            <StyledRadio 
              defaultValue={item.backHasArea ? item.backHasArea : null}
              onChange={(e) =>
                setItem({ ...item,  backHasArea: e.target.value  })
              }>
              <Radio value={true}>Есть</Radio>
              <Radio value={false}>Нет</Radio>
            </StyledRadio>
          </div>
          <StyledButton backgroundColor="#2C5DE5">Открыть местоположение</StyledButton>
        </Row>
      </BlockBody>
    </Medium>
  );
}

const StyledRadio = styled(Radio.Group)`
  height: 40px !important;
  display: flex;
  align-items: center;

  span {
    color: #1a1a1a !important;
  }
`;
