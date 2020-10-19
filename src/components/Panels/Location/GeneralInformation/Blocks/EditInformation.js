import React, { useContext } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input,Butt} from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../../styles/styles';

export const EditInformation = (props) => {
  const [item, setItem] = useContext(locationContext);


  return (
    <Medium>
      <BlockTitle>
        <span>  Редактирование информации </span>
      
        <StyledButton backgroundColor="#fff" style={{color:"#003360"}}>Файл</StyledButton>
         </BlockTitle>
      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Площадь (га)</InputTitle>
            <Input  
              value={item.area ? item.area :""}
              onChange={(e) => {setItem({...item, area:e.target.value})}}
              placeholder="34"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Кадастровый номер</InputTitle>
            <Input

            value={item.cadastralNumber ? item.cadastralNumber :""}
            onChange={(e) => {setItem({...item, cadastralNumber:e.target.value})}}
              placeholder="00-000-000-000"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Целевое назначение</InputTitle>
            <Input
            
              value={item.targetPurpose ? item.targetPurpose :""}
              onChange={(e) => {setItem({...item, targetPurpose:e.target.value})}}
              placeholder="Рекламно-информационный объект"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Комментарий</InputTitle>
            
            <Input.TextArea rows={2}
              value={item.comment ? item.comment :""}
              onChange={(e) => {setItem({...item, comment:e.target.value})}}
              size={'large'}
            />
          </div>
        </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
