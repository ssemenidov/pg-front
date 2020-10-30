import React,{useContext, useState,createContext} from 'react';
import {  applicationsContext } from './ApplicationsTab';

import { useQuery, gql, useMutation } from '@apollo/client';

import Table from '../../../components/Tablea';
const ApplicationsPanel = () => {
    const [filter, setFilter] = useContext(applicationsContext);
    const APPLICATION_T = gql`
  {
    searchAttachment(
     id:""
    ) {
      edges {
        node {
          id
          contract {
            id
          }
          creator
          createdDate
          brand
          {
            id
            title
          }
          salesManager {
            id
          }
          returnStatus
          period
          additionallyAgreement
          createdAt
          updatedAt
         
        }
      }
    }
  }
`;
    const columns = [
        {
        title: 'Код приложения',
        dataIndex: 'code',

        width: 130,
        sorter: {
          compare: (a, b) => a.code.length - b.code.length,
          multiple: 1,
        },
        },
        {
        title: 'Контрагент',
        dataIndex: 'agreement',

        width: 100,
        sorter: {
          compare: (a, b) => a.agreement.length - b.agreement.length,
          multiple: 1,
        },
        },
        {
        title: 'Проект',
        dataIndex: 'project',
        width: 100,
        sorter: {
          compare: (a, b) => a.project.length - b.project.length,
          multiple: 1,
        },
        },
        {
        title: 'Дата  заключения',
        dataIndex: 'date_start',
        width: 100,
        sorter: {
          compare: (a, b) => a.date_start.length - b.date_start.length,
          multiple: 1,
        },
        },
        {
        title: 'Дата окончания',
        dataIndex: 'date_end',
        width: 100,
        sorter: {
          compare: (a, b) => a.date_end.length - b.date_end.length,
          multiple: 1,
        },
        },
    ];

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
    const { loading, error, data } = useQuery(APPLICATION_T, { variables: filter });
    if (error) return <p>Error :(</p>;
    if (loading) return <h3></h3>;

    if (data) {
    console.log(data);
    data1 = data. searchAttachment.edges.map((item) => ({
        key: item.node.id,
        code: '#2020050301323',
        agreement: 'ИП Агенство',
        project: 'CocaCola',
        date_start: '29.05.2021',
        date_end: '29.05.2021',
    
    
    }));
    }

    return (

            <Table columns={columns} data={data1} notheader={true} />
    );
};

export default  ApplicationsPanel;
