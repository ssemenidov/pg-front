

export const column = (title, dataIndex, width, isShowed=true, sorter=true) => {
  let result = {
    title: title,
    key: dataIndex,
    dataIndex: dataIndex,
    width: width,
    className: (isShowed ? 'show' : 'hide'),
    isShowed: isShowed,
  }
  if (sorter) {
    result.sorter = {
      compare: (a, b) => (a[dataIndex] && a[dataIndex].localeCompare(b[dataIndex])) || -1,
      multiple: 1,
    }
  }
  return result
};

export const null2str = (item) => item ? item : '';
export const null2strKey = (item, key) => item ? null2str(item[key]) : '';
export const null2bool = (item) => item ? item : false;
