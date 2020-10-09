import React, { useState, useEffect, useContext } from 'react';
import { locationsContext } from './Locations';

import Table from '../../../components/Tablea';

import { useQuery, gql, useMutation } from '@apollo/client';
const LOCATIONS_T = gql`
  {
    searchLocation(id: "") {
      edges {
        node {
          id
          city {
            title
          }
          district {
            title
          }
          postcode
          area
          address
          coordinate
          cadastralNumber
          targetPurpose
          comment
          constructionSet {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;
const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(locationsContext);
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
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
  ];
  var data1 = [
    {
      key: 1,
      code: '#1020050301323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
  ];

  const { loading, error, data } = useQuery(LOCATIONS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  // if (data) {
  //   data1 = data.searchLocation.edges.map((item) => ({
  //     key: item.node.id,
  //   }));
  // }
  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data1}
          history={props.history}
          link="/base/locations/location/"
        />
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
