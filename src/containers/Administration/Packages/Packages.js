import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';

const Packages = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.packages}>

    </AdminTopLayout>
  );
};

export default Packages;
