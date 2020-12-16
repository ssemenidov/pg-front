import React, { useContext } from 'react';

import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { BlockBody, BlockTitle, BlockTitleText, InputTitle, Medium, Row } from '../../../../Styles/StyledBlocks';
import { StyledInput, StyledSelect } from '../../../../Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';

export default function TechParams() {
  const [item, setItem] = useContext(constructContext);
  return (
    <Medium>
      <BlockTitle>Технические параметры</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Техническая проблема</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techProblem ? item.techProblem : ''}
              onChange={(e) => setItem({ ...item, techProblem: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.techComment ? item.techComment : ''}
              onChange={(e) => setItem({ ...item, techComment: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '48%' }}>
            <InputTitle>Статус по подключению</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.statusConnection ? item.statusConnection : ''}
              onChange={(e) => setItem({ ...item, statusConnection: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '48%' }}>
            <InputTitle>Помеха</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item?.obstruction?.title || ''}
              onChange={(e) => setItem({ ...item, obstruction: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
