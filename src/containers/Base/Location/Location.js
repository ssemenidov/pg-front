import React, { useEffect, useState,createContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import InnerForm from './TabPanel/TabPanelLocation';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import { LeftBar } from '../../../styles/styles';

export const locationContext = createContext();
const Location = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [item, setItem] = useState({state:"state"});
  const CONSTRUCT_ITEM = gql`
  query SearchConstruction($id: ID!) {
    searchConstruction(id: $id) {
      edges {
        node {
          id
          backCity {
            title
            id
          }
          backDistrict {
            title
          }
          backPostcode
          backOwner
          backMarketingAddress
          backCreatedAt
          backComment
          backFamilyConstruction
          backUnderFamilyConstruction
          backAvailabilityConstruction
          backModelConstruction
          backHasArea
          otherImg

          location {
            city {
              title
            }
            coordinate
            cadastralNumber
            areaActDate
          }
        }
      }
    }
  }
`;

// const { error, data, loading } = useQuery(CONSTRUCT_ITEM, { variables: { id: id } });

// useMemo(() => {
//   if (data) {
//     setItem(data.searchConstruction.edges[0].node);
//   }
// }, [data]);
// console.log(item);
// if (error) return <h3>Error :(</h3>;
// if (loading) return <h3></h3>;

  console.log(id);

  const handleTabSelected = (index) => {
 
  };

  return (
    <locationContext.Provider value={ id }>
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
