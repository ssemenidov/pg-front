import React, { useContext, useState } from 'react';
import {Upload, message, Modal} from 'antd';
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
import {AdminTopLayout} from "../../../../../containers/Administration/AdminTopLayout/AdminTopLayout";

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

  let [visible, setVisible] = useState(false)
  let [codeValue, setCodeValue] = useState("");
  let [title, setTitle] = useState("");

  const showModal = () => setVisible(true);
  const handleOk = e => setVisible(false);
  const handleCancel = e => setVisible(false);

  const loadClickHandler = (e) => {
    e.preventDefault();
    alert('loading');
  };

  const handleChange = info => {
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

  const uploadImg = ({ file, onSuccess }) => {
    let construction_id =  Buffer.from(item.id, 'base64').toString('ascii').match(/\d/gi).join('');
    let entity =  Buffer.from(item.id, 'base64').toString('ascii').split(':')[0];
    let fileInput = file;
    let formData = new FormData();
    formData.append('construction_id', construction_id);
    formData.append('file', fileInput);
    formData.append('id', construction_id);
    formData.append('entity', entity);

    fetch('https://allbot.online/file_upload/', {
      method: 'POST',
      body: formData
    })
      .then((result) => {
        const reader = result.body.getReader();
        // read() returns a promise that resolves
        // when a value has been received
        let resultEncoded = ""
        reader.read().then(function processText({ done, value }) {
          const valueEncoded = new TextDecoder("utf-8").decode(value)
          resultEncoded = resultEncoded + valueEncoded;
          // Result objects contain two properties:
          // done  - true if the stream has already given you all its data.
          // value - some data. Always undefined when done is true.
          if (done) {
            resultEncoded = (
              `Type: ${result.type}\n`
              + `URL: ${result.url}\n`
              + `Ok: ${result.false}\n`
              + `Status: ${result.status}\n`
              + `StatusText: ${result.statusText}\n`
              + `Headers: ${JSON.stringify(result.headers)}\n`
              + `\n`
              + `Body:\n`
              + `${resultEncoded}`
            );
            setCodeValue(resultEncoded)
            console.log(resultEncoded);
            showModal();
            return;
          }
          return reader.read().then(processText);
        })
        onSuccess("ok");
      })
      .catch(error => {
        console.log('error ', error)
        // message.error(`Image is not a upload`);
        // setLoading(false);
      });
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
              customRequest={uploadImg}
              beforeUpload={beforeUpload}
              onChange={handleChange}
          >
            <BtnStyledSecondary type="button">
              Загрузить фото
              {
                loading &&
                <CircularProgress
                    size={10}
                    style={{ marginLeft: 10, color: '#ffffff' }}
                />
              }
            </BtnStyledSecondary>
          </Upload>

        </Row>
      </BlockBody>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <pre>
          {codeValue}
        </pre>
      </Modal>
    </Medium>
  );
}
