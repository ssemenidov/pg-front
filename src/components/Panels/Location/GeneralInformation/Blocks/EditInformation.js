import React, { useContext, useState, useEffect } from 'react';
import {gql, useMutation} from "@apollo/client";

import { locationContext } from '../../../../../containers/Base/Location/Location';
import { Input, Select, Upload, message } from 'antd';
import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../Styles/DesignList/styles';
import anchorIcon from '../../../../../img/input/anchor.svg';

import { StyledSelect,StyledInput } from '../../../../Styles/DesignList/styles';
import {useParams} from "react-router";

const UPLOAD_DOCUMENTS = gql`
  mutation($id: ID! $document: Upload, $prolongation: Upload) {
    updateLocation(
      id: $id,
      input: {
        document: $document,
        prolongation: $prolongation
      }
    ) {
      location {
        id
        document
        prolongation
      }
    }
  }
`;

export const EditInformation = () => {
  const { id } = useParams();

  const [item, setItem] = useContext(locationContext);
  const [fileList, setFileList] = useState([]);
  const [uploadDocument] = useMutation(UPLOAD_DOCUMENTS);

  useEffect(() => {
    if(item.document) {
      setFileList([{
        uid: '-1',
        name: item.document.replace('location/', ''),
        status: 'done',
        url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${item.document}`,
      }])
    }
  }, []);

  const uploadRequest = (info) => {
    uploadDocument({
      variables: {
        id: id,
        document: info.file
      }
    })
      .then((res) => {
        const url = res.data.updateLocation.location.document;

        setItem({
          ...item,
          document: url
        })

        let fileList = [{
          uid: '-1',
          name: info.file.name,
          status: 'done',
          url: `${process.env.REACT_APP_BACKEND_URL.replace('/api/', '')}/media/${url}`,
        }];

        setFileList(fileList);
        message.success('File uploaded successfully');
      })
      .catch((error) => {
        message.error('Is not a upload');
        console.error(error);
      })
  }
  const removeDoc = () => {
    uploadDocument({
      variables: {
        id: id,
        document: null
      }
    })
      .then((res) => {
        const url = res.data.updateLocation.location.document;

        setItem({
          ...item,
          document: url
        })

        setFileList([]);
        message.success('File deleted successfully');
      })
      .catch((error) => {
        message.error('Something went wrong');
        console.error(error);
      })
  }

  const uploadConfig = {
    name: 'file',
    customRequest(info) {
      uploadRequest(info);
    },
    onRemove() {
      removeDoc();
    }
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
