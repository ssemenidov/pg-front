import React, {useContext, useMemo, useState} from 'react';

import Table from '../../../Tablea';
import { partnerContext } from "../../../../containers/Base/Partner/Partner";

const columns = [
  {
    title: 'Код',
    dataIndex: 'code',
    key: 'name',
    width: 50,
  },
  {
    title: 'Рекламодатель',
    dataIndex: 'title',
    key: 'name',
    width: 100,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'workingSector',
    key: 'name',
    width: 100,
  },
  {
    title: 'Привязано',
    dataIndex: 'createdAt',
    key: 'name',
    width: 100,
  },
];
const initData = [
  {
    key: 1,
    code: '2020053012',
    title: 'TOO Рекламодатель',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 2,
    code: '2020053012',
    title: 'TOO Рекламодатель',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 3,
    code: '2020053012',
    title: 'TOO Рекламодатель',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 4,
    code: '2020053012',
    title: 'TOO Рекламодатель',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  },
  {
    key: 5,
    code: '2020053012',
    title: 'TOO Рекламодатель',
    workingSector: 'Производство напитков',
    createdAt: '29.05.2020',
  }
]; //нужно убрать этот масив initData после того как проверим правильность данных с бека

const RelatedAdvertisers = (props) => {
  const [item] = useContext(partnerContext);
  const [data, setData] = useState([]);

  useMemo(() => {
    if(item.advertisers.edges && item.advertisers.edges.length) {
      const advertisersList = item.advertisers.edges.node.map((item, index) => ({
        key: index,
        code: item.code,
        title: item.title,
        workingSector: item.workingSector ? item.workingSector.title : '',
        createdAt: item.createdAt,
      }));

      setData(advertisersList);
    }
  }, [item]);

  return (
    <>
      <Table columns={columns} data={data} select={true} notheader={true} />
    </>
  );
};

export default RelatedAdvertisers;
