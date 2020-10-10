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
            <StyledSelect
              defaultValue={item.backCity ? item.backCity.title : 'Город'}
              onChange={(value) => setItem({ ...item, backCity: { ...item.backCity, id: value } })}>
              <StyledSelect.Option value={1}>Алматы</StyledSelect.Option>
              <StyledSelect.Option value={2}>Астана</StyledSelect.Option>
              <StyledSelect.Option value={3}>Караганда</StyledSelect.Option>
              <StyledSelect.Option value={4}>Тараз</StyledSelect.Option>
            </StyledSelect>
            {/* <StyledInput
              prefix={<img src={cityIcon} />}
              defaultValue={item.backCity ? item.backCity.title : 'Город'}
              onChange={(e) =>
                setItem({ ...item, backCity: { ...item.backCity, title: e.target.value } })
              }></StyledInput> */}
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
            <StyledInput
              prefix={<img src={ownerIcon} />}
              defaultValue={item.backOwner ? item.backOwner : 'Владелец'}
              onChange={(e) => setItem({ ...item, backOwner: e.target.value })}></StyledInput>
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Маркетинговый адрес</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.backMarketingAddress ? item.backMarketingAddress : 'Адрес'}
              onChange={(e) => setItem({ ...item, backMarketingAddress: e.target.value })}></StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '35%' }}>
            <InputTitle>Дата создания</InputTitle>
            <StyledDatePicker />
          </div>
          <div style={{ width: '61%' }}>
            <InputTitle>Комментарий</InputTitle>
            <StyledInput
              defaultValue={item.backComment ? item.backComment : '...'}
              onChange={(e) => setItem({ ...item, backComment: e.target.value })}></StyledInput>
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
}
