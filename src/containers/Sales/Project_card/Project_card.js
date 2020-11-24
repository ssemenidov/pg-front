import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Input } from 'antd';
import styled from 'styled-components';
import dateFormat from 'dateformat';
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
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';

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
        createdAt
        creator {
          id
          firstName
          lastName
          lastLogin
        }
        client {
          title
          partnerType {
            title
          }
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
        projectAttachments {
          edges {
            node {
              id
              code
              createdDate
              periodStartDate
              periodEndDate
              returnStatus
            }
          }
        }
        reservations {
          edges {
            node {
              id
              dateFrom
              dateTo
              branding
              constructionSide {
                package {
                  title
                }
                advertisingSide {
                  code
                  title
                  side {
                    title
                    code
                    format {
                      code
                      title
                    }
                  }
                }
                construction {
                  numInDistrict
                  statusConnection
                  location {
                    marketingAddress {
                      address
                    }
                    postcode {
                      title
                      district {
                        city {
                          title
                        }
                      }
                    }
                  }
                }
              }
              reservationType {
                title
                id
              }
            }
          }
        }
      }
    }
  }
}
  `;


const Project_card = () => {

// const queries = [PROJECT_QUERY, APPS_QUERY]

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
          value: (dataItem.client && dataItem.client.partnerType == 'Рекламодатель' && dataItem.title) || '-'
        },
        {
          title: 'Рекламное агентство:',
          value: (dataItem.client && dataItem.client.partnerType == 'Рекламное агентство' && dataItem.title) || ''
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
    let dateCreate = new Date(item.node.createdAt)
    return({
      id: item.node.id,
      code: '#' + item.node.code,
      summa: '', // item.node.additionalCosts.edges[0].node.summa, TODO:
      createDate: dateCreate.getFullYear() + '-' + (dateCreate.getMonth() + 1) + '-' + dateCreate.getDate() ,
      reservDates: dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + dateFrom.getDate() + ' - ' + dateTo.getFullYear() + '-' + (dateTo.getMonth() + 1) + '-' + dateTo.getDate(),
      dateForRouter: [item.node.dateFrom, item.node.dateTo]
    })
  }) : null;

  let panelDataAttachments = (dataItem && dataItem.projectAttachments && dataItem.projectAttachments.edges.map(item => ({
      id: item.node.id,
      attachment_code: '#' + item.node.code,
      attachment_summa: '', // item.node.additionalCosts.edges[0].node.summa, TODO:
      attachment_createDate: dateFormat(item.node.createdDate, 'dd-mm-yyyy'),
      attachment_reservDates: `${dateFormat(item.node.periodStartDate, 'dd-mm-yyyy')}-${dateFormat(item.node.periodEndDate, 'dd-mm-yyyy')}`,
      dateForRouter: [item.node.dateFrom, item.node.dateTo]
  }))) || [];
  let panelReservations = (dataItem && dataItem.reservations && dataItem.reservations.edges.map(item => ({
    id: item.node.id,
    key: item.node.id,
    reservation_code: getConstructionSideCode(item.node.constructionSide),
    reservation_city: item.node.constructionSide.construction.location.postcode.district.city.title,
    reservation_address: (
      item.node.constructionSide.construction.location.marketingAddress &&
      item.node.constructionSide.construction.location.marketingAddress.address) || '',
    reservation_format: item.node.constructionSide.advertisingSide.side.format.title,
    reservation_side: item.node.constructionSide.advertisingSide.title,
    reservation_startDate: dateFormat(item.node.dateFrom, 'dd-mm-yyyy'),
    reservation_expirationDate: dateFormat(item.node.dateTo, 'dd-mm-yyyy'),
    reservation_status: item.node.reservationType.title,
    reservation_lighting: (item.node.constructionSide.statusConnection && 'Да') || 'Нет',
    reservation_package: (item.node.constructionSide.package && item.node.constructionSide.package.title) || '',

  }))) || [];

  panelData = {
    attachments: panelDataAttachments,
    reservations: panelReservations,
  }
  console.log(panelData.reservations);

  // console.log('[DATA]', panelData)
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
                    history.push(`/sales/project_card/${id}/estimate`);
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
              loading={loading}
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
