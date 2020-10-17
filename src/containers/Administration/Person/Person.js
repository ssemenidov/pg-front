import React, { useState, useContext, createContext, useMemo } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

import PanelPerson from './PanelPersons'
import { adminRoutesMap } from '../Main/adminRoutes';
import '../Style/style.css'
import { AdminTopLayout } from '../AdminTopLayout/AdminTopLayout'


const Partners = () => {
  const history = useHistory();
  return (
    <AdminTopLayout activeRoute={adminRoutesMap.person} buttonName="Создать сотрудника">
      <PanelPerson style={{ flex: '0 1 auto' }} history={history} />
    </AdminTopLayout>
  );
};

export default Partners;
