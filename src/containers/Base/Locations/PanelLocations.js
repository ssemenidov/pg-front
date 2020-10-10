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
      title: 'Город',
      dataIndex: 'city',
      width: 80,
    },
    {
      title: 'Почтовый индекс',
      dataIndex: 'post',
      width: 80,
    },
    {
      title: 'Район',
      dataIndex: 'district',
      width: 80,
    },
    {
      title: 'Адрес юридический',
      dataIndex: 'adress_j',
      width: 150,
    },
    {
      title: 'Кадастровый номер',
      dataIndex: 'cadastralNumber',
      width: 150,
    },
    {
      title: 'Площадь',
      dataIndex: 'area',
      width: 100,
    },
    {
      title: 'Номер договора',
      dataIndex: 'contractNumber',
      width: 150,
    },
  ];
  var data1 = [
    {
      key: 1,
      code: '#1020050301323',
      city: 'Алматы',
      post: '010001',
      district: 'Медеуский р-н.',
      adress_j: 'Абая - ост. ГорВодоКанал',
      cadastralNumber: '34756824',
      area: '32 га',
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
