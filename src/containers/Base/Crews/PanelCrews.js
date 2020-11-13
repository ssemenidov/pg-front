import React, { useState, useContext } from 'react';
import { crewsContext } from './Crews';
import { useQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import { List } from 'antd';

import { JobTitle } from '../../../components/Styles/StyledBlocks';
import Table from '../../../components/Tablea';
import Preloader from '../../../components/Preloader/Preloader';
import { column } from '../../../components/Table/utils';

import oval from '../../../img/Oval.svg';

const initColumnsForPopup = [
  column('Инвентарный номер конструкции (ОТО)', 'code', 130, true),
  column('Формат', 'format', 100, true),
  column('Город', 'city', 100, true),
  column('Адрес', 'adress', 100, true),
  column('Статус', 'status', 100, true),
  column('Дата начала', 'date_start', 100, true)
];
const initColumnsTable = [
  column('Инвентарный номер конструкции (ОТО)', 'code', 130, true),
  column('Формат', 'format', 100, true),
  column('Город', 'city', 100, true),
  column('Адрес', 'adress', 100, true),
  column('Статус', 'status', 100, true),
  column('Дата начала', 'date_start', 100, true)
];


const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(crewsContext);
  const[current,setCurrent]=useState(null);

  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

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
      name_Icontains: $name
      phone_Icontains:$phone
      constructions_Location_Postcode_District_City_Title:$city
      constructions_Location_Postcode_District_Title: $district
      constructions_Location_MarketingAddress_Address_Icontains:$adress
    ) {
      edges {
        node {
          id
          phone
          name
        }
      }
    }
  }
  `;
  const CREWS_CONSTRUCT_T = gql`
  query SearchCrew(
    $id:ID
    $city: String
    $district: String
    $adress: String
  ) {
    searchCrew(
      id:$id
      constructions_Location_Postcode_District_City_Title:$city
      constructions_Location_Postcode_District_Title: $district
      constructions_Location_MarketingAddress_Address_Icontains:  $adress
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
                format {
                  id
                  title
                }
                statusConnection
                createdAt
                techInventNumber
                location {
                  postcode {
                    title
                    district {
                      title
                      city {
                        title
                        id
                      }
                    }
                  }
                  marketingAddress {
                    address
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const crews = useQuery(CREWS_T, { variables: {...filter,id:""} }).data;
  const {error, loading, data} = useQuery(CREWS_CONSTRUCT_T, { variables:{...filter,id:current} })

  const crew_construct = data;
  if (crew_construct) {
    if(crew_construct.searchCrew.edges[0])
    {
      console.log(crew_construct);
      data1 = crew_construct.searchCrew.edges[0].node.constructions.edges.map((item,index) => ({
      key: item.node.id,
      // code: item.node.location ? (item.node.location.postcode ? item.node.location.postcode.title : (""+index)) : (""+index),
      code: item.node.techInventNumber ? item.node.techInventNumber : "",
      format: item.node.format && item.node.format.title,
      city: item.node.location && item.node.location.postcode.district.city.title,
      adress: item.node.location &&  item.node.location.marketingAddress.address,
      status: item.node.statusConnection ? "Размещен":"Неразмещен",
      date_start: new Date(item.node.createdAt).toLocaleDateString('en-GB')
    }));
  }
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

  if( !crews ){
    return <span></span>
  }
  return (
    <>
      <StyledCrewsBlock>
        <JobTitle style={{ fontSize: '19px', margin: '0' }}>ЭКИПАЖИ</JobTitle>
        <List>
        {crews.searchCrew.edges.map((item,index)=>
          <StyledListItem key={index} onClick={()=>{  setCurrent(item.node.id)}}>
          <StyledIcon>{item.node.name && item.node.name.charAt(0)}</StyledIcon>
          <span>{item.node.name}</span>
        </StyledListItem>
        )}
        </List>
      </StyledCrewsBlock>
      <div style={{ display: 'flex', width: ' 100%', overflowX: 'hidden ' }}>
      <div className="outdoor-table-bar">
        {loading && <Preloader size={'large'}/>}
        {!loading &&
          <Table
            style={{ width: '100%' }}
            columnsForPopup={columnsForPopup}
            columns={columnsTable}
            data={data1}
            enableChoosePeriod={false}
            changeColumns={changeColumns}
            title={`Назначеные конструкции`}
          />
        }
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
  font-weight:600;
  span {
    margin-left: 20px;
  }
`;
const StyledIcon =styled.div`
  width:28px;
  height:28px;
  background-image: url(${oval});
  display: flex;
  font-size: 14px;
  font-weight:600;
  justify-content: center;
  align-items:center;

`
