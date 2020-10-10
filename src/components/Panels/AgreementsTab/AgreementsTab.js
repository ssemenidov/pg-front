import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import {  agreementsContext } from '../../../containers/Base/Documents/Agreements/InnerForm';
import AgreementsSearch from './AgreementsSearch';
import Table from '../../../components/Tablea';

const AgreementsTab = () => {
  const [filter, setFilter] = useContext(agreementsContext);
  const columns = [
    {
      title: 'Код договора',
      dataIndex: 'code',

      width: 130,
    },
    {
      title: 'Контрагент',
      dataIndex: 'agreement',

      width: 100,
    },
    {
      title: 'Проект',
      dataIndex: 'project',
      width: 100,
    },
    {
      title: 'Дата  заключения',
      dataIndex: 'date_start',
      width: 100,
    },
    {
      title: 'Дата окончания',
      dataIndex: 'date_end',
      width: 100,
    },
  ];

 
  const AGREEMENT_T = gql`
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
var data1 = [
  {
    key: 1,
    code: '#2020050301323',
    agreement: 'ИП Агенство',

    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 2,
    code: '#2020050301323',
    agreement: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 3,
    code: '#2020050301323',
    agreement: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 4,
    code: '#2020050301323',
    agreement: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 5,
    code: '#2020050301323',
    agreement: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 6,
    code: '#2020050301323',
    agreement: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
];
 
  

  const { loading, error, data } = useQuery(AGREEMENT_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  // if (data) {
  //   data1 = data.searchConstruction.edges.map((item) => ({
  //     key: item.node.id,
  //     code: item.node.buhInventNumber,
  //     city: item.node.backCity ? item.node.backCity.title : '',
  //     post: item.node.backPostcode,
  //     adress_m: item.node.backMarketingAddress,
  //     adress_j: item.node.backLegalAddress,
  //     format: item.node.format,
  //     coords: item.node.otherCoord,
  //     fire: item.node.actual ? 'Да' : 'Нет',
  //   }));
  // }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <AgreementsSearch />
      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <Table columns={columns} data={data1} notheader={true} />
        </div>
      </div>
    </div>
  );
};

export default AgreementsTab;
