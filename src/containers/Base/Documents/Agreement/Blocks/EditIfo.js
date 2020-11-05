import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { agreementContext } from '../Agreement';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../../components/Styles/StyledBlocks';
import { Select,DatePicker,Upload} from 'antd';
import { StyledInput, StyledSelect, StyledDatePicker,StyledButton } from '../../../../../components/Styles/DesignList/styles';

import anchorIcon from '../../../../../img/input/anchor.svg';
import ownerIcon from '../../../../../img/input/owner.svg';
import portfolioIcon from '../../../../../img/input/portfolio.svg';
import grateIcon from '../../../../../img/input/grate.svg';
import contractIcon from '../../../../../img/input/contract.svg';

export const EditInformation = () => {
  const [item, setItem] = useContext(agreementContext);
  return (
    <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
            <SearchItem>
                <InputTitle>Наименование контрагента</InputTitle>
                <StyledInput
                placeholder="ИП Агенство"
                prefix={<img src={portfolioIcon} />}
                defaultValue={item.partner ? item.partner.title:""}
                // onChange={(e) => setItem({ ...item, partner: {...item.partner,title:value}  })}

                ></StyledInput>
            </SearchItem>
               <SearchItem>
                <InputTitle>Дата заключения</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Начало действия</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
               </SearchItem>
               <SearchItem>
                <InputTitle>Окончание действия</InputTitle>
                <DatePicker placeholder="01/01/2020" size={'large'} format='DD/MM/YYYY'style={{  width: '100%' }}/>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Создатель</InputTitle>
                <StyledInput
                  placeholder="Макаров Ульян"
                  prefix={<img src={ownerIcon} />}

                  defaultValue={item.creator ? item.creator:""}
                  onChange={(e) => setItem({ ...item, creator: e.target.value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Инициатор</InputTitle>
                <StyledInput
                placeholder="Макаров Ульян"
              prefix={<img src={ownerIcon} />}
              defaultValue={item.initiator ? item.initiator:""}
              onChange={(e) => setItem({ ...item, initiator: e.target.value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Тип договора</InputTitle>
                <StyledInput
                 placeholder="С поставщиком"
              prefix={<img src={contractIcon} />}
              defaultValue={item.contractType ? item.contractType:""}
              onChange={(e) => setItem({ ...item, contractType: e.target.value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Срок оплаты</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.paymentDate ? item.paymentDate:""}
              onChange={(e) => setItem({ ...item, paymentDate: e.target.value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <StyledInput
                placeholder="Абрамов Андриан"
              prefix={<img src={ownerIcon} />}
              defaultValue={item.signatoryOne ? item.signatoryOne:""}
              onChange={(e) => setItem({ ...item, signatoryOne: e.target.value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <StyledInput
                placeholder="Макарова Ульяна"
              prefix={<img src={ownerIcon} />}
              defaultValue={item.signatoryTwo ? item.signatoryTwo:""}
              onChange={(e) => setItem({ ...item, signatoryTwo: e.target.value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <StyledInput
      
                placeholder="Документ"
              prefix={<img src={anchorIcon} />}
              defaultValue={item.basedOnDocument ? item.basedOnDocument:""}
              onChange={(e) => setItem({ ...item, basedOnDocument: e.target.value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Статус возврата</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              placeholder="Нет"
              defaultValue={item.basedOnDocument ? item.basedOnDocument:""}
              onChange={(e) => setItem({ ...item, basedOnDocument: e.target.value})}
             ></StyledInput>
               </SearchItem>

            </Row>
            <Row>
            <SearchItem style={{width:"100%"}}>
            <InputTitle>Документы</InputTitle>
            <StyledUpload >
            <StyledButton
              backgroundColor="#2C5DE5"
              type="button"
            >
              Загрузить скан договора (.pdf)
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
               defaultValue={item.comment ? item.comment:""}
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
