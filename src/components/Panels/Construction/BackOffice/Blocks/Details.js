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
              defaultValue={item.familyConstruction ? item.familyConstruction : ''}
              onChange={(e) =>
                setItem({ ...item, familyConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Доступность конструкции</InputTitle>
            
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.availabilityConstruction ? item.availabilityConstruction : ''}
              onChange={(e) =>
                setItem({ ...item, availabilityConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Подсемейство конструкции</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.underFamilyConstruction ? item.underFamilyConstruction : ''}
              onChange={(e) =>
                setItem({ ...item,  underFamilyConstruction: e.target.value  })
              }></StyledInput>
           
          
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Модель</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.modelConstruction ? item.modelConstruction : ''}
              onChange={(e) =>
                setItem({ ...item,  modelConstruction: e.target.value  })
              }></StyledInput>
           
          </div>
        </Row>
        <Row>
          <div>
            <InputTitle onClick={() => openNotification('bottomRight')}>Наличие земли (!)</InputTitle>
            <StyledRadio 
              defaultValue={item.hasArea ? item.hasArea : false}
              onChange={(e) =>
                setItem({ ...item,  hasArea: e.target.value  })
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
