import React, { useContext } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../../styles/styles';
import {
  BlockBody,
  BlockTitleText,
  ImageBody,
  Medium,
  Row,
  BlockTitle,
  InputTitle,
} from '../../../../Styles/StyledBlocks';
import { BtnStyledSecondary } from '../../../../Styles/ButtonStyles';
import photo from '../../../../../img/outdoor_furniture/photo_load.png';
import anchorIcon from '../../../../../img/input/anchor.svg';


export default function Others() {
  const [item, setItem] = useContext(constructContext);
  const loadClickHandler = (e) => {
    e.preventDefault();
    alert('loading');
  };
  return (
    <Medium style={{ minHeight: 600 }}>
      <BlockTitle>Другие параметры</BlockTitle>
      <BlockBody>
        <Row>
          <ImageBody>
            <img src={photo} alt="" width="100%" height="100%" />
          </ImageBody>
          <div style={{ width: '60%' }}>
            <div>
              <InputTitle>Ссылка</InputTitle>
              <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.otherLink ? item.otherLink : ''}
              onChange={(e) => setItem({ ...item, otherLink: e.target.value })}></StyledInput>

            </div>
            <div style={{ marginTop: '20px' }}>
              <InputTitle>Координаты</InputTitle>
              <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.coordinates ? item.coordinates : ''}
              onChange={(e) => setItem({ ...item, coordinates: e.target.value })}></StyledInput>

            </div>
          </div>
        </Row>
        <Row>
          <BtnStyledSecondary onClick={loadClickHandler}>Загрузить фото</BtnStyledSecondary>
        </Row>
      </BlockBody>
    </Medium>
  );
}
