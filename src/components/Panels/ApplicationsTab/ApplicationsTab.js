import React, { useState, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import ApplicationSearch from './ApplicationSearch';
import Table from '../../../components/Tablea';
export const applicationsContext = createContext();
const ApplicationsTab = () => {
  const [filter, setFilter] = useState({});
  
  const APPLICATION_T = gql`
  {
    searchAttachment(
     id:""
    ) {
      edges {
        node {
          id
         
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

  const data1 = [
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

//   if (data) {
// console.log(data);
//     data1 = data. searchAttachment.edges.map((item) => ({

    
    
//     }));
//   }

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <applicationsContext.Provider value={[filter,setFilter]}>
        <ApplicationSearch />
        </applicationsContext.Provider>
      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
          <Table columns={columns} data={data1} notheader={true} />
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTab;
