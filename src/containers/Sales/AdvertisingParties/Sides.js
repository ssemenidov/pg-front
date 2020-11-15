import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { StyledSelect } from '../../../components/Styles/StyledFilters';
import { Select } from 'antd';
const { Option } = Select;



const SEARCHSIDE = gql`
  query searchSide($id: ID, $format: ID) {
    searchSide(format_Model_Underfamily_Family_Id: $id, format_Id: $format) {
        edges {
          node {
            id,
            title
          }
        }
      }

  }
`;


export default ({ id, format, onSelect }) => {
    const { loading, error, data } = useQuery(SEARCHSIDE, {variables: { id, format }})

    if (loading) return null;
    if (error) return `Error! ${error}`;
  
      const district = data ? data.searchSide.edges : null;
    return district ? ( 
      <StyledSelect defaultValue="Сторона конструкции" size={'large'} onChange={e => onSelect(e)}>
        {district.map(x => 
          <Option key={x.node.id} value={x.node.id}>{x.node.title}</Option>   
        )} :
      </StyledSelect>
    ): <StyledSelect defaultValue="Сторона конструкции" size={'large'}></StyledSelect>
  }