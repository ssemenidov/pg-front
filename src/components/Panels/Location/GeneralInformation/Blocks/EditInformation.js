import React, { useContext } from 'react';

import { locationContext } from '../../../../../containers/Base/Location/Location';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledInput } from '../../../../Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';


export const EditInformation = () => {
  const [item, setItem] = useContext(locationContext);

  return (
    <Medium>
      <BlockTitle>
          <span style={{ maxWidth: '160px', marginBottom: 10 }}> Редактирование информации </span>
      </BlockTitle>

      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Площадь (га)</InputTitle>
            <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={item.area ? item.area :""}
              onChange={(e) => {setItem({...item, area:e.target.value})}}
              placeholder="34"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Кадастровый номер</InputTitle>
            <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={item.cadastralNumber ? item.cadastralNumber :""}
            onChange={(e) => {setItem({...item, cadastralNumber:e.target.value})}}
              placeholder="00-000-000-000"
              size={'large'}
            />
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Целевое назначение</InputTitle>
            <StyledInput
              placeholder="Рекламно-информационный объект"
              prefix={<img src={anchorIcon} />}
              size={'large'}
              defaultValue={item.purposeLocation ? item.purposeLocation.title : ""}
              onChange={(e) => setItem({ ...item, targetPurpose: {
                ...item.targetPurpose,
                  title: e.target.value
                }
              })}
            >
            </StyledInput>
          </div>
        </Row>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Комментарий</InputTitle>

            <StyledInput.TextArea rows={2}
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
