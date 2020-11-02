export const stubDataBrands = (item) => ({
  key: item.node.id,
  brand: item.node.brand && item.node.brand,
  partner: item.node.partner ? item.node.partner:'',
  workingSector: item.node.workingSector && item.node.workingSector
});
