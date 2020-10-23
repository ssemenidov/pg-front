import { GqlDatasource } from '../components/gql_datasource';
import { gql } from '@apollo/client';


const stubAdvSide = [
  {name: "Скроллерная A1", childs: null},
  {name: "Скроллерная A2", childs: null},
  {name: "Скроллерная A3", childs: null},
];
const stubSide = [
  // {name: "Скроллерная A", childs: stubAdvSide},
  // {name: "Скроллерная B", childs: stubAdvSide},
  {name: "API ERROR", childs: stubAdvSide},
];
const stubFormat = [
  // {name: "Ситилайт Decaux", childs: {}},
  // {name: "Ситилайт Decaux MUPI", childs: stubSide},
  {name: "API ERROR", childs: stubSide},
];
const stubModel = [
  // {name: "CIP Forum", childs: stubFormat},
  // {name: "CIP Szekely", childs: stubFormat},
  {name: "API ERROR", childs: stubFormat},
];
const stubSubFamilies = [
  {name: "API ERROR", childs: stubModel},
  // {name: "Европейское", childs: stubModel},
  // {name: "Европейское2", childs: stubModel},
];
const stubFamilies = [
  {name: "API ERROR", childs: {}},
  // {name: "Сениор", childs: {}},
  // {name: "Мюпи", childs: stubSubFamilies},
  // {name: "Флагштоки", childs: stubSubFamilies},
  // {name: "Остановки", childs: {}},
  // {name: "Созданная конструкция №1", childs: stubSubFamilies},
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
    createUnderFamilyConstruction(input: {
      title: $title,
      familyConstruction: $id
    }) {
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


function checkSubkeyEmpty(
  data, subKey, key
) {
  return data === null
    || data[key].edges.length === 0
    || data[key].edges.length === 0
    || data[key].edges[0].node[subKey] === null
    ;
}

function defaultMapSubgroup(item) { return {key: item.node.id, name: item.node.title}; }

function selectOutdoorFurnitureSubgroup(key, subKey, mapSubgroup=defaultMapSubgroup) {
  return ((data) => {
    if (checkSubkeyEmpty(data, subKey, key))
      return [];
    console.log('selectOutdoorFurnitureSubgroup:', data);

    return data[key].edges[0].node[subKey].edges.map( (item) => { return mapSubgroup(item); } );
  });
}


const simpleFilterFun = (searchValue) => searchValue;

export const srcSubFamily = new GqlDatasource({
  query: GET_FAMILIES,
  selectorFun: selectOutdoorFurnitureSubgroup("searchFamilyConstruction", "underFamilyConstruction"),
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
                title
              }
            }
          }
        }
      }
    }
  }
`


const ADD_MODEL = gql`
  mutation($id: [ID], $title: String) {
    createModelConstruction(
      input: {
        title: $title
        underFamilyConstruction: $id
      }
    ) {
      modelConstruction  {
        id
      }
    }
  }
`;


const DELETE_MODEL = gql`
  mutation($id: ID!) {
    deleteModelConstruction(id: $id) {
      found
    }
  }
`;


const UPDATE_MODEL = gql`
  mutation($id: ID!, $title: String) {
    updateModelConstruction(
      id: $id
      input: {
        title: $title
      }
    ) {
      modelConstruction {
        id
      }
    }
  }
`;


export const srcModel = new GqlDatasource({
  query: GET_MODELS,
  selectorFun: selectOutdoorFurnitureSubgroup("searchUnderFamilyConstruction", "modelConstruction"),
  filterFun: simpleFilterFun,
  stub: stubModel,
  add: ADD_MODEL,
  upd: UPDATE_MODEL,
  del: DELETE_MODEL,
});


const GET_FORMATS = gql`
  query($id: ID, $title: String) {
    searchModelConstruction(id: $id, title: $title) {
      edges {
        node {
          format {
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

const ADD_FORMAT = gql`
  mutation($id: [ID], $title: String) {
    createFormat(
      input: {
        title: $title
        modelConstruction: $id
      }
    ) {
      format  {
        id
      }
    }
  }
`;


const DELETE_FORMAT = gql`
  mutation($id: ID!) {
    deleteFormat(id: $id) {
      found
    }
  }
`;


const UPDATE_FORMAT = gql`
  mutation($id: ID!, $title: String) {
    updateFormat(
      id: $id
      input: {
        title: $title
      }
    ) {
      format {
        id
      }
    }
  }
`;


export const srcFormat = new GqlDatasource({
  query: GET_FORMATS,
  selectorFun: selectOutdoorFurnitureSubgroup("searchModelConstruction", "format"),
  filterFun: simpleFilterFun,
  stub: stubFormat,
  add: ADD_FORMAT,
  upd: UPDATE_FORMAT,
  del: DELETE_FORMAT,
});


const GET_SIDES = gql`
  query($id: ID, $title: String) {
    searchFormat(id: $id, title: $title) {
      edges {
        node {
          constructionSide {
            edges {
              node {
                id
                side {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`


const ADD_SIDE = gql`
  mutation($title: String) {
    createSide(input: { title: $title }) {
      side {
        id
      }
    }
  }
`;

const ADD_CONSTRUCTION_SIDE = gql`
  mutation($id: ID, $sideId: ID) {
    createConstructionSide(
      input: {
        side: $sideId
        format: $id
      }
    ) {
      constructionSide  {
        id
      }
    }
  }
`;


const DELETE_SIDE = gql`
  mutation($id: ID!) {
    deleteConstructionSide(id: $id) {
      found
    }
  }
`;


const UPDATE_SIDE = gql`
  mutation($sideId: ID!, $title: String) {
    updateSide(
      id: $sideId
      input: {
        title: $title
      }
    ) {
      side {
        id
      }
    }
  }
`;


export const srcSide = new GqlDatasource({
  query: GET_SIDES,
  selectorFun: selectOutdoorFurnitureSubgroup(
    "searchFormat",
    "constructionSide",
    item => ({key: item.node.id, name: item.node.side.title, sideId: item.node.side.id}),
  ),
  filterFun: simpleFilterFun,
  stub: stubSide,
  add: ADD_SIDE,
  add2: ADD_CONSTRUCTION_SIDE,
  upd: UPDATE_SIDE,
  del: DELETE_SIDE,
  description: "стороны",
  add2ValuesSelector: value => ({sideId: value.data.createSide.side.id}),
});



export const srcAdvSide = new GqlDatasource({query: null, method: null, stub: stubAdvSide});
