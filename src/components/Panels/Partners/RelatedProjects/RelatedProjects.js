import React, { useContext, useMemo, useState } from 'react';
//import Table from '../../../Table/Table';
import Table from '../../../Tablea/Tablea';

import { partnerContext } from "../../../../containers/Base/Partner/Partner";

const initData = [
  {
    key: 1,
    code: '2020053012',
    title: 'Летняя акция',
    brand: 'CocaCola',
    client: 'ТОО Coca Cola',
    agencyCommission: 'да',
  },
  {
    key: 2,
    code: '2020053012',
    title: 'Летняя акция',
    brand: 'CocaCola',
    client: 'ТОО Coca Cola',
    agencyCommission: 'да',
  },
  {
    key: 3,
    code: '2020053012',
    title: 'Летняя акция',
    brand: 'CocaCola',
    client: 'ТОО Coca Cola',
    agencyCommission: 'да',
  },
  {
    key: 4,
    code: '2020053012',
    title: 'Летняя акция',
    brand: 'CocaCola',
    client: 'ТОО Coca Cola',
    agencyCommission: 'да',
  }
]; //нужно убрать этот масив initData после того как проверим правильность данных с бека
const columns = [
  {
    title: 'Код',
    dataIndex: 'code',
    key: 'name',
    width: 100,
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'name',
    width: 100,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',
    key: 'name',
    width: 100,
  },
  {
    title: 'Клиент',
    dataIndex: 'client',
    key: 'name',
    width: 100,
  },
  {
    title: 'Агентская комиссия',
    dataIndex: 'agencyCommission',
    key: 'name',
    width: 100,
  },
];

const RelatedProjects = () => {
  const [item, setItem] = useContext(partnerContext);
  const [data, setData] = useState([]);

  useMemo(() => {
    if(item.projects.edges && item.projects.edges.length) {
      const projectList = item.projects.edges.node.map((item, index) => ({
        key: index,
        code: item.code,
        title: item.title,
        brand: item.brand,
        client: item.client,
        agencyCommission: item.agencyCommission,
      }));

      setData(projectList);
    }
  }, [item]);

  return <Table
    columns={columns}
    data={data}
    notheader={true}
  />;
};
export default RelatedProjects;
