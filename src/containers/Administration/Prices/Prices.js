import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout';
import { adminRoutesMap } from '../Main/adminRoutes';
import React from 'react';

const Prices = () => {
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.prices} buttonName="Сохранить изменения">
    </AdminTopLayout>
  );
};
export default Prices;
