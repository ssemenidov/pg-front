import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Input } from 'antd';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';

import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { InfoList, InfoItem, InfoLine, InfoValue, InfoInput, InfoTitle } from '../../../components/Styles/InfoPanel';

import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SidebarInfo from '../../../components/SidebarInfo';

import PanelDesign from './PanelProject_card';

import { sidebarInfoData } from '../stubDataSource';

import collapseIcon from '../../../img/collapse-icon.svg';


const PROJECT_QUERY = gql`
query ($id: ID!) {
  searchProject(id:$id) {
    edges {
      node {
        id
        title
        code
        creator {
          id
          firstName
          lastName
          lastLogin
          
        }
        comment
        brand {
          title
          workingSector {
            title
          }
        }
        salesManager {
          firstName
          lastName
        }
        backOfficeManager {
          firstName
          lastName
        }
        agencyCommission
        
        reservations {
          edges {
            node {
              id
              dateFrom
              dateTo
              project {
                code
                title
                brand {
                  id
                  title
                }
                createdAt
                additionalCosts {
                  edges {
                    node {
                      title
                      city {
                        title
                        
                      }
                      summa
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
  `;



// const queries = [PROJECT_QUERY, APPS_QUERY]

const Project_card = () => {
  const history = useHistory();
  const { id } = useParams();
  const [block, setBlock] = useState(0);
  // const [query, setQuery] = useState(PROJECT_QUERY)
  const { loading, error, data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: id,
    },
  });

  let dataItem = data ? data.searchProject.edges[0].node : null;

  let sideBarResData = dataItem ? [
    {
      id: 1,
      title: 'О проекте',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: [
        {
          title: 'Код проекта:',
          value: '#' + dataItem.code
        },
        {
          title: 'Менеджер бэк-офиса:',
          value: dataItem.backOfficeManager.firstName + ' ' + dataItem.backOfficeManager.lastName
        },
        {
          title: 'Менеджер по продажам:',
          value: dataItem.salesManager.firstName + ' ' + dataItem.salesManager.lastName
        }
      ]
    },
    {
      id: 2,
      title: 'Информация о бренде',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: [
        {
          title: 'Бренд:',
          value: dataItem.brand.title
        },
        {
          title: dataItem.brand.workingSector ? 'Сектор деятельности:' : '',
          value: dataItem.brand.workingSector ? dataItem.brand.workingSector.title : ''
        }
      ]
    },
    {
      id: 3,
      title: 'Доп. инфо',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: [
        {
          title: 'Рекламодатель:',
          value: 'Агенство'
        },
        {
          title: 'Рекламное агентство:',
          value: '-'
        },
        {
          title: 'Брендинг',
          value: '9 999 тг.'
        },
        {
          title: dataItem.agencyCommission ? 'Агентская комиссия::' : '',
          value: dataItem.agencyCommission ? dataItem.agencyCommission : ''
        }
      ]
    },
    {
      id: 4,
      title: 'Комментарий к проекту',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: [
        {
          title: dataItem.comment
        }
      ]
    },
  ] : null;

  let panelData = dataItem ? dataItem.reservations.edges.map(item => {
    console.log('[item.node.id]', item.node);
    let dateFrom = new Date(item.node.dateFrom)
    let dateTo = new Date(item.node.dateTo)
    let dateCreate = new Date(item.node.project.createdAt)
    return({
      id: item.node.id,
      code: '#' + item.node.project.code,
      summa: item.node.project.additionalCosts.edges[0].node.summa,
      createDate: dateCreate.getFullYear() + '-' + (dateCreate.getMonth() + 1) + '-' + dateCreate.getDate() ,
      reservDates: dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + dateFrom.getDate() + ' - ' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(),
      dateForRouter: [item.node.dateFrom, item.node.dateTo]
    })
  }) : null;

  console.log('[DATA]', panelData)
  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/project_card', value: 'Проекты' },
  ];

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
            <JobTitle>Проект Coca-cola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
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
                    history.push('/sales/project_card' + id + 'estimate');
                  }}>
                  Смета проекта
                </StyledButton>
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <div style={{ marginRight: 30 }}>
            <SidebarInfo
              data={sideBarResData}
            />
          </div>
          {
            panelData && (
              <PanelDesign
              style={{ flex: '0 1 auto' }}
              setBlock={setBlock}
              choosedBlock={block}
              data={panelData}
            />
            )
          }
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
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
