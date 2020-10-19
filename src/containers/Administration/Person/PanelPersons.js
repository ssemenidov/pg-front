import React, { useState, useEffect, useContext } from 'react';
import styled from "styled-components";

import Table from '../../../components/Tablea';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import icon_pen from '../../../img/administration/edit-icon-transparent.svg';
import icon_trash from '../../../img/administration/red_can.svg';
import { StyledPen, TrashSpacer, PenSpacer, EditTrashImg } from '../components/Styled'
import '../Style/style.css'
import { GqlDatasource } from '../components/gql_datasource';

const sorterObj = { compare: (a, b) => a.localeCompare(b), multiple: 1 }

const personColumns = [
  { title: 'Код',       dataIndex: 'key',      width: 100, sorter: sorterObj },
  { title: 'Ф.И.О',     dataIndex: 'name',     width: 100, sorter: sorterObj },
  { title: 'Должность', dataIndex: 'position', width: 100, sorter: sorterObj },
  { title: 'Телефон',   dataIndex: 'phone',    width: 100, sorter: sorterObj },
  { title: 'E-mail',    dataIndex: 'email',    width: 100, sorter: sorterObj },
  {
    width: 50,
    fixed: 'right',
    render: (text, record) => (
      <>
        <PenSpacer />
        <Link to={`/base/partners/partner/${record.key}`}>
          <StyledPen src={icon_pen} alt="" />
        </Link>
        <TrashSpacer/>
        <Link to={`/base/partners/partner/${record.key}`}>
          <EditTrashImg src={icon_trash} alt="" />
        </Link>
      </>
    ),
  },
];

const stubUsers = [
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

const StyledOutdoorTableBar = styled.div`
    width: 100%;
`;

const GET_USERS = gql`
  query {
    users {
      edges {
        node {
          id
          username
          firstName
          lastName
          isStaff
          phone
          email
          comment
        }
      }
    }
  }
`;

const srcUsers = new GqlDatasource(GET_USERS, "users",  stubUsers, {
  filterFunEmpty: true,
  selectorFun: (node) => ({
    key: node.username,
    name: `${node.firstName} ${node.lastName}`,
    position: node.comment,
    phone: node.phone,
    email: node.email,
    accessLevel: node.isStaff
  })
});

const PanelDesign = (props) => {

  let [values, isReactComponent] = srcUsers.query();
  if (isReactComponent)
    return values;

  // const [filter, setFilter] = useContext(partnersContext);
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
    <StyledOutdoorTableBar>
      <Table style={{ width: '100%' }} columns={personColumns} data={values} notheader={true} />
    </StyledOutdoorTableBar>
  );
};

export default PanelDesign;
