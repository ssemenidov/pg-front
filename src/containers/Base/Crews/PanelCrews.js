import React, { useState, useEffect, useContext } from 'react';
import { crewsContext } from './Crews';
import { useQuery, gql, useMutation } from '@apollo/client';

import styled from 'styled-components';
import { List } from 'antd';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import Table from '../../../components/Tablea';
import oval from '../../../img/Oval.svg';
const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(crewsContext);
  const[current,setCurrent]=useState(0);
  const columns = [
    {
      title: 'Код конструкции',
      dataIndex: 'code',

      width: 130,
      sorter: {
        compare: (a, b) => a.code.localeCompare(b.code),
        multiple: 1,
      },  
    },
    {
      title: 'Формат',
      dataIndex: 'format',

      width: 100,
      sorter: {
        compare: (a, b) => a.format.localeCompare(b.format),
        multiple: 1,
      },  
    },
    {
      title: 'Город',
      dataIndex: 'city',
      width: 100,
      sorter: {
        compare: (a, b) => a.city.localeCompare(b.city),
        multiple: 1,
      },  
    },
    {
      title: 'Адрес',
      dataIndex: 'adress',
      width: 100,
       sorter: {
            compare: (a, b) => a.adress.localeCompare(b.adress),
            multiple: 1,
          },  
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 100,
       sorter: {
            compare: (a, b) => a.status.localeCompare(b.status),
            multiple: 1,
          },  
    },
    {
      title: 'Дата начала ',
      dataIndex: 'date_start',
      width: 100,
       sorter: {
            compare: (a, b) => a.date_start.localeCompare(b.date_start),
            multiple: 1,
          },  
    },
  ];

  var data1 = [
    // {
    //   key: 1,
    //   code: '126353',
    //   format: 'Сениор',
    //   city: 'Алматы',
    //   adress: 'Достык 25',
    //   status: 'Размещен',
    //   date_start: '19.06.2020',
    // },
 
  ];
 

  const CREWS_T = gql`
  query SearchCrew(
    $name: String
    $phone: String
    $city: String
    $district: String
    $adress: String
  ) {
    searchCrew(
      name: $name
      phone:  $phone
      city_Title:$city
      
      constructions_Location_Postcode_District_Title: $district
      constructions_Location_MarketingAddress_Address:  $adress
     
    ) {
      edges {
        node {
          id
          phone
          name
          constructions {
            edges {
              node {
                id
                code
                statusConnection
                createdAt
                
                # city {
                #   id
                #   title
                # }
                # legalAddress
                # district {
                #   id
                #   title
                # }

              }
            }
          }
        }
      }
    }
  }
  `;
  
  const { loading, error, data } = useQuery(CREWS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {

    if(data.searchCrew.edges[current])
    {
      data1 = data.searchCrew.edges[current].node.constructions.edges.map((item) => ({
      key: item.node.id,
      code: item.node.code,
      format: item.node.format,
      city: item.node.city  ? item.node.city.title : '',
      adress: item.node.legalAddress,
      status: item.node.statusConnection,
      date_start: new Date(item.node.createdAt).toLocaleDateString('en-GB')
    }));
  }
  }
  return (
    <>
     <StyledCrewsBlock>
        <JobTitle style={{ fontSize: '19px', margin: '0' }}>ЭКИПАЖИ</JobTitle>
        <List>
         {data.searchCrew.edges.map((item,index)=>
           <StyledListItem key={index} onClick={()=>{  setCurrent(index)}}>
           <img src={oval} alt="" />
           <span>{item.node.name}</span>
         </StyledListItem>
         )}
        </List>
      </StyledCrewsBlock>
      <div style={{ display: 'flex', width: ' 100%', overflowX: 'hidden ' }}>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data1} title={`Назначеные конструкции`} />
      </div>
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
const StyledCrewsBlock = styled.div`
  border-radius: 8px;
  width: 330px;
  margin-right: 15px;
  border: 1px solid #d3dff0;
  padding: 15px;
`;
const StyledListItem = styled(List.Item)`
  display: flex;
  cursor:pointer;
  justify-content: flex-start;
  span {
    margin-left: 20px;
  }
`;