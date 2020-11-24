import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { Input } from 'antd';
import PanelDesign from './PanelApplication';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import { ReservationSlider } from './BottomSlider'
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';

// ICONS
import dollarIcon from '../../../img/dollar.svg';
import collapseIcon from '../../../img/collapse-icon.svg';
import personIcon from '../../../img/person.svg';
import paperIcon from '../../../img/paper.svg';

const Application = () => {
  const history = useHistory();
  const { appId } = useParams();
  const sliderState = new SliderState({name: "", key: ""})

  const APPLICATION_QUERY = gql`
    query applicationQuery($id: ID) {
      searchAttachment(id: $id) {
        edges {
          node {
            id
            code
            signatoryOne
            signatoryTwo
            createdDate
            periodStartDate
            periodEndDate
            contract {
              code
              registrationDate
              paymentDate
            }
            reservations {
              edges {
                node {
                  id
                  dateFrom
                  dateTo
                  constructionSide {
                    construction {
                      format {
                        title
                      }
                      location {
                        marketingAddress {
                          address
                        }
                        postcode {
                          district {
                            city {
                              title
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
      }
    }
  `;

  const { loading, error, data } = useQuery(APPLICATION_QUERY, {
    variables: {
      id: appId,
    },
  });

  let data2 = {};

  console.log('[data]', data)

  const sliderCountData = {
    "info": [
      {
        "title": "Номер договора",
        "data": "№3453456"
      },
      {
        "title": "Номер приложения",
        "data": "№3453456"
      },
      {
        "title": "Реквизиты",
        "data": "БИН: 435438345, БИК: 8734е53458324"
      },
      {
        "title": "Дата договора",
        "data": "20.04.2020"
      }
    ],
    "count": [
      {
        "title": "Налог",
        "data": 173953
      },
      {
        "title": "Аренда со скидкой",
        "data": 965455
      },
      {
        "title": "Доп. расходы",
        "data": 23345
      },
      {
        "title": "Монтаж",
        "data": 39472
      },
      {
        "title": "Печать",
        "data": 74063
      }
    ]
  }

  if (data) {
    data2 = {
      code: data.searchAttachment.edges[0].node.code,
      createdDate: new Date(data.searchAttachment.edges[0].node.createdDate).toLocaleDateString(),
      startedDate: new Date(data.searchAttachment.edges[0].node.periodStartDate).toLocaleDateString(),
      endDate: new Date(data.searchAttachment.edges[0].node.periodEndDate).toLocaleDateString(),
      contractCode: data.searchAttachment.edges[0].node.contract.code,
      contractDate: new Date(data.searchAttachment.edges[0].node.contract.registrationDate).toLocaleDateString(),
      contractPaymentDate: new Date(data.searchAttachment.edges[0].node.contract.paymentDate).toLocaleDateString(),
      signatoryOne: data.searchAttachment.edges[0].node.signatoryOne,
      tableData: data.searchAttachment.edges[0].node.reservations.edges.map((invoice) => {
        return {
          key: invoice.node.id,
          format: invoice.node.constructionSide.construction.format.title,
          city: invoice.node.constructionSide.construction.location.postcode.district.city.title,
          period:
            new Date(invoice.node.dateFrom).toLocaleDateString() +
            ' - ' +
            new Date(invoice.node.dateTo).toLocaleDateString(),
          address: invoice.node.constructionSide.construction.location.marketingAddress.address,
          renta: '99 888 тг.',
          print: '99 888 тг.',
          install: '99 888 тг.',
          addexpense: '99 888 тг.',
          amount: '99 888 тг.',
        };
        // {
        //   key: 1,
        //   format: 'Сениор',
        //   city: 'Алматы',
        //   period: '29.03.20 - 30.05.20',
        //   address: 'Достык, 25',
        //   renta: '99 888 тг.',
        //   print: '99 888 тг.',
        //   install: '99 888 тг.',
        //   addexpense: '99 888 тг.',
        //   amount: '99 888 тг.',
        // },
      }),
    };
  }

  if (loading) {
    console.log('loading...');
  }

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/application', value: 'Приложение' },
  ];

  return (
    !loading && (
      <div style={{ display: 'flex', height: '100%' }}>
        <LeftBar className="left-bar">
          <SearchBtn />
          <CreateBtn text="Создать новое" />
          <PackageBtn text="Изменить текущее" />
          {/* <EditBtn text="Изменить текущее" /> */}
          {/* <PaperBtn text="Сводка проекта" /> */}
          <BoxBtn text="Архив дизайнов" />
        </LeftBar>
        <div
          style={{
            overflow: 'hidden',
            width: '100%',
            margin: '0 2vw 0 0',
          }}>
          <BreadCrumbs links={links} />
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Приложение №{data2.code} - CocaCola</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton
                backgroundColor="#008556"
                onClick={() => { sliderState.setAddShowed(true); }}>
                Выставить счет
              </StyledButton>
              <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              <StyledButton
                backgroundColor="#2C5DE5"
                onClick={() => history.push(`/sales/application/${appId}/estimate`)}

              >Смета приложения</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex' }}>
            <InfoList>
              <InfoItem>
                <InfoTitle>
                  <img src={collapseIcon} alt="collapse icon" /> <span>Информация о приложении</span>
                </InfoTitle>
                <InfoLine>
                  <span>Дата создания:</span>
                  <InfoValue>{data2.createdDate}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Дата начала:</span>
                  <InfoValue>{data2.startedDate}</InfoValue>
                </InfoLine>

                <InfoLine>
                  <span>Дата окончания:</span>
                  <InfoValue>{data2.endDate}</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={paperIcon} alt="paper icon" />
                  <span>Информация о договоре</span>
                </InfoTitle>

                <InfoLine>
                  <span>Номер:</span>
                  <InfoValue>№{data2.contractCode}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Подписан:</span>
                  <InfoValue>{data2.contractDate}</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={personIcon} alt="person icon" />
                  <span>Информация о подписанте</span>
                </InfoTitle>

                <InfoLine>
                  <span>ФИО:</span>
                  <InfoValue>{data2.signatoryOne}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Должность:</span>
                  <InfoValue>Директор</InfoValue>
                </InfoLine>
              </InfoItem>
              <InfoItem>
                <InfoTitle>
                  <img src={dollarIcon} alt="dollar icon" />
                  <span>Оплата</span>
                </InfoTitle>

                <InfoLine>
                  <span>Срок оплаты:</span>
                  <InfoValue>{data2.contractPaymentDate}</InfoValue>
                </InfoLine>
                <InfoLine>
                  <span>Стоимость:</span>
                  <InfoValue>10 399.84 тг.</InfoValue>
                </InfoLine>
              </InfoItem>
            </InfoList>
            <PanelDesign style={{ flex: '0 1 auto' }} tableData={data2.tableData} />
          </div>
        </div>

        <style>
          {`
          .left-bar {
            margin: 0 2vw 0 0;
          }

        `}
        </style>
        { sliderState.addShowed && <ReservationSlider sliderState={sliderState} dataCount={sliderCountData} />}
      </div>
    )
  );
};

export default Application;
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
  display: flex;
  align-items: center;
  gap: 12px;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: flex;
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
