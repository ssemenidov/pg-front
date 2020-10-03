import React from 'react';
import { useQuery, gql } from '@apollo/client';
const OUTDOOR_T = gql`
  {
    searchConstruction {
      edges {
        node {
          backCity {
            title
          }
        }
      }
    }
  }
`;
function data() {
  const { loading, error, data } = useQuery(OUTDOOR_T);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return JSON.stringify(data);
}

export default data;
