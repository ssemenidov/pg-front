import React, { useState, useEffect, useContext } from 'react';
import { outContext } from './OutdoorFurniture';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const PanelDesign = ({ flagAddConstructionToLocation, constructionsIdSet, setConstructionsIdSet }) => {
  const [filter, setFilter] = useContext(outContext);
  const history = useHistory();

  const columns = [
    {
      title: 'код конструкции',
      dataIndex: 'code',
      width: 130,
      sorter: {
        compare: (a, b) => a.date_start.localeCompare(b.date_start),
        multiple: 1,
      }, 
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 80,
     sorter: {
            compare: (a, b) => a.city.localeCompare(b.city),
            multiple: 1,
          }, 
    },
    {
      title: 'Почтовый индекс',
      dataIndex: 'post',
      width: 80,
     sorter: {
            compare: (a, b) => a.post.localeCompare(b.post),
            multiple: 1,
          }, 
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
        <Link to={{ pathname: `/base/construction/${record.key}` }}>
          <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
        </Link>
      ),
    },
  ];
  let data1 = [];

  const OUTDOOR_T = gql`
  query SearchConstruction(
    $city: String
    $district: String
    $adress_m: String
    $adress_j: String
    $InventNumber: String
    $actual: Boolean
    $coords: String
  ) {
    searchConstruction(
      
      location_Postcode_District_City_Title: $city
      location_Postcode_District_Title: $district
      location_MarketingAddress_Address: $adress_m
      location_LegalAddress_Address:$adress_j
      buhInventNumber: $InventNumber
      active: $actual
      location_Coordinate: $coords

    ) {
      edges {
        node {
          id
          buhInventNumber
          
          # city {
          #   id
          #   title
          # }
          # district{
          #   id
          #   title
          # }
          # postcode{
          #   id
          #   title
          # }
          # marketingAddress
          # legalAddress
          # legalAddress
          # coordinates
          # actual
          # familyConstruction {
          #   id,
          #   title,
          #   underFamilyConstruction {
          #     edges {
          #       node {
          #         modelConstruction {
          #           edges {
          #             node {
          #               title,
          #               format {
          #                 edges {
          #                   node {
          #                     title
          #                   }
          #                 }
          #               }
          #             }
          #           }
          #         }
          #       }
          #     }
          #   }
          # }
        }
      }
    }
  }
  `;

  const { loading, error, data } = useQuery(OUTDOOR_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {
    data1 = data.searchConstruction.edges.map((item) => ({
      key: item.node.id,
      code: '#1020050301323',
      city: item.node.city ? item.node.city.title : '',
      post: item.node.postcode ? item.node.postcode.title : '',
      adress_m: item.node.marketingAddress,
      adress_j: item.node.legalAddress,
      format: item.node.format,
      coords: item.node.coordinates,
      fire: item.node.actual ? 'Да' : 'Нет',
    }));
  }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns} data={data1}
          enableChoosePeriod={false}
          enableChooseQuantityColumn={false}
          select={flagAddConstructionToLocation}
          constructionsIdSet={constructionsIdSet}
          setConstructionsIdSet={setConstructionsIdSet}
          onRow={(record) => {
            return {
              onClick: () => {
                history.push(`/base/construction/${record.key}`);
                history.go(0);
              }
            };
          }}
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
