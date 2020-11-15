import React, { useState, useEffect, useContext } from 'react';
import { outContext } from './OutdoorFurniture';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import Preloader from '../../../components/Preloader/Preloader';
import { column, null2str, null2strKey, null2bool } from '../../../components/Table/utils';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';



const PanelDesign = ({ flagAddConstructionToLocation, constructionsIdSet, setConstructionsIdSet }) => {
  const [filter, setFilter] = useContext(outContext);
  const history = useHistory();

  const columns = [
    column('Город', 'city', 80),
    column('Район', 'district', 80),
    column('Почтовый индекс', 'post', 80),
    column('Адрес маркетинговый', 'adress_m', 150),
    column('Адрес юридический', 'adress_m', 150),
    column('Формат', 'format', 150),
    column('Инвентарный номер (ОТО)', 'inv_oto', 150),
    column('Инвентарный номер (Бух)', 'inv_buh', 150),
    column('Номер телефона конструкции', 'phone', 150),
    column('Координаты', 'coords', 150),
    column('Горит', 'fire', 80),
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
  let populated_data = [];

  const OUTDOOR_T = gql`
     query searchConstruction(
       $city: String,
       $district: String,
       $adress_m: String,
       $adress_j: String,
       $InventNumber: String,
       $actual: Boolean,
       $coords: String) {
       searchConstruction(
         location_Postcode_District_City_Title: $city,
         location_Postcode_District_Title: $district,
         location_MarketingAddress_Address: $adress_m,
         location_LegalAddress_Address: $adress_j,
         buhInventNumber: $InventNumber,
         active: $actual,
         coordinates,: $coords) {
         edges {
           node {
             id
             coordinates
             backComment
             techInventNumber
             buhInventNumber
             techPhoneConstruction
             techProblem
             techProblemComment
             statusConnection
             obstruction
             active
             format {
               title
             }
             location {
               marketingAddress {
                 address
               }
               legalAddress {
                 address
               }
               postcode {
                 title
                 district {
                   title
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
  `;

  const { loading, error, data } = useQuery(OUTDOOR_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  // if (loading) return <Preloader size={'large'}/>;
  if (data) {
    populated_data = data.searchConstruction.edges.map((item) => ({
      key: item.node.id,
      city: item.node.location ? item.node.location.postcode.district.city.title  : '',
      post: item.node.location ? item.node.location.postcode.title : '',
      district: item.node.location ? item.node.location.postcode.district.title : '',
      adress_m: item.node.location ? null2strKey(item.node.location.marketingAddress, 'address') : '',
      adress_j: item.node.location ? null2strKey(item.node.location.legalAddress, 'address') : '',
      inv_oto: null2str(item.node.techInventNumber),
      inv_buh: null2str(item.node.buhInventNumber),
      phone: null2str(item.node.techPhoneConstruction),
      format: null2strKey(item.node.format, 'title'),
      coords: item.node.coordinates,
      fire: item.node.statusConnection ? 'Да' : 'Нет',
    }));
  }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns} data={populated_data}
          enableChoosePeriod={false}
          enableChooseQuantityColumn={false}
          select={flagAddConstructionToLocation}
          constructionsIdSet={constructionsIdSet}
          setConstructionsIdSet={setConstructionsIdSet}
          loading={loading}
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       history.push(`/base/construction/${record.key}`);
          //       history.go(0);
          //     }
          //   };
          // }}
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
