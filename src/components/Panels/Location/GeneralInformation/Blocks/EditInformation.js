import React, { useContext, useState } from 'react';
import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input, Select, Upload, message } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../../styles/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

import { StyledSelect,StyledInput } from '../../../../../styles/styles';
export const EditInformation = (props) => {
  const [item, setItem] = useContext(locationContext);
  const [fileList, setFileList] = useState([]);

  const uploadConfig = {
    name: 'file',
    action: () => {
      return
    },
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-2);
      fileList = fileList.map(file => {
        if (file.response) {
          // Component will show file.url:link
          file.url = file.response.url;
        }
        return file;
      });

      setFileList(fileList)
    },
  };

  return (
    <Medium>
      <BlockTitle>
          <span style={{ maxWidth: '160px', marginBottom: 10 }}> Редактирование информации </span>
          <Upload
            {...uploadConfig}
            fileList={fileList}
          >
            <StyledButton
              backgroundColor="#fff"
              style={{color:"#003360"}}
              type="button"
            >
              Файл
            </StyledButton>
          </Upload>
      </BlockTitle>

      <BlockBody>
        <Row>
          <div style={{ width: '100%' }}>
            <InputTitle>Площадь (га)</InputTitle>
            <StyledInput
            prefix={<img src={anchorIcon} />}
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
            <StyledInput
            prefix={<img src={anchorIcon} />}
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
            <StyledInput
              placeholder="Рекламно-информационный объект"
              size={'large'}
              defaultValue={item.targetPurpose ? item.targetPurpose:""}
              onChange={(value) => setItem({ ...item, targetPurpose: value  })}>

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
