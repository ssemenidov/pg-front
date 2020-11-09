import React, { useState, useContext, useMemo } from 'react';
import {Link} from 'react-router-dom';
import {useHistory, useLocation} from 'react-router';
import { useQuery, gql } from '@apollo/client';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

import Table from '../../../components/Tablea';

import { brandsContext } from './Brands';
import { stubDataBrands } from './stubDataSource';

const BRANDS_T = gql`
  query searchBrand {
    searchBrand {
      edges {
        node {
          id
          title
          workingSector {
            id
            title
          }
          partner {
            edges {
              node {
                id
                title
              }
            }
          }
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
  const location = useLocation();
  const [filter, setFilter] = useContext(brandsContext);
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);
  const [brands, setBrands] = useState(initData);

  const { loading, error, data, refetch } = useQuery(BRANDS_T, { variables: filter });

  useMemo(() => {
    refetch()
  }, [location]);
  useMemo(() => {
    if (data && data.searchBrand && data.searchBrand.edges) {
      setBrands(data.searchBrand.edges.map((item) => (stubDataBrands(item))))
    }
  }, [data]);
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;

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
