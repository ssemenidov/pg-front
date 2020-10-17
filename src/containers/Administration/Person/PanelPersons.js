import React, { useState, useEffect, useContext } from 'react';
// import { partnersContext } from './Partners';

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import icon_pen from '../../../img/administration/edit-icon-transparent.svg';
import icon_trash from '../../../img/administration/red_can.svg';
import '../Style/style.css'

const sorterObj = { compare: (a, b) => a.localeCompare(b), multiple: 1 }

const PanelDesign = (props) => {
  // const [filter, setFilter] = useContext(partnersContext);
  const columns = [
    {
      title: 'Код',
      dataIndex: 'key',
      width: 100,
      sorter: sorterObj,
    },
    {
      title: 'Ф.И.О',
      dataIndex: 'name',
      width: 100,
      sorter: sorterObj,
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      width: 100,
      sorter: sorterObj,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      width: 100,
      sorter: sorterObj,
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      width: 100,
      sorter: sorterObj,
    },
    {
      width: 50,
      fixed: 'right',
      render: (text, record) => (
        <React.Fragment>
          <div className="PenSpacer"></div>
          <Link to={`/base/partners/partner/${record.key}`}>
            <img className="EditPenStyle" src={icon_pen} alt="" />
          </Link>
          <div className="TrashSpacer"></div>
          <Link to={`/base/partners/partner/${record.key}`}>
            <img className="EditTrashStyle" src={icon_trash} alt="" />
          </Link>
        </React.Fragment>
      ),
    },
  ];

  var data1 = [
    { key: '#202005030123', name: 'Потапов Даниил',     position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030124', name: 'Кузьмин Виталий',    position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030125', name: 'Логинов Август',     position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030126', name: 'Гущин Филат',        position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030127', name: 'Трофимов Спиридон',  position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030128', name: 'Панфилов Андрей',    position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030129', name: 'Ефремов Велимир',    position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030130', name: 'Колобов Анемподист', position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030131', name: 'Силин Соломон',      position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030132', name: 'Крюков Июль',        position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030133', name: 'Кулагин Филофей',    position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
    { key: '#202005030134', name: 'Гордеев Амвросий',   position: 'Менеджер', phone: '+7 777 123 45 67', email: 'email@mail.kz' },
  ];

  // const PARTNERS_T = gql`
  //   {
  //     searchPartner(id: "") {
  //       edges {
  //         node {
  //           id
  //           partnerType {
  //             title
  //           }
  //           title
  //           brands {
  //             edges {
  //               node {
  //                 title
  //               }
  //             }
  //           }
  //           workingSector {
  //             title
  //           }
  //           clientType {
  //             title
  //           }
  //         }
  //       }
  //     }
  //   }
  // `;

  // const { loading, error, data } = useQuery(PARTNERS_T, { variables: filter });
  // if (error) return <p>Error :(</p>;
  // if (loading) return <h3></h3>;
  // console.log(data);

  let data = null;

  // if (data) {
  //   data1 = data.searchPartner.edges.map((item) => ({
  //     key: item.node.id,
  //     type: item.node.partnerType ? item.node.partnerType.title : '',
  //     partner: item.node.title,
  //     brand: 'CocaCola',
  //     sector: item.node.workingSector ? item.node.workingSector.title : '',
  //     client: item.node.clientType ? item.node.clientType.title : '',
  //   }));
  // }

  return (
    <>
      <div className="outdoor-table-bar">
        <Table style={{ width: '100%' }} columns={columns} data={data1} notheader={true} />
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
