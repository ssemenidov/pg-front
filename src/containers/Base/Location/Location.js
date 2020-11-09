import React, { useState, createContext, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';

import InnerForm from './TabPanel/TabPanelLocation';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../components/Styles/DesignList/styles';

export const locationContext = createContext();
const Location = (props) => {
  const [ id ] = useState(props.match.params.id);
  const [ item, setItem ] = useState({});
  const LOCATION_ITEM = gql`
  query SearchLocation($id: ID!) {
    searchLocation(id: $id) {
      edges {
        node {
          id
      
      # city {
      #   title
      # }
      # district {
      #   title
      # }
      postcode {
        id
      }
      area
      marketingAddress {
        id
        address
      }
      coordinate
      cadastralNumber
      purposeLocation {
        id
        title
      }
      comment
      constructions {
        edges {
          node {
            id
          }
        }
      }
      rentContractNumber
    }
  }
}
}
`;

  const { error, data, loading } = useQuery( LOCATION_ITEM, { variables: { id: id } });

  useMemo(() => {
    if (data && data.searchLocation.edges.length) {
      setItem(data.searchLocation.edges[0].node);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <h3></h3>;

  return (
    <locationContext.Provider value={ [item, setItem] }>
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
      </LeftBar>
      <InnerForm   />
      <style>{`
        .left-bar {
          margin: 0 2vw 0 0;
        }
      `}</style>
    </div>
    </locationContext.Provider>
  );

};

export default Location;
