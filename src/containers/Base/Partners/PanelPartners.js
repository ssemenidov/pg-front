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
      dataIndex: 'partner',

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
      partner: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 2,
      type: 'Рекламодатель',
      partner: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 3,
      type: 'Рекламодатель',
      partner: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
    {
      key: 4,
      type: 'Рекламодатель',
      partner: 'ИП Агенство',
      brand: 'CocaCola',
      sector: 'Безалкогольные напитки',
      client: 'По личным связям',
    },
  ];

  const PARTNERS_T = gql`
    {
      searchPartner(id: "") {
        edges {
          node {
            id
            partnerType {
              title
            }
            title
            brands {
              edges {
                node {
                  title
                }
              }
            }
            workingSector {
              title
            }
            clientType {
              title
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(PARTNERS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  console.log(data);
  if (data) {
    data1 = data.searchPartner.edges.map((item) => ({
      key: item.node.id,
      type: item.node.partnerType ? item.node.partnerType.title : '',
      partner: item.node.title,
      brand: 'CocaCola',
      sector: item.node.workingSector ? item.node.workingSector.title : '',
      client: item.node.clientType ? item.node.clientType.title : '',
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
