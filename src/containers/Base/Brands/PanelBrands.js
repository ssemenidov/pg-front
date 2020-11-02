import React, { useState, useContext } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';
import { useQuery, gql } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

import Table from '../../../components/Tablea';

import { brandsContext } from './Brands';
import { stubDataBrands } from './stubDataSource';

const BRANDS_T = gql`
   query SearchLocation(
     $city:String
     $district:String
     $post:String
     $cadastralNumber:String
     $targetPurpose:String
     $resolutionNumber:String
     $rentContractStart:DateTime
     $rentContractEnd:DateTime
     $area:String
     $comment:String

     )
     {
    searchLocation(
      city_Title:$city
      district_Title: $district
      postcode: $post
      cadastralNumber: $cadastralNumber
      targetPurpose: $targetPurpose
      resolutionNumber: $resolutionNumber
      rentContractStart:$rentContractStart
      rentContractEnd:$rentContractEnd
      area:$area
      comment: $comment
    ) {
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
          construction {
            edges {
              node {
                id
              }
            }
          }
          rentContractNumber
        }
      }
    }
  }
`;

const initColumnsForPopup = [
  {
    title: 'Бренд',
    dataIndex: 'brand',
    className: 'show',
    isShowed: true
  },
  {
    title: 'Контрагент',
    dataIndex: 'partner',
    className: 'show',
    isShowed: true
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true
  },
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/partner/brand/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];
const initColumnsTable = [
  {
    title: 'Бренд',
    dataIndex: 'brand',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true
  },
  {
    title: 'Контрагент',
    dataIndex: 'partner',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',
    className: 'show',
    sorter: (a, b) => a.age - b.age,
    isShowed: true
  },
  {
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/partner/brand/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];
const initData = [
  {
    key: 'TG9jYXRpb25Ob2RlOjI2',
    brand: 'CocaCola',
    partner: 'ИП Агенство',
    workingSector: 'Безалкогольные напитки'
  },
];

const PanelDesign = (props) => {
  const history = useHistory();
  const [filter, setFilter] = useContext(brandsContext);
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);
  const [brands, setBrands] = useState(initData);

  // const { loading, error, data } = useQuery(BRANDS_T, { variables: filter });
  // if (error) return <p>Error :(</p>;
  // if (loading) return <h3></h3>;
  // if (data) {
  //   setBrands(data.searchLocation.edges.map((item) => (stubDataBrands(item))))
  // }

  const changeColumns = (dataIndex) => {
    let localColumnsForPopup = columnsForPopup.map((col, index) => {
      if(col.dataIndex  && col.dataIndex === dataIndex) {
        col.isShowed = !col.isShowed;

        return col
      }
      return col
    })

    setColumnsForPopup(localColumnsForPopup);

    const newColumnTables = localColumnsForPopup.filter(item => {
      if(item.isShowed) {
        return item
      }
      if(item.dataIndex === 'btn-remove') {
        return item
      }
    });

    setColumnsTable(newColumnTables);
  };

  return (
    <>
      <div className="outdoor-table-bar">
        <Table
          style={{ width: '100%' }}
          columnsForPopup={columnsForPopup}
          columns={columnsTable}
          data={brands}
          enableChoosePeriod={false}
          changeColumns={changeColumns}
          // onRow={(record) => {
          //   return {
          //     onClick: () => {
          //       history.push(`/base/partner/brand/${record.key}`);
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
