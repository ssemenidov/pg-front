import { useState } from 'react';

export class LocationState {
  constructor({datasource, title, idx, childType = null}) {
    let [selected, setSelected] = useState({});
    let [stateSelectedIdx, setStateSelectedIdx] = useState(-1);

    this.idx = idx;
    this.title = title;
    this.selected = selected;
    this.setSelected = (val) => {
      console.log(title, val);
      setSelected(val);
    }
    this.stateSelectedIdx = stateSelectedIdx;
    this.setStateSelectedIdx = setStateSelectedIdx;
    this.src = datasource;
    this.childType = childType;
    datasource.useAdd();
    datasource.useDel();
    datasource.useUpd();
    this.parent = null;
  }

  setParent(parent) {
    this.parent = parent;
  }

  childDatasource() { return this.childType ? this.childType.datasource : undefined; }

  getSearchVariables() {
    if (!this.idx || !this.parent)
      return "";
    return {id: this.parent.selected.key};
  }
}
