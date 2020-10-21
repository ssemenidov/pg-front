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
            edges {
              node {
                id
                title
              }
            }
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
      found
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

function selectSubconstructions(key, subKey) {
  return ((data) => {
    if (data === null
      || data[key].edges.length === 0
      || data[key].edges.length === 0
      || data[key].edges[0].node[subKey] === null
    )
      return [];

    return data[key].edges[0].node[subKey].edges.map(
      (item) => { console.log('mapped',  item); return {key: item.node.id, name: item.node.title}; }
    );
  });
}

const simpleFilterFun = (searchValue) => searchValue;

export const srcSubFamily = new GqlDatasource({
  query: GET_FAMILIES,
  selectorFun: selectSubconstructions("searchFamilyConstruction", "underFamilyConstruction"),
  filterFun: simpleFilterFun,
  stub: stubSubFamilies,
  add: ADD_UNDERFAMILY,
  upd: UPDATE_UNDERFAMILY,
  del: DELETE_UNDERFAMILY,
});


const GET_MODELS = gql`
  query($id: ID, $title: String) {
    searchUnderFamilyConstruction(id: $id, title: $title) {
      edges {
        node {
          modelConstruction {
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
`

// const ADD_MODEL = gql`
//   mutation($title: String) {
//     createModelConstruction(
//       input: {
//         title: $title
//       }
//     ) {
//       familyConstruction {
//         id
//         title
//       }
//     }
//   }
// `;

// const DELETE_MODEL = gql`
//   mutation($id: ID!) {
//     deleteFamilyConstruction(id: $id) {
//       found,
//       deletedId
//     }
//   }
// `;
//
// const UPDATE_MODEL = gql`
//   mutation($id: ID!, $title: String) {
//     updateFamilyConstruction(id: $id, input: {
//       title: $title
//     }) {
//       familyConstruction {
//         id
//       }
//     }
//   }
// `;


export const srcModel = new GqlDatasource({
  query: GET_MODELS,
  selectorFun: selectSubconstructions("searchUnderFamilyConstruction", "modelConstruction"),
  filterFun: simpleFilterFun,
  stub: stubModel,
  // add: ADD_UNDERFAMILY,
  // upd: UPDATE_UNDERFAMILY,
  // del: DELETE_UNDERFAMILY,
});


export const srcFormat = new GqlDatasource({query: null, method: null, stub: stubFormat});
export const srcSide = new GqlDatasource({query: null, method: null, stub: stubSide});
export const srcAdvSide = new GqlDatasource({query: null, method: null, stub: stubAdvSide});
