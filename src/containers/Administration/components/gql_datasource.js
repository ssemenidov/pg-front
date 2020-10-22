import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Spin } from 'antd';


function Loading(props) {
  return <Spin size="large" delay={500}/>
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

const EMPTY_MUTATION = gql`
  mutation StubQuery {
    unexistsEntityStub {
      stub
    }
  }
`;

export class GqlDatasource {
  constructor({
    query,
    stub,
    method = null,
    add = null,
    del = null,
    upd = null,
    selector = "title",
    selectorFun = null,
    filterFun = null,
    filterFunEmpty = false,
  }) {
    this.enableStubs = true;


    this._query = query ? query : EMPTY_QUERY;
    this._add = add ? add : EMPTY_MUTATION;
    this._del = del ? del : EMPTY_MUTATION;
    this._upd = upd ? upd : EMPTY_MUTATION;

    if (selectorFun) {
      this.selector = selectorFun;
    } else {
      this.selector = (data) => data[method].edges.map(item => ({
        key: item.node.id, name: item.node[selector]
      }));
    }

    if (filterFun) {
      this.filter = filterFun;
    } else {
      this.filter = (value) => ({ [selector]: value });
    }
    if (filterFunEmpty) {
      this.filter = (value) => {}
    }


    this.stubData = stub;
    this.query = this.query.bind(this);
    this.useAdd = this.useAdd.bind(this);
    this.add = this.add.bind(this);
    this.useDel = this.useDel.bind(this);
    this.del = this.del.bind(this);
    this.useUpd = this.useUpd.bind(this);
    this.upd = this.upd.bind(this);
  }

  loader() {
    return <Loading/>;
  }

  queryIsEmpty() {
    return this._query === null;
  }

  setFilter(filter) {
    this.filter = filter;
  }

  query(searchValue = "") {
    console.assert(this._query !== null);
    const { loading, error, data, refetch } = useQuery(this._query, { variables: this.filter(searchValue) });

    this.refetch = refetch;

    if (error) {
      if (!this.enableStubs)
        return [<Error/>, true];
      else
        return [this.stubData, false];
    } else {
      if (loading)
        return [this.loader(), true];
      return [data ? this.selector(data) : [], false];
    }
  }

  useAdd() {
    let [addMutation] = useMutation(this._add, { refetchQueries: [{query: this._query}] });
    this._addMutation = addMutation;
    return this._addMutation;
  }

  add(values) {
    values = {title: values.title};
    console.log('ff', values);
    return this._addMutation({ variables: values });
  }

  useDel() {
    let [deleteMutation] = useMutation(this._del, { refetchQueries: [{query: this._query}] });
    this._deleteMutation = deleteMutation;
    return this._deleteMutation;
  }

  del(values) { return this._deleteMutation({ variables: values }); }

  useUpd() {
    let [updateMutation] = useMutation(this._upd, { refetchQueries: [{query: this._query}] });
    this._updateMutation = updateMutation;
    return this._updateMutation;
  }

  upd(values) { return this._updateMutation({ variables: values }); }

}
