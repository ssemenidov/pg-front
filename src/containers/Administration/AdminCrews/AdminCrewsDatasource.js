import { PenSpacer, StyledPen, StyledTrash, TrashSpacer } from '../components/Styled';
import styled from 'styled-components';
import { gql } from '@apollo/client';
import { GqlDatasource } from '../components/gql_datasource';
import React from 'react';


const stubCrews = [
  { key: '#202005030123', name: 'Потапов Даниил',     phone: '+7 777 123 45 67', city: 'Актау' },
  { key: '#202005030124', name: 'Кузьмин Виталий',    phone: '+7 777 123 45 67', city: 'Павлодар' },
  { key: '#202005030125', name: 'Логинов Август',     phone: '+7 777 123 45 67', city: 'Актау' },
  { key: '#202005030126', name: 'Гущин Филат',        phone: '+7 777 123 45 67', city: 'Атырау' },
  { key: '#202005030127', name: 'Трофимов Спиридон',  phone: '+7 777 123 45 67', city: 'Нур-Султан' },
  { key: '#202005030128', name: 'Панфилов Андрей',    phone: '+7 777 123 45 67', city: 'Актобе' },
  { key: '#202005030129', name: 'Ефремов Велимир',    phone: '+7 777 123 45 67', city: 'Уральск' },
  { key: '#202005030130', name: 'Колобов Анемподист', phone: '+7 777 123 45 67', city: 'Костанай' },
  { key: '#202005030130', name: 'Силин Соломон',      phone: '+7 777 123 45 67', city: 'Уральск' },
  { key: '#202005030130', name: 'Крюков Иоиль',       phone: '+7 777 123 45 67', city: 'Шымкент' },
  { key: '#202005030131', name: 'Кулагин Филофей',    phone: '+7 777 123 45 67', city: 'Нур-Султан' },
  { key: '#202005030132', name: 'Гордеев Амвросий',   phone: '+7 777 123 45 67', city: 'Караганда' },
  { key: '#202005030133', name: 'Доронин Патапий',    phone: '+7 777 123 45 67', city: 'Павлодар' },
  { key: '#202005030134', name: 'Панфилов Боголеп',   phone: '+7 777 123 45 68', city: 'Алматы' },
  { key: '#202005030134', name: 'Евсеев Филат',       phone: '+7 777 123 45 68', city: 'Алматы' },
];


const GET_CREWS = gql`
  query {
    searchCrew {
      edges {
        node {
          id
          name
          phone
          city {
            id
            title
          }
        }
      }
    }
  }
`;


export const srcCrews = new GqlDatasource({
  query: GET_CREWS,
  method: "searchCrew",
  stub: stubCrews,
  filterFunEmpty: true,
  selectorFun: (data => data.searchCrew.edges.map(item => ({
      key: item.node.id,
      name: item.node.name,
      phone: item.node.phone,
      cityId: item.node.city && item.node.city.id,
      city: item.node.city && item.node.city.title,
    }))),
});
