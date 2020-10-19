import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

function Loading(props) {
  return <h3></h3>
}

function Error(props) {
  return <p>Error :(</p>
}

const EMPTY_QUERY = gql`
  query StubQuery {
    unexistsEntityStub {
      stub
    }
  }
`;

export class GqlDatasource {
  constructor(dataQuery, methodName, stubData = [], options = {}) {
    const defaultOptions = {
      selector : "title",
      selectorFun : null,
      filterFun : null,
      filterFunEmpty : false,
    };
    options = { ...defaultOptions, ...options };
    this.enableStubs = true;


    this._query = dataQuery ? dataQuery : EMPTY_QUERY;

    if (options.selectorFun) {
      this.selector = (data) => data[methodName].edges.map(item => (options.selectorFun(item.node)));
    } else {
      this.selector = (data) => data[methodName].edges.map(item => ({
        key: item.node.id, name: item.node[options.selector]
      }));
    }

    if (options.filterFun) {
      this.filter = options.filterFun;
    } else {
      this.filter = (value) => ({ [options.selector]: value });
    }
    if (options.filterFunEmpty) {
      this.filter = (value) => {}
    }

    this.stubData = stubData;
  }

  queryIsEmpty() {
    return this._query === null;
  }

  setFilter(filter) {
    this.filter = filter;
  }

  query(searchValue = "") {
    console.assert(this._query !== null);
    const { loading, error, data } = useQuery(this._query, { variables: this.filter(searchValue) });
    if (error) {
      if (!this.enableStubs)
        return [<Error/>, true];
      else
        return [this.stubData, false];
    } else {
      if (loading)
        return [<Loading/>, true];
      return [data ? this.selector(data) : [], false];
    }
  }
}
