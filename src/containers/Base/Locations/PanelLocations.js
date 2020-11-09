import React, {useState, useContext, useEffect} from 'react';

import { useQuery, gql } from '@apollo/client';
import {Link} from 'react-router-dom';
import {useHistory, useLocation} from 'react-router';

import { locationsContext } from './Locations';
import Table from '../../../components/Tablea';

import icon_pen from '../../../img/outdoor_furniture/table_icons/bx-dots-vertical.svg';

const LOCATIONS_T = gql`
   query SearchLocation(
     $city: String
     $district: String
     $post: String
     $cadastralNumber: String
     $targetPurpose: String
     $resolutionNumber: String
     $rentContractStart: DateTime
     $rentContractEnd :DateTime
     $area: Float
     $comment: String
) {
    searchLocation(
      postcode_District_City_Title:$city
      postcode_District_Title: $district
      postcode_Title: $post
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
          postcode {
            id
            title
            district {
              id
              title
              city {
                id
                title
              }
            }
          }
          area
          legalAddress {
            address
          }
          marketingAddress {
            address
          }
          coordinate
          cadastralNumber
          purposeLocation {
            title
          }
          rentContractNumber
          comment
          constructions {
            edges {
              node {
                id
              }
            }
          }
          rentContractNumber
        }
      }
    }
  }
`;

const initColumnsForPopup = [
  {
    title: 'код местоположения',
    dataIndex: 'code',
    width: 130,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 80,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Почтовый индекс',
    dataIndex: 'post',
    width: 80,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Район',
    dataIndex: 'district',
    width: 80,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Адрес юридический',
    dataIndex: 'adress_j',
    width: 150,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Кадастровый номер',
    dataIndex: 'cadastralNumber',
    width: 150,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Площадь',
    dataIndex: 'area',
    width: 100,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Номер договора',
    dataIndex: 'contractNumber',
    width: 150,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Маркетинговый адрес',
    dataIndex: 'marketingAddress',
    width: 150,
    className: 'hide',
    isShowed: false
  },
  {
    title: 'Количество конструкций',
    dataIndex: 'constructionQuantity',
    width: 150,
    className: 'hide',
    isShowed: false
  },
  {
    title: 'Целевое назначение',
    dataIndex: 'targetPurpose',
    width: 150,
    className: 'hide',
    isShowed: false
  },
  {
    title: 'Коментарий',
    dataIndex: 'comment',
    width: 150,
    className: 'hide',
    isShowed: false
  },
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
  {
    title: 'код местоположения',
    dataIndex: 'code',
    width: 130,
    className: 'show',
    isShowed: true,
    sorter: {
      compare: (a, b) => a.code.localeCompare(b.code),
      multiple: 1,
    },

  },
  {
    title: 'Город',
    dataIndex: 'city',
    width: 80,
    className: 'show',
    isShowed: true,
    sorter: {
      compare: (a, b) => a.city.localeCompare(b.city),
      multiple: 1,
    },
  },
  {
    title: 'Почтовый индекс',
    dataIndex: 'post',
    width: 80,
    className: 'show',
    isShowed: true,
  },
  {
    title: 'Район',
    dataIndex: 'district',
    width: 80,
    className: 'show',
    isShowed: true,
    sorter: {
      compare: (a, b) => a.district.localeCompare(b.district),
      multiple: 1,
    },
  },
  {
    title: 'Адрес юридический',
    dataIndex: 'adress_j',
    width: 150,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Кадастровый номер',
    dataIndex: 'cadastralNumber',
    width: 150,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Площадь',
    dataIndex: 'area',
    width: 100,
    className: 'show',
    isShowed: true
  },
  {
    title: 'Номер договора',
    dataIndex: 'contractNumber',
    width: 150,
    className: 'show',
    isShowed: true
  },
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
  const location = useLocation();
  const [columnsForPopup, setColumnsForPopup] = useState(initColumnsForPopup);
  const [columnsTable, setColumnsTable] = useState(initColumnsTable);

  var data1 = [
    {
      key: 1,
      code: '#1020050301323',
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

  const { loading, error, data, refetch } = useQuery(LOCATIONS_T, { variables: filter });

  useEffect(() => {
    refetch();
  }, [location])

  if (error) return <p>Error :(</p>;
  if (loading) return <h3></h3>;
  if (data) {
    data1 = data.searchLocation.edges.map((item) => ({
      key: item.node.id,
      code: item.node.id,
      city: item.node.postcode && item.node.postcode.district && item.node.postcode.district.city && item.node.postcode.district.city.title,
      post: item.node.postcode,
      district: item.node.postcode && item.node.postcode.district,
      adress_j: item.node.legalAddress && item.node.legalAddress.address,
      cadastralNumber: item.node.cadastralNumber,
      area: item.node.area,
      contractNumber: item.rentContractNumber,
      marketingAddress: item.marketingAddress && item.marketingAddress.address,
      constructionQuantity: item.node.constructions.edges ? item.node.constructions.edges.length : 0,
      targetPurpose: item.node.purposeLocation && item.node.purposeLocation.title,
      comment: item.node.comment
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
