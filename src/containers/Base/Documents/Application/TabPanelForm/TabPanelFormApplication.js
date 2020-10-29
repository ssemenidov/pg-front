import React, { useContext, useState } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Upload, DatePicker} from 'antd';

import { ButtonGroup } from '../../../../../components/Styles/ButtonStyles';
import { BlockTitle, Column, InputTitle, JobTitle, Medium, Row as RowStyled } from '../../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../../components/Styles/ComponentsStyles';
import {
  StyledButton, HeaderWrapper, HeaderTitleWrapper,
  StyledInput, StyledSelect
} from '../../../../../components/Styles/DesignList/styles';

import owner from '../../../../../img/input/owner.svg';
import suitcase from '../../../../../img/input/suitcase.svg';

import { constructApplication } from '../Application';

const InnerForm = (props) => {
  const [item, setItem] = useContext(constructApplication);
  const [fileList, setFileList] = useState([]);

  const uploadConfig = {
    name: 'file',
    customRequest: ({ file }) => {
      // let location_id =  Buffer.from(item.id, 'base64').toString('ascii').match(/\d/gi).join('');
      // let entity =  Buffer.from(item.id, 'base64').toString('ascii').split(':')[0];
      // let fileInput = file;
      // let formData = new FormData();
      // formData.append('file', fileInput);
      // formData.append('id', location_id);
      // formData.append('entity', entity);

      // fetch('https://allbot.online/file_upload/', {
      //   method: 'POST',
      //   body: formData
      // })
      //   .then(() => {
      //     console.log('file is upload')
      //   })
      //   .catch(error => {
      //     console.log('error ', error);
      //   });
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
      <form style={{ width: '100%' }}>
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Приложение № 2020050301323</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            <StyledButton backgroundColor="#008556">
              Сохранить
            </StyledButton>
          </ButtonGroup>
        </HeaderWrapper>
        <div>
          <Grid fluid className="resetPadding" style={{ padding: 0 }}>
            <Row xs={12}>
              <Col xs={12}>
                <Medium>
                  <BlockTitle>Редактирование информации</BlockTitle>
                  <div className="block-edit-info" >
                    <RowStyled style={{ alignItems: 'flex-start' }}>
                      <Column className="block-edit-info__column" style={{ width: '45%', marginRight: '77px' }}>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Документы</InputTitle>
                          <Upload
                            {...uploadConfig}
                            fileList={fileList}
                          >
                            <StyledButton
                              type="button"
                              className="block-edit-info__btn-upload"
                            >
                              Загрузить скан приложения (.pdf)
                            </StyledButton>
                          </Upload>
                        </div>
                      </Column>
                      <Column className="block-edit-info__column">
                        <div style={{ width: '100%', marginBottom: '23px' }}>
                          <InputTitle>Дата создания</InputTitle>
                          <DatePicker
                            placeholder="01/01/2020"
                            size={'large'}
                            format='DD/MM/YYYY'
                            style={{ width: '100%' }}
                          />
                        </div>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Номер договора</InputTitle>
                          <StyledInput
                            prefix={<img src={owner} />}
                            defaultValue="98457345"
                          ></StyledInput>
                        </div>
                      </Column>
                      <Column className="block-edit-info__column">
                        <div style={{ width: '100%', marginBottom: '23px' }}>
                          <InputTitle>Создатель</InputTitle>
                          <StyledInput
                            prefix={<img src={owner} />}
                            defaultValue="Макаров Ульян"
                          ></StyledInput>
                        </div>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Менеджер по продажам</InputTitle>
                          <StyledInput
                            prefix={<img src={suitcase} />}
                            defaultValue="ИП Агенство"
                          ></StyledInput>
                        </div>
                      </Column>
                      <Column className="block-edit-info__column">
                        <div style={{ width: '100%', marginBottom: '23px' }}>
                          <InputTitle>Наименование контрагента</InputTitle>
                          <StyledInput
                            prefix={<img src={suitcase} />}
                            defaultValue="ИП Агенство"
                          ></StyledInput>
                        </div>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Статус возвтрата</InputTitle>
                          <StyledSelect
                            prefix={<img src={owner} />}
                            defaultValue="Нет"
                          >
                            <StyledSelect.Option
                              value="Нет"
                            >
                              Нет
                            </StyledSelect.Option>
                          </StyledSelect>
                        </div>
                      </Column>
                      <Column className="block-edit-info__column">
                        <div style={{ width: '100%', marginBottom: '23px' }}>
                          <InputTitle>Бренд</InputTitle>
                          <StyledInput
                            prefix={<img src={owner} />}
                            defaultValue="CocaCola"
                          ></StyledInput>
                        </div>
                        <div style={{ width: '100%' }}>
                          <InputTitle>Период приложения</InputTitle>
                          <StyledInput
                            prefix={<img src={owner} />}
                            defaultValue="19.05.2020 - 25.08.2020"
                          ></StyledInput>
                        </div>
                      </Column>
                    </RowStyled>
                  </div>
                </Medium>
                <style>
                  {`
                  .block-edit-info {
                    padding-left: 30px;
                    padding-right: 30px;
                  }
                  .block-edit-info .row {
                    margin: 0;
                    padding: 20px;
                  }
                  .block-edit-info .ant-divider-horizontal {
                    margin: 0;
                  }
                  .block-edit-info__column {
                    margin-right: 30px;
                  }
                  .block-edit-info__column:last-child {
                    margin-right: 0;
                  }
                  .block-edit-info__btn-upload {
                    padding: 13px 25px;
                    background: #2C5DE5;
                    border-radius: 4px;
                    font-family: 'SF UI Display Light', sans-serif;
                    font-size: 14px;
                    line-height: 14px;
                    text-align: right;
                    color: #FFFFFF;
                    margin: 0 0 25px 0;
                  }
                  .ant-upload-list-item-name.ant-upload-list-item-name-icon-count-1 {
                    font-family: SFUIDisplay;
                    font-size: 14px;
                    line-height: 16px;
                    text-decoration-line: underline;
                    color: #2C5DE5;
                  }
                  .ant-upload-list-item-card-actions {
                    position: absolute !important;
                    right: 0 !important;
                  }
                  .ant-upload-list-item-info>span {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                  }
                  .ant-upload-list-item-name {
                    width: auto !important;
                  }
                `}
                </style>
              </Col>
            </Row>
          </Grid>
        </div>
      </form>
  );
};

export default InnerForm;
