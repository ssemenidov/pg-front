export const changeColumns = (
  dataIndex, columnsForPopup,
  setColumnsForPopup, setColumnsTable
) => {
  let localColumnsForPopup = columnsForPopup.map(col => {
    if(col.children) {
      col.children = col.children.map(item => {
        if(item.dataIndex  && item.dataIndex === dataIndex) {
          item.isShowed = !item.isShowed;
        }
        return item
      });
    }
    if(col.dataIndex && col.dataIndex === dataIndex) {
      col.isShowed = !col.isShowed;
    }
    return col
  })

  setColumnsForPopup(localColumnsForPopup);

  const newColumnTables = localColumnsForPopup.filter(item => {
    if(item.children && item.children.length) {
      item.children = item.children.filter(el => {
        if(el.isShowed) {
          return el
        }
      });

      return item;
    }
    if(item.isShowed) {
      return item
    }
    if(item.dataIndex === 'btn-remove') {
      return item
    }
  });

  console.log('newColumnTables ', newColumnTables)
  setColumnsTable(newColumnTables);
};
