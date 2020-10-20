import { GqlDatasource } from '../components/gql_datasource';
import { gql } from '@apollo/client';


const stubAdvSide = [
  {name: "Скроллерная A1", childs: null},
  {name: "Скроллерная A2", childs: null},
  {name: "Скроллерная A3", childs: null},
];
const stubSide = [
  {name: "Скроллерная A", childs: stubAdvSide},
  {name: "Скроллерная B", childs: stubAdvSide},
];
const stubFormat = [
  {name: "Ситилайт Decaux", childs: {}},
  {name: "Ситилайт Decaux MUPI", childs: stubSide},
];
const stubModel = [
  {name: "CIP Forum", childs: stubFormat},
  {name: "CIP Szekely", childs: stubFormat},
];
const stubSubFamilies = [
  // {name: "Европейское", childs: stubModel},
  // {name: "Европейское2", childs: stubModel},
];
const stubFamilies = [
  {name: "Сениор", childs: {}},
  {name: "Мюпи", childs: stubSubFamilies},
  {name: "Флагштоки", childs: stubSubFamilies},
  {name: "Остановки", childs: {}},
  {name: "Созданная конструкция №1", childs: stubSubFamilies},
];


const GET_FAMILIES = gql`
  query SearchFamily($id: ID, $title: String) {
    searchFamilyConstruction(id: $id, title: $title) {
      edges {
        node {
          id
          title
          underFamilyConstruction {
            id
            title
          }
        }
      }
    }
  }
`

const ADD_FAMILY = gql`
  mutation($title: String) {
    createFamilyConstruction(
      input: {
        title: $title
      }
    ) {
      familyConstruction {
        id
        title
      }
    }
  }
`;

const DELETE_FAMILY = gql`
  mutation($id: ID!) {
    deleteFamilyConstruction(id: $id) {
      found,
      deletedId
    }
  }
`;

const UPDATE_FAMILY = gql`
  mutation($id: ID!, $title: String) {
    updateFamilyConstruction(id: $id, input: {
      title: $title
    }) {
      familyConstruction {
        id
      }
    }
  }
`;


export const srcFamily = new GqlDatasource({
  query: GET_FAMILIES,
  method: "searchFamilyConstruction",
  stub: stubFamilies,
  add: ADD_FAMILY,
  del: DELETE_FAMILY ,
  upd: UPDATE_FAMILY,
});


const ADD_UNDERFAMILY = gql`
  mutation($id: [ID], $title: String) {
    createUnderFamilyConstruction(
      input: {
        familyConstruction: $id,
        title: $title
      }
    ) {
      underFamilyConstruction {
        id
      }
    }
  }
`;

const UPDATE_UNDERFAMILY = gql`
  mutation($id: ID!, $title: String) {
    updateUnderFamilyConstruction(
      id: $id
      input: {
        title: $title
      }
    ) {
      underFamilyConstruction {
        id
      }
    }
  }
`;

const DELETE_UNDERFAMILY = gql`
  mutation($id: ID!) {
    deleteUnderFamilyConstruction(id: $id) {
      found
    }
  }
`;


export const srcSubFamily = new GqlDatasource({
  query: GET_FAMILIES,
  selectorFun: (data) => {
    if (data === null
      || data.searchFamilyConstruction.edges.length === 0
      || data.searchFamilyConstruction.edges.length === 0
      || data.searchFamilyConstruction.edges[0].node.underFamilyConstruction === null
    )
      return [];
    console.log(data.searchFamilyConstruction);

    let val = data.searchFamilyConstruction.edges[0].node.underFamilyConstruction // TODO: поменять на маппинг массива когда будет готово api
    return [{key: val.id, name: val.title}];
  },
  filterFun: (searchValue) => searchValue,
  stub: stubSubFamilies,
  add: ADD_UNDERFAMILY,
  upd: UPDATE_UNDERFAMILY,
  del: DELETE_UNDERFAMILY,
});





export const srcModel = new GqlDatasource({query: null, method: null, stub: stubModel});
export const srcFormat = new GqlDatasource({query: null, method: null, stub: stubFormat});
export const srcSide = new GqlDatasource({query: null, method: null, stub: stubSide});
export const srcAdvSide = new GqlDatasource({query: null, method: null, stub: stubAdvSide});
