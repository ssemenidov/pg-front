import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { gql, useQuery } from '@apollo/client';
import moment from 'moment';

import Table from '../../../TableResizable/Table';

const LOCATION_ITEM_HISTORY = gql`
  query searchLogs($id: ID) {
    searchLogs(id: $id) {
    edges {
      node {
        id
        model
        changed
        recordId
        data
        user {
          id
          firstName
          lastName
        }
        actionOnModel
      }
    }
  }
  }
`;

const columns = [
  {
    id: 1,
    title: 'Код',
    dataIndex: 'code',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    width: 100,
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Ответственный',
    dataIndex: 'manager',
    width: 300,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Тип манипуляции',
    dataIndex: 'type',
    width: 250,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Информация до',
    dataIndex: 'before',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Информация после',
    dataIndex: 'after',
    width: 200,
    sorter: (a, b) => a.age - b.age,
  },
];
const initData = [
  {
    key: 1,
    code: '#123123123',
    date: '25.05.2020',
    manager: 'Тупак Шакур',
    type: 'Смена владельца',
    before: 'Пенелопа Круз',
    after: 'Пенелопа Круз',
  },
  {
    key: 2,
    code: '#123123123',
    date: '25.05.2020',
    manager: 'Тупак Шакур',
    type: 'Смена владельца',
    before: 'Пенелопа Круз',
    after: 'Пенелопа Круз',
  },
  {
    key: 3,
    code: '#123123123',
    date: '25.05.2020',
    manager: 'Тупак Шакур',
    type: 'Смена владельца',
    before: 'Пенелопа Круз',
    after: 'Пенелопа Круз',
  },
  {
    key: 4,
    code: '#123123123',
    date: '25.05.2020',
    manager: 'Тупак Шакур',
    type: 'Смена владельца',
    before: 'Пенелопа Круз',
    after: 'Пенелопа Круз',
  },
];

export const HistoryTable = (props) => {
  const { id } = useParams();
  const [historyData, setHistoryData] = useState(initData);
  const { error, data, loading } = useQuery(LOCATION_ITEM_HISTORY, { variables: { id: id } });

  useMemo(() => {
    if (data && data.searchLogs && data.searchLogs.edges) {

      let localData = data.searchLogs.edges.map(({ node }) => ({
        key: node.id && node.id,
        code: '#123123123',
        date: node.changed && moment(node.changed).subtract(10, 'days').calendar(),
        manager: node.user ? `${node.user.firstName} ${node.user.lastName}` : '',
        type: node.actionOnModel && node.actionOnModel,
        before: 'Пенелопа Круз',
        after: 'Пенелопа Круз',
      }));

      setHistoryData(localData);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <h3></h3>;

  return <Table
    columns={columns}
    data={historyData}
    loading={loading}
    footer={`Показано 10 из ${historyData.length}`}
  />;
};

export default HistoryTable;
