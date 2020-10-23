import React, { useContext, useState } from 'react';
import { Upload, message  } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function Others() {
  const [item, setItem] = useContext(constructContext);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const loadClickHandler = (e) => {
    e.preventDefault();
    alert('loading');
  };

  const handleChange = info => {
    console.log('info.file.status ', info.file.status)

    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl => {
        setLoading(false);
        setImageUrl(imageUrl)
      });
      message.success(`${info.file.name} file uploaded successfully`);
    }
    if(info.file.status === 'error') {
      message.error(`${info.file.name} is not a upload`);
      setLoading(false);
    }
  };

  return (
    <Medium style={{ minHeight: 600 }}>
      <BlockTitle>Другие параметры</BlockTitle>
      <BlockBody>
        <Row>
          <ImageBody>
            {
              imageUrl
                  ? <img
                      src={imageUrl}
                      alt="avatar"
                      width="100%"
                      height="100%"
                  />
                  : <img src={photo} alt="" width="100%" height="100%" />
            }
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
          <Upload
              name="avatar"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
          >
            <BtnStyledSecondary type="button">
              Загрузить фото
              {
                loading &&
                <CircularProgress
                    size={10}
                    color="#ffffff"
                    style={{ marginLeft: 10 }}
                />
              }
            </BtnStyledSecondary>
          </Upload>

        </Row>
      </BlockBody>
    </Medium>
  );
}
