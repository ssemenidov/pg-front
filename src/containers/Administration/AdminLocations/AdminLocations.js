import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';

const AdminLocations = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.locations}>
    </AdminTopLayout>
  );
};

export default AdminLocations;
