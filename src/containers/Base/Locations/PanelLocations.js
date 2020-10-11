import React, { useState, useEffect, useContext } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

import { locationsContext } from './Locations';
import Table from '../../../components/Tablea';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

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
    {
      width: 40,
      title: '',
      render: (text, record) => (
        <Link to={{ pathname: `/base/locations/location/${record.key}` }}>
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
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
      contractNumber:"",
    },
  ];

  const { loading, error, data } = useQuery(LOCATIONS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {
    data1 = data.searchLocation.edges.map((item) => ({
      key: item.node.id,
      code: '#1020050301323',
      city: item.node.city ? item.node.city.title:'',
      post: item.node.poscode,
      district: item.node.district ? item.node.district.title:"",
      adress_j: item.node.address,
      cadastralNumber: item.node.cadastralNumber,
      area: item.node.area,
      contractNumber:"",
    }));
  }
  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data1} />
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
