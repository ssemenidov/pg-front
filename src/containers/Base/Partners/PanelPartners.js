import React, { useState, useEffect, useContext } from 'react';
import { partnersContext } from './Partners';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { column } from '../../../components/Table/utils';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const initColumnsForPopup = [
  column('Тип контрагента', 'type', 100, true),
  column('Контрагент', 'partner', 100, true),
  column('Бренд', 'brand', 100, true),
  column('Сектор деятельности', 'sector', 150, true),
  column('Тип клиента', 'client', 100, true),
  {
    width: 50,
    dataIndex: 'btn-remove',
    fixed: 'right',
    render: (text, record) => (
      <Link to={`/base/partners/partner/${record.key}`}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  }
];
const initColumnsTable = [
  column('Тип контрагента', 'type', 100, true),
  column('Контрагент', 'partner', 100, true),
  column('Бренд', 'brand', 100, true),
  column('Сектор деятельности', 'sector', 150, true),
  column('Тип клиента', 'client', 100, true),
  {
    width: 50,
    dataIndex: 'btn-remove',
    fixed: 'right',
    render: (text, record) => (
      <Link to={`/base/partners/partner/${record.key}`}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  }
];

const PanelDesign = ({ flagAddAdvertiserForPartner, advertiserIdSet, setAdvertiserIdSet }) => {
  const [filter, setFilter] = useContext(partnersContext);

  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

  var data1 = [];
//    $type: String
// advertisers_Title:$type
  const PARTNERS_T = gql`
  query SearchPartner(
    $partner: String
    $brand: String
    $sector: String
    $binNumber: String
  ) {
      searchPartner(
        title:$partner
        brands_Title:$brand
        workingSectors_Title:$sector
        binNumber:$binNumber
      ) {
        edges {
          node {
            id
            partnerType {
              title
              id
            }
            title
            brands {
              edges {
                node {
                  title
                }
              }
            }
            workingSectors {
              edges {
                node {
                  id
                  title
                }
              }
            }
            clientType {
              title
              id
            }
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(PARTNERS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  console.log(data);

  if (data) {
    data1 = data.searchPartner.edges.map((item) => ({
      key: item.node.id,
      type: item.node.partnerType ? item.node.partnerType.title : '',
      partner: item.node.title,
      brand: item.node.brands && item.node.brands.edges && item.node.brands.edges[0] && item.node.brands.edges[0].node && item.node.brands.edges[0].node.title,
      sector: item.node.workingSector && item.node.workingSector.edges && item.node.workingSector.edges[0] && item.node.workingSector.edges[0].node && item.node.workingSector.edges[0].node.title,
      client: item.node.clientType ? item.node.clientType.title : '',
    }));
  }

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
          data={data1}
          changeColumns={changeColumns}
          enableChoosePeriod={false}
          loading={loading}

          select={flagAddAdvertiserForPartner}
          constructionsIdSet={advertiserIdSet}
          setConstructionsIdSet={setAdvertiserIdSet}
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
