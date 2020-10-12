import React, { useState, useEffect, useContext } from 'react';
import { comProjectContext } from './Com_projects';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';

import { useQuery, gql, useMutation } from '@apollo/client';

const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(comProjectContext);
  const columns = [
    {
      title: 'Код',
      dataIndex: 'code',
      width: 130,
      sorter: {
        compare: (a, b) => a.code.length - b.code.length,
        multiple: 1,
      },
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
    {
      key: 2,
      code: '#20200503323',
      brand: 'CocaCola',
      date: '28.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 3,
      code: '#40201323',
      brand: 'CocaCola',
      date: '27.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 4,
      code: '#20264354323',
      brand: 'CocaCola',
      date: '26.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 5,
      code: '#2020050301325463',
      brand: 'CocaCola',
      date: '5.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
    {
      key: 6,
      code: '#2020050301323',
      brand: 'CocaCola',
      date: '1.05.2020',
      advert: 'ТОО «Рекламодатель»',
      advert_agency: 'ТОО «Агенство»',
      city: 'Алматы',
      sector: 'Безалкогольные напитки',
      managerb: 'Иванов Иван Иванович',
      manager: 'Иванов Иван Иванович',
    },
  ];

 
  
  const COMPROJECT_T = gql`
    query SearchComProject(
      $date: String
      $brand: String
      $advertiser: String
      $advAgency: String
      $sector: String
      $backOfficeManager: String
      $sellManager: String
    ) {
      searchComProject(
        brand: $brand
        date: $date
        advert: $advertiser
        advert_agency: $advAgency
        sector: $sector
        managerb: $backOfficeManager
        manager: $sellManager
      ) {
        edges {
          node {
            id
            code
            date
            brand
            advert
            advert_agency
            backCity {
              title
            }
            sector
            managerb
            manager
          }
        }
      }
    }
  `;

  // const { loading, error, data } = useQuery(COMPROJECT_T, { variables: filter });
  // if (error) return <p>Error :(</p>;
  // if (loading) return <h3></h3>;
  // if (data) {
  //   data1 = data.searchComProject.edges.map((item) => ({
  //     key: item.node.id,
  //     code: item.node.code,
  //     brand: item.node.brand,
  //     date: item.node.date,
  //     advert: item.node.advert,
  //     advert_agency: item.node.advert_agency,
  //     city: item.node.backCity ? item.node.backCity.title : '',
  //     sector: item.node.sector,
  //     managerb: item.node.managerb,
  //     manager: item.node.manager,

  //   }))
  // }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columns={columns}
          data={data1}
          history={useHistory()}
          link="/sales/project_card"
        />
      </div>
      <style>
        {`.outdoor-table-bar {
            width: 100%;
          }
          .design-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            // height: 100%;
            // padding: 1.5%;
            // flex: 0 1 30vw;
            // margin: 0 2vw 0 0;
          }`}
      </style>
    </>
  );
};

export default PanelDesign;
