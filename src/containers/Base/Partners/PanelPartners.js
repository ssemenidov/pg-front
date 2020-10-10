import React, { useState, useEffect, useContext } from 'react';
import { partnersContext } from './Partners';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(partnersContext);
  const columns = [
    {
      title: 'Тип контрагента ',
      dataIndex: 'type',
      width: 100,
    },
    {
      title: 'Контрагент',
      dataIndex: 'agent',

      width: 100,
    },
    {
      title: 'Бренд',
      dataIndex: 'brand',

      width: 100,
    },
    {
      title: 'Сектор деятельности',
      dataIndex: 'sector',

      width: 150,
    },
    {
      title: 'Тип клиента',
      dataIndex: 'client',

      width: 100,
    },

    {
      width: 50,
      fixed: 'right',
      render: (text, record) => (
        <Link to="/base/partners/info">
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
    },
  ];

  var data1 = [
    {
      key: 1,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 2,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 3,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 4,
      type: 'Рекламодатель',
      agent: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
  ];

  const OUTDOOR_T = gql`
    query SearchConstruction(
      $city: String
      $district: String
      $post: String
      $adress_m: String
      $InventNumber: String
      $format: String
      $actual: Boolean
      $coords: String
    ) {
      searchConstruction(
        backCity_Title: $city
        backDistrict_Title: $district
        backPostcode: $post
        backMarketingAddress: $adress_m
        buhInventNumber: $InventNumber
        format: $format
        actual: $actual
        otherCoord: $coords
      ) {
        edges {
          node {
            id
            buhInventNumber
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

  //   const { loading, error, data } = useQuery(OUTDOOR_T, { variables: filter });
  //   if (error) return <p>Error :(</p>;
  //   if (loading) return <h3></h3>;
  //   if (data) {
  //     data1 = data.searchConstruction.edges.map((item) => ({
  //       key: item.node.id,
  //       code: item.node.buhInventNumber,
  //       city: item.node.backCity ? item.node.backCity.title : '',
  //       post: item.node.backPostcode,
  //       adress_m: item.node.backMarketingAddress,
  //       adress_j: item.node.backLegalAddress,
  //       format: item.node.format,
  //       coords: item.node.otherCoord,
  //       fire: item.node.actual ? 'Да' : 'Нет',
  //     }));
  //   }

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
