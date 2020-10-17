import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';
import AdminConstructionItem from './ConstructionItem';

const OutdoorFurniture = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.outdoor_furniture}>
      <AdminConstructionItem title="Семейство"></AdminConstructionItem>
    </AdminTopLayout>
  );
};

export default OutdoorFurniture;
