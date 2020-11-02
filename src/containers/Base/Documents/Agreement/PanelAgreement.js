import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import Table from '../../../../components/Tablea';
import { agreementContext } from './Agreement';

import { BlockBody, Medium, Row, BlockTitle, InputTitle } from '../../../../components/Styles/StyledBlocks';
import { Select,DatePicker,Upload} from 'antd';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../styles/styles';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../styles/styles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import anchorIcon from '../../../../img/input/anchor.svg';
import styled from 'styled-components';
const CONTRACT_UPDATE = gql`
mutation(
  $id:ID!
  $creator:String
) {
  updateContract(
    id:$id
    input: {
      creator:$creator
    }
  ) {
    contract {
      id
    }
  }
}
`;

const columns = [
  {
    title: 'Код договора',
    dataIndex: 'code',

    width: 130,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',

    width: 100,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'sector',
    width: 100,
  },
  {
    title: 'Создано',
    dataIndex: 'create',
    width: 100,
  },
  {
    title: 'Создатель',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: 'Приложение',
    dataIndex: 'application',
    width: 100,
  },
];

var data = [
  {
    key: 1,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 2,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 3,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 4,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 5,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
];
const PanelDesign = (props) => {
  const  [item,setItem] =useContext(agreementContext);
  const [updateContract] = useMutation(CONTRACT_UPDATE);
  const Update = () => {
    console.log(item);
    updateContract({ variables: {
       ...item
       } });
    // history.push(`/base/outdoor_furniture`);
    // history.go(0);
  };
  if (item.attachmentSet && item.attachmentSet.edges.length){
    data = item.attachmentSet.edges.map((attach) => ({
      key: attach.node.id,
     
    }));
  }
  return (
    <form>
    <HeaderWrapper>
    <HeaderTitleWrapper>
      <TitleLogo />
      <JobTitle>Договор № 2020050301323</JobTitle>
    </HeaderTitleWrapper>
    <ButtonGroup>
      <StyledButton backgroundColor="#008556" >
        Сохранить
      </StyledButton>
    </ButtonGroup>
  </HeaderWrapper>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <Medium>
          <BlockTitle>Редактирование информации</BlockTitle>
          <BlockBody>
            <Row>
            <SearchItem>
                <InputTitle>Наименование контрагента</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.partner ? item.partner.title:""}
              // onChange={(value) => setItem({ ...item, partner: {...item.partner,title:value}  })}
              
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
              prefix={<img src={anchorIcon} />}

              defaultValue={item.creator ? item.creator:""}
              onChange={(value) => setItem({ ...item, creator: value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Инициатор</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.initiator ? item.initiator:""}
              onChange={(value) => setItem({ ...item, initiator: value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Тип договора</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.contractType ? item.contractType:""}
              onChange={(value) => setItem({ ...item, contractType: value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Срок оплаты</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.paymentDate ? item.paymentDate:""}
              onChange={(value) => setItem({ ...item, paymentDate: value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>Подписант в именительном падеже</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.signatoryOne ? item.signatoryOne:""}
              onChange={(value) => setItem({ ...item, signatoryOne: value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Подписант в родительном падеже</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.signatoryTwo ? item.signatoryTwo:""}
              onChange={(value) => setItem({ ...item, signatoryTwo: value})}
             ></StyledInput>
               </SearchItem>
            </Row>
            <Row>
               <SearchItem>
                <InputTitle>На основании какого документа действует подписант?</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              prefix={<img src={anchorIcon} />}
              defaultValue={item.basedOnDocument ? item.basedOnDocument:""}
              onChange={(value) => setItem({ ...item, basedOnDocument: value})}
             ></StyledInput>
               </SearchItem>
               <SearchItem>
                <InputTitle>Статус возврата</InputTitle>
                <StyledInput
              prefix={<img src={anchorIcon} />}
              prefix={<img src={anchorIcon} />}
              defaultValue={item.basedOnDocument ? item.basedOnDocument:""}
              onChange={(value) => setItem({ ...item, basedOnDocument: value})}
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
               onChange={(value) => setItem({ ...item, comment: value})}
              size={'large'}
            />
                
               </SearchItem>
            </Row>
          </BlockBody>
        </Medium>
      </div>
      <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data}  title={`Связанные проекты`}/>
        </div>
        <style>
          {`.outdoor-table-bar {
            width: 100%;
          }
          `}
        </style>
      </div>
    </div>
    </form>
  );
};

export default PanelDesign;
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