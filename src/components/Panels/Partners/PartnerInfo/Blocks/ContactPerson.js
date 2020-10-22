import React, { useContext, useEffect, useMemo } from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import { useQuery, gql, useMutation } from '@apollo/client';

import { BlockBody, BlockTitle, BlockTitleText, Large, Row } from '../../../../Styles/StyledBlocks';
import { BtnSuccess } from '../../../../Styles/ButtonStyles';
import ExtraRow from './Extras/ExtraRow';
const CONTACT_CREATE = gql`
  mutation CreateContactPerson(
    $id: ID
  ){
    createContactPerson(input: {
      partner: $id
      name:""
      phone:""
      email:""
    }) {
      contactPerson {
        id
      }
    }
  }
`;
export default function ContactPerson() {
  const [item, setItem] = useContext(partnerContext);
  const [createContactPerson, { data }] = useMutation(CONTACT_CREATE);
  const create=(e)=>{
    createContactPerson({variables:item});
  }


  return (
    <Large>
      <BlockTitle style={{ padding: '10px 26px 15px 24px' }}>
        <BlockTitleText>Контактное лицо</BlockTitleText>
        <BtnSuccess onClick={create}>Добавить еще</BtnSuccess>
      </BlockTitle>
      <BlockBody>
      {item.contactPerson && item.contactPerson.edges.map((side,index) => {
          return (
            <div key={index}>
              <ExtraRow
              index={index}

              />
            </div>
          );
        })}
      </BlockBody>
    </Large>
  );
}
