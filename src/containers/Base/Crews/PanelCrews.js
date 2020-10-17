import React, { useState, useEffect, useContext } from 'react';
import { crewsContext } from './Crews';

import { useQuery, gql, useMutation } from '@apollo/client';

import Table from '../../../components/Tablea';

const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(crewsContext);
  const columns = [
    {
      title: 'Код конструкции',
      dataIndex: 'code',

      width: 130,
    },
    {
      title: 'Формат',
      dataIndex: 'format',

      width: 100,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
    },
    {
      title: 'Адрес',
      dataIndex: 'adress',
      width: 100,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 100,
    },
    {
      title: 'Дата начала ',
      dataIndex: 'date_start',
      width: 100,
    },
  ];

  var data1 = [
    {
      key: 1,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 2,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 3,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 4,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
    {
      key: 5,
      code: '126353',
      format: 'Сениор',
      city: 'Алматы',
      adress: 'Достык 25',
      status: 'Размещен',
      date_start: '19.06.2020',
    },
  ];

 

  const CREWS_T = gql`
    query SearchCrew(
      $name: String
      $phone: String
      $city: String
      $district: String
      $adress: String
    ) {
      searchCrew(
        name: $name
        phone:  $phone
        construction_City_Title:  $city
        construction_District_Title: $district
        construction_MarketingAddress:  $adress
       
      ) {
        edges {
          node {
            id
            phone
            name
          
            constructionSet {
              edges {
                node {
                  id
                  code
                  format
                  statusConnection
                  createdAt
                  city {
                    id
                    title
                  }
                  legalAddress
                  district {
                    id
                    title
                  }

                }
              }
            }
          }
        }
      }
    }
  `;
  
  const { loading, error, data } = useQuery(CREWS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {
    if(data.searchCrew.edges[0])
    {
      data1 = data.searchCrew.edges[0].node.constructionSet.edges.map((item) => ({
      key: item.node.id,
      code: item.node.code,
      format: item.node.format,
      city: item.node.city  ? item.node.city.title : '',
      adress: item.node.legalAddress,
      status: item.node.statusConnection,
      date_start: new Date(item.node.createdAt).toLocaleDateString('en-GB')
    }));
  }
  }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data1} title={`Назначеные_конструкции`} />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export default PanelDesign;
