import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Spin } from 'antd';
import { message } from 'antd';

import { messageStyle } from '../components/Styled';


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
    add2 = null,
    del = null,
    del2 = null,
    upd = null,
    selector = "title",
    selectorFun = null,
    filterFun = null,
    filterFunEmpty = false,
    description = null,
    add2ValuesSelector = null,
  }) {
    this.enableStubs = true;
    this.description = description;


    this._query = query ? query : EMPTY_QUERY;
    this._add = add ? add : EMPTY_MUTATION;
    this._add2 = add2 ? add2 : EMPTY_MUTATION;
    this._hasAdd2 = add2 ? true : false;
    this._add2ValuesSelector = add2ValuesSelector;

    this._del = del ? del : EMPTY_MUTATION;
    this._del2 = del2 ? del2 : EMPTY_MUTATION;
    this._hasDel2 = del2 ? true : false;

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
    this.apiQuery = this.apiQuery.bind(this);

    this.useAdd = this.useAdd.bind(this);
    this.apiAdd = this.apiAdd.bind(this);
    this.apiAdd2 = this.apiAdd2.bind(this);

    this.useDel = this.useDel.bind(this);
    this.useDel2 = this.useDel2.bind(this);
    this.apiDel = this.apiDel.bind(this);

    this.useUpd = this.useUpd.bind(this);
    this.apiUpd = this.apiUpd.bind(this);
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

  apiQuery(searchValue = "") {
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

  apiAdd(values, cb) {
    let firstAddPromise = this._addMutation({ variables: values });
    if (!this._hasAdd2) {
      if (cb) {
        cb(firstAddPromise);
      }
    }
    else {
      firstAddPromise
        .then(resultOfFirstAdd => {
          let secondAddValues = values;
          if (this._add2ValuesSelector) {
            secondAddValues = {...values, ...this._add2ValuesSelector(resultOfFirstAdd)}
          }
          console.log('secondAddValues', secondAddValues);
          let secondAddPromise = this._addMutation2({ variables: secondAddValues });
          if (cb) {
            cb(secondAddPromise);
          }
        })
        .catch(reason => {
          message.error({
            content: `Добавление ${this.description} не выполнено. Ошибка: ${reason.message}`,
            duration: 3, style: messageStyle
          });
        })
    }
  }

  useAdd2() {
    let [addMutation2] = useMutation(this._add2, { refetchQueries: [{query: this._query}] });
    this._addMutation2 = addMutation2;
    return this._addMutation2;
  }

  apiAdd2(values) {
    console.log(values);
    return this._addMutation2({ variables: values });
  }

  useDel() {
    let [deleteMutation] = useMutation(this._del, { refetchQueries: [{query: this._query}] });
    this._deleteMutation = deleteMutation;
    return this._deleteMutation;
  }

  useDel2() {
    let [deleteMutation] = useMutation(this._del, { refetchQueries: [{query: this._query}] });
    this._deleteMutation = deleteMutation;
    return this._deleteMutation;
  }

  apiDel(values, cb) {
    let firstDelPromise = this._deleteMutation({ variables: values })
    if (!this._hasDel2) {
      if (cb) {
        cb(firstDelPromise);
      }
    }
    else {

    }

  }

  useUpd() {
    let [updateMutation] = useMutation(this._upd, { refetchQueries: [{query: this._query}] });
    this._updateMutation = updateMutation;
    return this._updateMutation;
  }

  apiUpd(values) {
    console.log('apiUpd', values);
    return this._updateMutation({ variables: values });
  }
}
