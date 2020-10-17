import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';

const AdminCrews = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.crews}>
    </AdminTopLayout>
  );
};
export default AdminCrews;
