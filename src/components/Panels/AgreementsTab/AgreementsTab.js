import React,{useContext, useState,createContext} from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';

import AgreementsSearch from './AgreementsSearch';
import AgreementsPanel from './AgreementsPanel';
import Table from '../../../components/Tablea';
export const agreementsContext  = createContext();
const AgreementsTab = () => {
  const [filter, setFilter] = useState({});

  return (
    <agreementsContext.Provider value={[filter,setFilter]}>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>

      <AgreementsSearch />
   

      </div>
      <div style={{ width: '100%', overflowX: 'hidden' }}>
        <div style={{ width: '100%' }}>
        <AgreementsPanel></AgreementsPanel>
        </div>
      </div>
    </div>
    </agreementsContext.Provider>
  );
};

export default AgreementsTab;
