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

  // const data = [
  //   {
  //     key: 1,
  //     code: '126353',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //     adress: 'Достык 25',
  //     status: 'Размещен',
  //     date_start: '19.06.2020',
  //   },
  //   {
  //     key: 2,
  //     code: '126353',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //     adress: 'Достык 25',
  //     status: 'Размещен',
  //     date_start: '19.06.2020',
  //   },
  //   {
  //     key: 3,
  //     code: '126353',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //     adress: 'Достык 25',
  //     status: 'Размещен',
  //     date_start: '19.06.2020',
  //   },
  //   {
  //     key: 4,
  //     code: '126353',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //     adress: 'Достык 25',
  //     status: 'Размещен',
  //     date_start: '19.06.2020',
  //   },
  //   {
  //     key: 5,
  //     code: '126353',
  //     format: 'Сениор',
  //     city: 'Алматы',
  //     adress: 'Достык 25',
  //     status: 'Размещен',
  //     date_start: '19.06.2020',
  //   },
  // ];

  let data1 = [];

  const CREWS_T = gql`
    query SearchCrew(
      $city: String
      $district: String
      $address: String
      $phoneNumber: String
      $constructionType: String
      $constructionFormat: String
      $startDate: String
    ) {
      searchCrew(
        backCity_Title: $city
        backDistrict_Title: $district
        backMarketingAddress: $address
        format: $constructionFormat
      ) {
        edges {
          node {
            id
            backDistrict {
              title
            }
            backCity {
              title
            }
            backMarketingAddress
          }
        }
      }
    }
  `;
  
  const { loading, error, data } = useQuery(CREWS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {
    data1 = data.searchCrew.edges.map((item) => ({
      key: item.node.id,
      city: item.node.backCity ? item.node.backCity.title : '',
      district: item.node.backDistrict ? item.node.backDistrict.title : '',
      address: item.node.backMarketingAddress
    }));
  }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data} title={`Назначеные_конструкции`} />
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
