import React, { useState, useContext } from 'react';

import { useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';

import { locationsContext } from './Locations';
import Table from '../../../components/Tablea';
import { LoadingAntd } from '../../../components/UI/Loader/Loader'

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const LOCATIONS_T = gql`
query SearchLocation(
  $city:String
  $district:String
  $post:String
  $cadastralNumber:String
  $targetPurpose:String
  $resolutionNumber:String
  $rentContractStart:DateTime
  $rentContractEnd:DateTime
  $area:Float
  $comment:String
  )
  {
    searchLocation(
      postcode_Title: $post
      postcode_District_Title: $district
      postcode_District_City_Title:$city
      cadastralNumber: $cadastralNumber
      purposeLocation_Title: $targetPurpose
      resolutionNumber: $resolutionNumber
      rentContractStart:$rentContractStart
      rentContractEnd:$rentContractEnd
      area:$area
      comment: $comment
    ) {
      edges {
        node {
          id
          familyConstruction {
            title
          }
          postcode {
            title
            district {
              title
              city {
                title
              }
            }
          }
          area
          hasArea
          coordinate
          resolutionNumber
          resolutionNumberDate
          areaAct
          areaActDate
          rentContractNumber
          rentContractStart
          rentContractEnd
          rentContractCreatedAt
          createdAt
          updatedAt
          registrationStatusLocation {
            title
          }
          marketingAddress {
            address
          }
          legalAddress {
            address
          }
          purposeLocation {
            title
          }
          cadastralNumber
          comment
          constructions {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;


const column = (title, dataIndex, width, isShowed, sorter=true) => {
  let result = {
    title: title,
    dataIndex: dataIndex,
    width: width,
    className: (isShowed ? 'show' : 'hide'),
    isShowed: isShowed,
  }
  if (sorter) {
    result.sorter = {
      compare: (a, b) => a[dataIndex] && a[dataIndex].localeCompare(b[dataIndex]),
      multiple: 1,
    }
  }
  return result
};


const initColumnsForPopup = [
  // column('Код местоположения', 'code', 130, true),
  column('Семейство конструкции', 'familyConstruction', 80, true),
  column('Город', 'city', 80, true),
  column('Район', 'district', 80, true),
  column('Адрес юридический', 'adress_j', 150, true),
  column('Кадастровый номер', 'cadastralNumber', 150, true),
  column('Площадь', 'area', 100, true),
  column('Маркетинговый адрес', 'marketingAddress', 150, false),
  column('Количество конструкций', 'constructionQuantity', 150, false),
  column('Целевое назначение', 'purposeLocation', 150, false),
  column('Коментарий', 'comment', 150, false),
  // column('Наличие земли', 'hasArea', 150, false),
  // column('Координаты', 'coordinates', 150, false),
  column('Номер постановления от Акимата', 'resolutionNumber', 150, false),
  column('Дата постановления от Акимата', 'resolutionNumberDate', 150, false),
  column('Номер гос акта на землю', 'areaAct', 150, false),
  column('Дата гос акта на землю', 'areaActDate', 150, false),
  column('Номер договора', 'rentContractNumber', 150, false),
  column('Дата начала договора', 'rentContractStart', 150, false),
  column('Дата окончания договора', 'rentContractEnd', 150, false),
  // column('Регистрация договора', 'rentContractCreatedAt', 150, false),
  // column('Дата создания', 'createdAt', 150, false),
  // column('Дата обновления', 'updatedAt', 150, false),
  column('Статус оформления земельного участка', 'registrationStatusLocation', 150, false),
  {
    dataIndex: 'btn-remove',
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/locations/location/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];
const initColumnsTable = [
  // column('код местоположения', 'code', 130, true),
  column('Семейство конструкции', 'familyConstruction', 80, true),
  column('Город', 'city', 80, true),
  // column('Почтовый индекс', 'post', 80, true),
  column('Район', 'district', 80, true),
  column('Адрес юридический', 'adress_j', 150, true),
  column('Кадастровый номер', 'cadastralNumber', 150, true),
  column('Площадь', 'area', 100, true),
  column('Номер постановления от Акимата', 'resolutionNumber', 150, false),
  column('Номер гос акта на землю', 'areaAct', 150, false),
  column('Номер договора', 'rentContractNumber', 150, false),
  column('Статус оформления земельного участка', 'registrationStatusLocation', 150, false),
  {
    width: 40,
    title: '',
    render: (text, record) => (
      <Link to={{ pathname: `/base/locations/location/${record.key}` }}>
        <img style={{ cursor: 'pointer' }} src={icon_pen} alt="" />
      </Link>
    ),
  },
];

const PanelDesign = (props) => {
  const [filter, setFilter] = useContext(locationsContext);
  const history = useHistory();
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

  var data1 = [
    {
      key: 1,
      code: '#102005030132',
      city: 'Алматы',
      post: '010001',
      district: 'Медеуский р-н.',
      adress_j: 'Абая - ост. ГорВодоКанал',
      cadastralNumber: '34756824',
      area: '32 га',
      contractNumber:"",
      marketingAddress: "",
      constructionQuantity: "",
      targetPurpose: "",
      comment: "",
    },
  ];

  const { loading, error, data } = useQuery(LOCATIONS_T, { variables: filter });
  if (error) return <p>Error :(</p>;
  if (loading) return <LoadingAntd/>;
  if (data) {
    let null2str = (item) => item ? item : '';
    let null2strKey = (item, key) => item ? null2str(item[key]) : '';
    let null2bool = (item) => item ? item : false;
    data1 = data.searchLocation.edges.map((item) => ({
      key: item.node.id,
      hasArea: null2bool(item.node.hasArea),
      coordinates: null2str(item.node.coordinate),
      cadastralNumber: item.node.cadastralNumber,
      comment: null2str(item.node.comment),
      code: '', // TODO
      city: item.node.postcode ? item.node.postcode.district.city.title : '',
      district: item.node.postcode ? item.node.postcode.district.title : '',
      adress_j: null2strKey(item.node.legalAddress,  'address'),
      area: item.node.area,
      rentContractNumber: null2str(item.node.rentContractNumber),
      rentContractStart: null2str(item.node.rentContractStart),
      rentContractEnd: null2str(item.node.rentContractEnd),
      marketingAddress: null2strKey(item.node.marketingAddress, 'address'),
      constructionQuantity: item.node.constructions.edges ? item.node.constructions.edges.length : 0,
      purposeLocation: null2strKey(item.node.purposeLocation, 'title'),
      resolutionNumber: null2str(item.node.resolutionNumber),
      resolutionNumberDate: null2str(item.node.resolutionNumberDate),
      registrationStatusLocation: null2strKey(item.node.registrationStatusLocation, 'title'),
      areaAct: null2str(item.node.areaAct),
      familyConstruction: null2strKey(item.node.familyConstruction, 'title'),
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
          enableChoosePeriod={false}
          changeColumns={changeColumns}
          onRow={(record) => {
            return {
              onClick: () => {
                history.push(`/base/locations/location/${record.key}`);
                history.go(0);
              }
            };
          }}
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
