import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';

import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../styles/styles';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { getConstructionProps } from '../../../../../store/actions/constructionActions';

import cityIcon from '../../../../../img/input/input-city.svg';
import anchorIcon from '../../../../../img/input/anchor.svg';
import mailIcon from '../../../../../img/input/mail.svg';
import ownerIcon from '../../../../../img/input/owner.svg';

export default function Intro() {
  const [item, setItem] = useContext(constructContext);

  return (
    <Medium>
      <BlockTitle>Общая информация</BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Город</InputTitle>

            <StyledInput
              prefix={<img src={cityIcon} />}
              defaultValue={item.backCity ? item.backCity.title : 'Город'}
              onChange={(e) =>
                setItem({ ...item, backCity: { ...item.backCity, title: e.target.value } })
              }></StyledInput>
          </div>
          <div style={{ width: '35%' }}>
            <InputTitle>Район</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.backDistrict ? item.backDistrict.title : 'Район'}
              onChange={(e) =>
                setItem({ ...item, backDistrict: { ...item.backDistrict, title: e.target.value } })
              }></StyledInput>
          </div>
          <div style={{ width: '22%' }}>
            <InputTitle>Код района</InputTitle>
            <StyledInput
              prefix={<img src={mailIcon} />}
              defaultValue={item.backPostcode ? item.backPostcode : 'Код'}
              onChange={(e) => setItem({ ...item, backPostcode: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Владелец</InputTitle>
            <InputTitle>Код района</InputTitle>
            <StyledInput
              prefix={<img src={ownerIcon} />}
              defaultValue={item.backOwner ? item.backOwner : 'Владелец'}
              onChange={(e) => setItem({ ...item, backOwner: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            <StyledInput prefix={<img src={anchorIcon} />} />
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            <StyledDatePicker />
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput placeholder={'...'} />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
