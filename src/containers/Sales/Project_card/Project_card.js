import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Input } from 'antd';
import styled from 'styled-components';
import dateFormat from 'dateformat';
import { gql, useQuery } from '@apollo/client';

import {Link} from "react-router-dom";
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
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { ReservationSlider } from './BottomSlider';

import { sidebarInfoData } from '../stubDataSource';

import collapseIcon from '../../../img/collapse-icon.svg';
import icon_pen from "../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg";


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
}`;


const Project_card = (props) => {

// const queries = [PROJECT_QUERY, APPS_QUERY]
  const sliderState = new SliderState({name: "", key: ""})

  const history = useHistory();
  const { id } = useParams();
  const [block, setBlock] = useState(0);
  const initColumnsTable = [
    {
      title: 'Номер приложения',
      dataIndex: 'code',
      width: 130,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Сумма',
      dataIndex: 'summa',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Дата создания',
      dataIndex: 'createDate',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Сроки',
      dataIndex: 'reservDates',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      dataIndex: 'btn-remove',
      width: 40,
      title: '',
      render: (text, record) => {
        console.log('[text]', text)
        return (
          <Link to={{ pathname: `/sales/summary/${record.id}`, state: { dateFrom: record.dateForRouter ? record.dateForRouter[0] : null , dateTo: record.dateForRouter ? record.dateForRouter[1] : null} }}>
            <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
          </Link>
        )
      }
    },
    {
      dataIndex: 'dateForRouter',
      width: 0,
      title: '',
      isShowed: true
    }
  ];

  const attachmentColumns = [
    {
      title: 'Номер приложения',
      dataIndex: 'code',
      width: 130,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Название',
      dataIndex: 'title',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 100,
      sorter: {
        compare: (a, b) =>a.code ? a.code.localeCompare(b.code):-1,
        multiple: 1,
      },
      isShowed: true
    }
  ]

  const columnTypes = [initColumnsTable, attachmentColumns];
  const [columnsForPopup, setColumnsForPopup] = useState(columnTypes[block]);
  const [columnsTable, setColumnsTable] = useState(columnTypes[block]);
  const [reserveCode, setReserveCode] = useState('1');
  // const [query, setQuery] = useState(PROJECT_QUERY)
  const { loading, error, data } = useQuery(PROJECT_QUERY, {
    variables: {
      id: id,
    },
  });

  

  // useEffect(() => {
    // alert(1)
    // setColumnsTable(columnTypes[block]);
  // }, block)

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

  let panelData = [];

  panelData[0] = dataItem ? dataItem.reservations.edges.map(item => {
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
            panelData !== null && (
              <PanelDesign
              style={{ flex: '0 1 auto' }}
              setBlock={setBlock}
              choosedBlock={block}
              data={panelData}
              loading={loading}
              setColumnsForPopup={setColumnsForPopup}
              setColumnsTable={setColumnsTable}
              sliderState={sliderState}
              // setReserveCode={props.history.location.state.reserveId}
            />
            )
          }
        </div>
      </div>
      {sliderState.addShowed && <ReservationSlider sliderState={sliderState}  data={panelData} reserveCode={props.history.location.state.reserveId} />}
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
