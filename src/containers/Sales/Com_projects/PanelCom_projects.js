import React, { useState, useEffect, useContext } from 'react';
import { comProjectContext } from './Com_projects';

import Table from '../../../components/Tablea/Tablea';
import { useHistory, Link } from 'react-router-dom';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';
import citiesIcon from '../../../img/sales/cities.svg';

import { Popover } from 'antd';

import { useQuery, gql, useMutation } from '@apollo/client';

const PanelDesign = (props) => {
  const [filter, setFilter, constructionsIdSet, setConstructionsIdSet] = useContext(comProjectContext);
  const history = useHistory();

  let data2 = [];

  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
      sorter: {
        compare: (a, b) => {
          return a.code.split('#')[1] - b.code.split('#')[1];
        },
        multiple: 1,
      },
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',
      width: 80,
    },
    {
      title: 'Дата начала',
      dataIndex: 'date',
      width: 90,
    },
    {
      title: 'Рекламодатель',
      dataIndex: 'advert',
      width: 80,
    },
    {
      title: 'Рекламное агенство',
      dataIndex: 'advert_agency',
      width: 80,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'sector',
      width: 80,
    },
    {
      title: 'Менеджер бэк-офиса',
      dataIndex: 'managerb',
      width: 80,
    },
    {
      title: 'Менеджер по продажам',
      dataIndex: 'manager',
      width: 80,
    },
    {
      width: 40,
      title: '',
      render: (text, record) => (
        <Link to={{ pathname: `/sales/project_card/${record.key}` }}>
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
    },
  ];

  const temp = gql`
    query allProjectsQuery(
      $brand: String
      $code: String
      $workingSectors: String
      $salesManagerFirstName: String
      $salesManagerLastName: String
      $backOfficeManagerFirstName: String
      $backOfficeManagerLastName: String
      $adv: String
    ) {
      searchProject(
        brand_Title_Icontains: $brand
        code_Icontains: $code
        client_WorkingSectors_Description_Icontains: $workingSectors
        backOfficeManager_FirstName_Icontains: $backOfficeManagerFirstName
        backOfficeManager_LastName_Icontains: $backOfficeManagerLastName
        salesManager_FirstName_Icontains: $salesManagerFirstName
        salesManager_LastName_Icontains: $salesManagerLastName
        client_Title_Icontains: $adv
      ) {
        edges {
          node {
            reservations(first: 1) {
              edges {
                node {
                  constructionSide {
                    construction {
                      location {
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
            title
            id
            code
            comment
            startDate
            backOfficeManager {
              firstName
              lastName
            }
            salesManager {
              firstName
              lastName
            }
            client {
              title
              binNumber
              partnerType {
                title
              }
              workingSectors {
                edges {
                  node {
                    description
                  }
                }
              }
            }
            brand {
              title
            }
          }
        }
      }
    }
  `;
  const SEARCHLOG_QUERY = gql`
    query allProjectsQuery($brand: String, $code: String, $workingSector: String) {
      searchProject(
        brand_Title_Icontains: $brand
        code_Icontains: $code
        client_WorkingSectors_Title_Icontains: $workingSector
      ) {
        edges {
          node {
            title
            code
            comment
            startDate
            client {
              title
              binNumber
              partnerType {
                title
              }
            }
            brand {
              title
            }
          }
        }
      }
    }
  `;

  const CitiesList = () => {
    return (
      <>
        <p>Караганда</p>
        <p>Караганда</p>
        <p>Караганда</p>
        <p>Караганда</p>
      </>
    );
  };

  const { loading, error, data } = useQuery(temp, {
    variables: {
      brand: filter.brand,
      code: filter.code,
      workingSectors: filter.sector,
      backOfficeManagerFirstName: filter.backOfficeManager ? filter.backOfficeManager.split(' ')[0] : '',
      backOfficeManagerLastName: filter.backOfficeManager ? filter.backOfficeManager.split(' ')[1] : '',
      salesManagerFirstName: filter.sellManager ? filter.sellManager.split(' ')[0] : '',
      salesManagerLastName: filter.sellManager ? filter.sellManager.split(' ')[1] : '',
      adv: filter.advertiser ? filter.advertiser : filter.advAgency ? filter.advAgency : '',
    },
  });

  if (error) {
    console.log(error);
  }
  if (loading) {
    // console.log('loading');
  }

  if (data && !filter.date) {
    data2 = data.searchProject.edges.map((project) => {
      return {
        key: project.node.id,
        code: `#${project.node.code}`,
        brand: project.node.brand.title,
        date: project.node.startDate.split('T')[0],
        advert: project.node.client.partnerType
          ? !project.node.client.partnerType.title.startsWith('Рекламное агентство') && project.node.client.title
          : '',
        advert_agency: project.node.client.partnerType
          ? project.node.client.partnerType.title.startsWith('Рекламное агентство') && project.node.client.title
          : '',
        city: project.node.reservations.edges.length ? (
          <Popover placement="bottom" content={CitiesList}>
            <div
              style={{
                cursor: 'pointer',
              }}>
              <img
                src={citiesIcon}
                style={{
                  marginLeft: '5px',
                  marginRight: '5px',
                  marginBottom: '2px',
                }}
                alt="cities"
              />
              {
                project.node.reservations.edges[0].node.constructionSide.construction.location.postcode.district.city
                  .title
              }
            </div>
          </Popover>
        ) : (
          ''
        ),
        sector: project.node.client.workingSectors.edges.length
          ? project.node.client.workingSectors.edges[0].node.description
          : '',
        managerb: project.node.backOfficeManager.firstName + ' ' + project.node.backOfficeManager.lastName,
        manager: project.node.salesManager.firstName + ' ' + project.node.salesManager.lastName,
      };
    });
  }

  if (filter.date && data) {
    const startDate = filter.date[0]._d;
    const endDate = filter.date[1]._d;
    data2 = data.searchProject.edges
      .filter((project) => {
        const projectDate = new Date(project.node.startDate.split('T')[0]);
        return projectDate >= startDate && projectDate <= endDate;
      })
      .map((project) => {
        return {
          key: project.node.id,
          code: `#${project.node.code}`,
          brand: project.node.brand.title,
          date: project.node.startDate.split('T')[0],
          advert: project.node.client.partnerType
            ? !project.node.client.partnerType.title.startsWith('Рекламное агентство') && project.node.client.title
            : '',
          advert_agency: project.node.client.partnerType
            ? project.node.client.partnerType.title.startsWith('Рекламное агентство') && project.node.client.title
            : '',
          city: project.node.reservations.edges.length
            ? project.node.reservations.edges[0].node.constructionSide.construction.location.postcode.district.city
                .title
            : '',
          sector: project.node.client.workingSectors.edges.length
            ? project.node.client.workingSectors.edges[0].node.description
            : '',
          managerb: project.node.backOfficeManager.firstName + ' ' + project.node.backOfficeManager.lastName,
          manager: project.node.salesManager.firstName + ' ' + project.node.salesManager.lastName,
        };
      });
  }
  // const example = {
  //   key: 1,
  //   code: '#1020050301323',
  //   brand: 'CocaCola',
  //   date: '28.05.2020',
  //   advert: 'ТОО «Рекламодатель»',
  //   advert_agency: 'ТОО «Агенство»',
  //   city: 'Алматы',
  //   sector: 'Безалкогольные напитки',
  //   managerb: 'Иванов Иван Иванович',
  //   manager: 'Иванов Иван Иванович',
  // };

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          columnsForPopup={columns}
          // data={data1}
          data={data2}
          history={useHistory()}
          select={true}
          loading={loading}
          constructionsIdSet={constructionsIdSet}
          setConstructionsIdSet={setConstructionsIdSet}
          link="/sales/project_card"
          loading={loading}
          onRow={(record) => {
            return {
              onClick: () => {
                history.push(`/sales/project_card/${record.key}`);
                history.go(0);
              },
            };
          }}
        />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </>
  );
};

export default PanelDesign;
