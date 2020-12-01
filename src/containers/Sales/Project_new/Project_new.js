import React, { useState } from 'react';
import { Input, InputNumber } from 'antd';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import PanelDesign from './PanelProject_new';

import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { CRUDForm } from '../../../components/SlidingBottomPanel/CRUDForm';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';

import { SubmitButton } from '../../../components/Styles/ButtonStyles';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { StyledInput, StyledSelect } from '../../../components/Styles/DesignList/styles';
import { gql, useQuery, useMutation } from '@apollo/client';


const PROJECT_CREATOR = gql`
mutation ($input: CreateProjectInput!){
  createProject(input: $input) {
    project {
      id
    }
  }
}
`

const GET_MANAGERS = gql`
query {
  searchUser {
    edges {
      node {
        id
        firstName
        lastName
      }
    }
  }
}
`

const GET_BRANDS = gql`
query {
  searchBrand {
    edges {
      node {
        id
        title
        
      }
    }
  }
}
`

const GET_WORK_SECTOR = gql`
query {
  searchWorkingSector {
    edges {
      node {
        id
        title
        
      }
    }
  }
}
`

const GET_ADVERTISER = gql`
query {
  searchPartner {
    edges {
      node {
        id
        title
        
      }
    }
  }
}
`

const Project_card = () => {
  const history = useHistory();
  const [block, setBlock] = useState(0);
  const [projectCreator, { data }] = useMutation(PROJECT_CREATOR);
  data && history.push('/sales/prject_card/' + data.createProject.project.id)
  const managers = useQuery(GET_MANAGERS);
  const brands = useQuery(GET_BRANDS);
  const workSec = useQuery(GET_WORK_SECTOR);
  const advert = useQuery(GET_ADVERTISER);
  // console.log('[managers]', managers);
  
  const [projectName, setProjectName] = useState('');
  const [backOffManager, setBackOffManager] = useState('');
  const [salesManager, setSalesManager] = useState('');
  const [creator, setCreator] = useState('');
  const [brand, setBrand] = useState('');
  const [workSector, setWorkSector] = useState('');
  const [advertiser, setAdvertiser] = useState('');
  const [agency, setAgency] = useState('');
  const [agencyCommissionPerc, setAgencyCommissionPerc] = useState('');
  const [agencyCommissionValue, setAgencyCommissionValue] = useState('');
  const [projectComment, setProjectComment] = useState('');

  

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/project_new', value: 'Созать Проект' },
  ];

  let managersData = managers && managers.data ? managers.data.searchUser.edges : null;
  let brandsData = brands && brands.data ? brands.data.searchBrand.edges : null;
  let workSecData = workSec && workSec.data ? workSec.data.searchWorkingSector.edges : null;
  let advertData = advert && advert.data ? advert.data.searchPartner.edges : null;
  let prCreatorObj = {};

  const formSubmitHandler = () => {
    
    


    console.log(data);
    // data && history.push('/sales/project_card/' + data.project.id);
  }

  const prCreator = () => {
    projectCreator({ variables: {
      "input":  prCreatorObj
    } })
  }

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <CreateBtn text="Добавить бронь" />
        <PackageBtn text="Добавить пакет" />
        <EditBtn text="Перейти в монтажи" />
        <PaperBtn text="Сводка проекта" />
        <BoxBtn text="Архив дизайнов" />
      </LeftBar>

      <div style={{ width: '100%', overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Новый проект</JobTitle>
          </HeaderTitleWrapper>
          {/* <ButtonGroup>
            {block === 0 && (
              <>
                <StyledButton
                  backgroundColor="#D42D11"
                  onClick={() => {
                    history.push('/sales/summary');
                  }}>
                  Формирование сводки проекта
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/application');
                  }}>
                  Создать приложение
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/estimate');
                  }}>
                  Смета проекта
                </StyledButton>
              </>
            )}
          </ButtonGroup> */}
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <CRUDForm onFinish={() => {
            let itemD = {
              "title": projectName,
              "agencyComissionPercent": agencyCommissionPerc,
              "agencyComissionValue": agencyCommissionValue,
              "creator": creator,
              "comment": projectComment,
              "brand": brand,
              "backOfficeManager": backOffManager,
              "salesManager": salesManager,
            }
            console.log('[itemD]', itemD)
            console.log('[itemD]', data)
            projectCreator({ variables: {
              "input":  itemD
            } })
          }}>
            <InfoList>
              <InfoItem>
                <InfoTitle>О Проекте</InfoTitle>

                <InfoLine>
                  <span>Код проекта</span>
                  <InfoValue></InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Название проекта</span>
                  <Input onChange={e => {
                    console.log(e.target.value);
                    setProjectName(e.target.value);
                  }} />
                </InfoLine>

                <InfoLine>
                  <span>Создатель</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setCreator(e[1])
                    }}
                  >
                    {
                      managersData && managersData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.firstName + ' ' + item.node.lastName, item.node.id]}><span>{ item.node.firstName + ' ' + item.node.lastName }</span></StyledSelect.Option>
                        )
                      })
                    }
                    
                  </StyledSelect>
                </InfoLine>

                <InfoLine>
                  <span>Менеджер бэк-офиса</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setBackOffManager(e[1])
                    }}
                  >
                    {
                      managersData && managersData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.firstName + ' ' + item.node.lastName, item.node.id] }><span>{ item.node.firstName + ' ' + item.node.lastName }</span></StyledSelect.Option>
                        )
                      })
                    }
                    
                  </StyledSelect>
                </InfoLine>
                <InfoLine>
                  <span>Менеджер по продажам</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      console.log(e[1])
                      setSalesManager(e[1])
                    }}
                  >
                    {
                      managersData && managersData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.firstName + ' ' + item.node.lastName, item.node.id] }><span>{ item.node.firstName + ' ' + item.node.lastName }</span></StyledSelect.Option>
                        )
                      })
                    }
                  </StyledSelect>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Информация о бренде</InfoTitle>

                <InfoLine>
                  <span>Бренд</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setBrand(e[1])
                    }}
                  >
                    {
                      brandsData && brandsData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.title, item.node.id] }><span>{ item.node.title }</span></StyledSelect.Option>
                        )
                      })
                    }
                  </StyledSelect>
                </InfoLine>
                <InfoLine>
                  <span>Сектор деятельности:</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setWorkSector(e[1])
                    }}
                  >
                    {
                      workSecData && workSecData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.title, item.node.id] }><span>{ item.node.title }</span></StyledSelect.Option>
                        )
                      })
                    }
                  </StyledSelect>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Доп. инфо</InfoTitle>

                <InfoLine>
                  <span>Рекламодатель</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setAdvertiser(e[1])
                    }}
                  >
                    {
                      advertData && advertData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.title, item.node.id] }><span>{ item.node.title }</span></StyledSelect.Option>
                        )
                      })
                    }
                  </StyledSelect>
                </InfoLine>
                <InfoLine>
                  <span>Рекламное агентство</span>
                  {/* <InfoInput onChange={e => {
                    setBackOffManager(e.target.value)
                  }} defaultValue="" /> */}
                  <StyledSelect
                    showSearch
                    onChange={e => {
                      setAgency(e[1])
                    }}
                  >
                    {
                      advertData && advertData.map(item => {
                        return(
                        <StyledSelect.Option value={ [item.node.title, item.node.id] }><span>{ item.node.title }</span></StyledSelect.Option>
                        )
                      })
                    }
                  </StyledSelect>
                </InfoLine>
                <InfoLine>
                  <span>Агентская комиссия</span>
                  <InputNumber
                    defaultValue={agencyCommissionValue}
                    value={agencyCommissionValue}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={e => {
                      setAgencyCommissionPerc(0)
                      setAgencyCommissionValue(e)
                    }}
                  />
                  <InputNumber
                    defaultValue={agencyCommissionPerc}
                    value={agencyCommissionPerc}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    parser={value => value.replace('%', '')}
                    onChange={e => {
                      setAgencyCommissionValue(0)
                      setAgencyCommissionPerc(e)
                    }}
                  />
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>Коментарий к проекту</InfoTitle>

                <InfoLine>
                  <InfoInput.TextArea onChange={e => {
                    console.log(e.target.value)
                    setProjectComment(e.target.value)
                  }} rows={4} defaultValue=" " />
                </InfoLine>
              </InfoItem>
              <SubmitButton 
                onClick={
                  () => {}
                } 
              >
                Создать проект
              </SubmitButton>
            </InfoList>
          </CRUDForm>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
        </div>
      </div>

      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;

          }
        `}
      </style>
    </div>
  );
};

export default Project_card;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 1.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 370px;
  box-sizing: border-box;
  width: 40vw;
`;
const InfoItem = styled.li`
  margin: 4% 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d3dff0;
`;
const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: block;
  justify-content: space-between;
  font-size: 14px;
`;
const InfoValue = styled.span`
  font-weight: 600;
  text-align: right;
`;
const InfoInput = styled(Input)`
  font-weight: 600;

  margin-left: auto;
  width: 150px;
`;

