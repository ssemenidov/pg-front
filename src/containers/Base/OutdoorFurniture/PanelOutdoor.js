import React, { useState, useEffect, useContext } from 'react';
import { outContext } from './OutdoorFurniture';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(outContext);
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
      title: 'Адрес маркетинговый',
      dataIndex: 'adress_m',
      width: 150,
    },
    {
      title: 'Адрес юридический',
      dataIndex: 'adress_j',
      width: 150,
    },
    {
      title: 'Формат',
      dataIndex: 'format',
      width: 150,
    },
    {
      title: 'Координаты',
      dataIndex: 'coords',
      width: 150,
    },
    {
      title: 'Горит',
      dataIndex: 'fire',
      width: 80,
    },
    {
      width: 40,
      title: '',
      render: (text, record) => (
        <Link to="/base/construction">
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
    },
  ];
  const OUTDOOR_T = gql`
    query SearchConstruction($city: String) {
      searchConstruction(backCity_Title: $city) {
        edges {
          node {
            techInventNumber
            backCity {
              title
            }
            backPostcode
            backMarketingAddress
            backLegalAddress
            format
            otherCoord
            actual
          }
        }
      }
    }
  `;

  const city = filter.city ? filter.city : '';
  const { loading, error, data } = useQuery(OUTDOOR_T, { variables: filter });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const data1 = data.searchConstruction.edges.map((item, index) => ({
    key: index,
    code: item.node.techInventNumber,
    city: item.node.backCity !== undefined && item.node.backCity.title,
    post: item.node.backPostcode,
    adress_m: item.node.backMarketingAddress,
    adress_j: item.node.backLegalAddress,
    format: item.node.format,
    coords: item.node.otherCoord,
    fire: item.node.actual ? 'Да' : 'Нет',
  }));
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
