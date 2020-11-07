import React,{useContext, useState,createContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import Table from '../../../components/Tablea';
import {  agreementsContext } from './AgreementsTab';

import icon_pen_blue from '../../../img/outdoor_furniture/table_icons/blue_pen.svg';

const AgreementsPanel = () => {
    const [filter, setFilter] = useContext(agreementsContext);
    const columns = [
            {
            title: 'Код договора',
            dataIndex: 'code',
            width: 130,
            sorter: {
            compare: (a, b) => a.code.localeCompare(b.code),
            multiple: 1,
          },  
          },
            {
            title: 'Контрагент',
            dataIndex: 'partner',

            width: 100,
            sorter: {
            compare: (a, b) => a.partner.localeCompare(b.partner),
            multiple: 1,
          },  
          },
            {
            title: 'Проект',
            dataIndex: 'project',
            width: 100,
            sorter: {
              compare: (a, b) => a.project.localeCompare(b.project),
              multiple: 1,
            },  
          },
            {
            title: 'Дата  заключения',
            dataIndex: 'date_start',
            width: 100,
            sorter: {
              compare: (a, b) => a.date_start.localeCompare(b.date_start),
              multiple: 1,
            },  
          },
            {
            title: 'Дата окончания',
            dataIndex: 'date_end',
            width: 100,
            sorter: {
              compare: (a, b) => a.date_end.localeCompare(b.date_end),
              multiple: 1,
            },  
          },
            {
              width: 40,
              title: '',
              render: (text, record) => (
                <Link to={{ pathname: `/base/documents/agreement/${record.key}` }}>
                  <img style={{ cursor: 'pointer' }} src={icon_pen_blue} alt="" />
                </Link>
              ),
             
            },
        ];
    const AGREEMENT_T = gql`
  query SearchContract(
    $initiator: String
    $creator: String
    $partner_Title: String
    $contractType: String
    $start: DateTime
    $registrationDate: DateTime
    $end: DateTime
    $returnStatus: Boolean


    )
    {
    searchContract(
      initiator_Name:$initiator
      creator_Name:$creator
      partner_Title:$partner_Title
      contractType_Name:$contractType
      start:$start
      registrationDate:$registrationDate
      end:$end
      returnStatus:$returnStatus
    ) {
      edges {
        node {
          id
          partner{
            id
            title
          }
          start
          end
        
          creator{
            name
          }
          initiator{
            name

          }

          # contractType
          paymentDate
          signatoryOne
          signatoryTwo
          basedOnDocument
          returnStatus
          contractPdf
          # additionallyAgreement
          comment
          createdAt
          updatedAt

        }
      }
    }
  }
`;
    var data1 = [
  {
    key: 1,
    code: '#2020050301323',
    partner: 'ИП Агенство',

    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',

  },
  {
    key: 2,
    code: '#2020050301323',
    partner: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 3,
    code: '#2020050301323',
    partner: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 4,
    code: '#2020050301323',
    partner: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 5,
    code: '#2020050301323',
    partner: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
  {
    key: 6,
    code: '#2020050301323',
    partner: 'ИП Агенство',
    project: 'CocaCola',
    date_start: '29.05.2021',
    date_end: '29.05.2021',
  },
    ];
 
  

  const { loading, error, data } = useQuery(AGREEMENT_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;

  if (data) {
    console.log(data);
    data1 = data.searchContract.edges.map((item,index) => ({

      key: item.node.id,
      code: `#2020050301323${index}`,
      partner:  item.node.partner ? item.node.partner.name:"",
      project: 'CocaCola',
      date_start:item.node.start && new Date(item.node.start).toLocaleDateString('en-GB'),
      date_end:item.node.end && new Date(item.node.end).toLocaleDateString('en-GB'),
    
    }));
  
  }

  return (

          <Table columns={columns} data={data1} notheader={true} />
  );
};

export default  AgreementsPanel;
