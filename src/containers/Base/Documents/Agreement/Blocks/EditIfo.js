import React, { useContext, useEffect } from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import moment from 'moment';
import styled from 'styled-components';
import { DatePicker, Upload } from 'antd';

import { agreementContext } from '../Agreement';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../../components/Styles/StyledBlocks';
import { StyledInput, StyledSelect, StyledButton } from '../../../../../components/Styles/DesignList/styles';
import SearchSelect from '../../../../../components/SearchSelect';

import anchorIcon from '../../../../../img/input/anchor.svg';
import ownerIcon from '../../../../../img/input/owner.svg';
import portfolioIcon from '../../../../../img/input/portfolio.svg';
import contractIcon from '../../../../../img/input/contract.svg';

const SEARCH_PARTNER = gql`
  query searchPrther(
    $title_Icontains: String
  ) {
    searchPartner(
      title_Icontains: $title_Icontains
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export const EditInformation = () => {
  const [item, setItem] = useContext(agreementContext);

  const [getPartner, partnerInfo] = useLazyQuery(SEARCH_PARTNER);

  useEffect(() => {
    console.log('item ', item)
  }, [item]);

  return (
    <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
            <SearchItem>
                <InputTitle>Наименование контрагента</InputTitle>
                <SearchSelect
                  value={item.partnerId ? item.partnerId : (item.partner && item.partner.id)}
                  defaultValue={<img src={portfolioIcon} />}
                  onChange={(value) => setItem({
                    ...item,
                    partnerId: value
                  })}
                  getData={(value) => getPartner({
                    variables: {
                      title_Icontains: value
                    }
                  })}
                  responseDataInfo={partnerInfo}
                  nameOfQuery="searchPartner"
                  icon={portfolioIcon}
                />
            </SearchItem>
            <SearchItem>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.registrationDate ? moment(item.registrationDate) : ''}
                  onChange={(date) => setItem({ ...item, registrationDate: new Date(date) })}
                  />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker placeholder="01/01/2020"
                size={'large'}
                format='DD/MM/YYYY'
                style={{  width: '100%' }}
                defaultValue={item.start ? moment(item.start) : ''}
                onChange={(date) => setItem({ ...item, start: new Date(date) })}
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.end ? moment(item.end) : ''}
                  onChange={(date) => setItem({ ...item, end: new Date(date) })}
                  />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Создатель</InputTitle>
                <StyledInput
                  placeholder="Макаров Ульян"
                  prefix={<img src={ownerIcon} />}
                  defaultValue={item.creator ? item.creator.name : ""}
                  onChange={(e) => setItem({
                    ...item,
                    creator: {
                      name: e.target.value
                    }
                  })}
                ></StyledInput>
              </SearchItem>
              <SearchItem>
                <InputTitle>Инициатор</InputTitle>
                <StyledInput
                  placeholder="Макаров Ульян"
                  prefix={<img src={ownerIcon} />}
                  defaultValue={item.initiator ? item.initiator.name : ""}
                  onChange={(e) => setItem({
                    ...item,
                    initiator: {
                      name: e.target.value
                    }
                  })}
                ></StyledInput>
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Тип договора</InputTitle>
                <StyledInput
                placeholder="С поставщиком"
                prefix={<img src={contractIcon} />}
                defaultValue={item.contractType ? item.contractType.name : ""}
                onChange={(e) => setItem({
                  ...item,
                  contractType: {
                    name: e.target.value
                  }
                })}
              ></StyledInput>
              </SearchItem>
              <SearchItem>
                <InputTitle>Срок оплаты</InputTitle>
                <DatePicker
                  placeholder="01/01/2020"
                  size={'large'}
                  format='DD/MM/YYYY'
                  style={{  width: '100%' }}
                  defaultValue={item.paymentDate ? moment(item.paymentDate) : ''}
                  onChange={(date) => setItem({ ...item, paymentDate: new Date(date) })}
                />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <StyledInput
                  placeholder="Абрамов Андриан"
                  prefix={<img src={ownerIcon} />}
                  defaultValue={item.signatoryOne ? item.signatoryOne : ""}
                  onChange={(e) => setItem({ ...item, signatoryOne: e.target.value})}
                />
              </SearchItem>
              <SearchItem>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <StyledInput
                placeholder="Макарова Ульяна"
                prefix={<img src={ownerIcon} />}
                defaultValue={item.signatoryTwo ? item.signatoryTwo : ""}
                onChange={(e) => setItem({ ...item, signatoryTwo: e.target.value})}
                />
              </SearchItem>
            </Row>
            <Row>
              <SearchItem>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <StyledInput
                  placeholder="Документ"
                  prefix={<img src={anchorIcon} />}
                  defaultValue={item.basedOnDocument ? item.basedOnDocument : ""}
                  onChange={(e) => setItem({ ...item, basedOnDocument: e.target.value})}
              ></StyledInput>
              </SearchItem>
              <SearchItem>
              <InputTitle>Статус возврата</InputTitle>
              <StyledSelect
                placeholder="Нет"
                defaultValue={item.returnStatus ? item.returnStatus : <img src={anchorIcon} />}
                onChange={(value) => setItem({ ...item, returnStatus: value})}
              >
                <StyledSelect.Option  value={true}>
                  <img src={anchorIcon} />
                  <span>Да</span>
                </StyledSelect.Option>
                <StyledSelect.Option  value={false}>
                  <img src={anchorIcon} />
                  <span>Нет</span>
                </StyledSelect.Option>
              </StyledSelect>
            </SearchItem>
            </Row>
            <Row>
            <SearchItem style={{width:"100%"}}>
            <InputTitle>Документы</InputTitle>
            <StyledUpload >
            <StyledButton
              backgroundColor="#2C5DE5"
              type="button"
              style={{width:"260px"}}
            >
              Загрузить скан  договора (.pdf)
            </StyledButton>

          </StyledUpload>
          <br/>
          <StyledUpload>
            <StyledButton
              backgroundColor="#2C5DE5"
              type="button"
            >
              Загрузить доп соглашение (.pdf)
            </StyledButton>
          </StyledUpload>
          </SearchItem>
          </Row>
            <Row>
              <SearchItem style={{width:"100%"}}>
                <InputTitle>Комментарий</InputTitle>
                <StyledInput.TextArea rows={3}
                  placeholder="..."
                  defaultValue={item.comment ? item.comment : ""}
                  onChange={(e) => setItem({ ...item, comment: e.target.value})}
                  size={'large'}
                />
              </SearchItem>
          </Row>
      </BlockBody>
    </Medium>
  );
};

export default EditInformation;
const SearchItem = styled.div`
  display: flex;
  flex-direction: column;

  width:48%;
  .ant-form-item{
    margin-bottom:0;
  }
`;
const StyledUpload= styled(Upload)`
width: 100%;
display:flex;
justify-content:space-between;
`;
