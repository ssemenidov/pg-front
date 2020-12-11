import React, { useContext, useState} from 'react';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';

import { gql, useMutation } from '@apollo/client';

import { BlockBody, BlockTitle, BlockTitleText, Large, Row } from '../../../../Styles/StyledBlocks';
import { BtnSuccess } from '../../../../Styles/ButtonStyles';
import ExtraRow from './Extras/ExtraRow';
const CONTACT_CREATE = gql`
  mutation CreateContactPerson($input: CreateContactPersonInput!) {
    createContactPerson(input: $input) {
      contactPerson {
        id
      }
    }
  }
`;
export default function ContactPerson() {
  const [item, setItem] = useContext(partnerContext);
  const [clear, setClear] = useState(false);
  const [createContactPerson, { data }] = useMutation(CONTACT_CREATE);
  const create = (e) => {
    createContactPerson({
      variables: {
        input: {
          partner: item.id,
          name: item.name || '',
          phone: item.phone || '',
          email: item.email || '',
        },
      },
    }).then(() => {
      setItem({
        ...item,
        refetch: true,
      });
      setClear(true)
    });
  };

  return (
    <Large>
      <BlockTitle style={{ padding: '10px 26px 15px 24px' }}>
        <BlockTitleText>Контактное лицо</BlockTitleText>
        <BtnSuccess onClick={create}>Добавить еще</BtnSuccess>
      </BlockTitle>
      <BlockBody>
        <ExtraRow delete={false} />
        {item.contactPersons && item.contactPersons.edges.length
          ? item.contactPersons.edges.map((side, index) => {
              return (
                <div key={index}>
                  <ExtraRow index={index} delete={true} />
                </div>
              );
            })
          : null}
      </BlockBody>
    </Large>
  );
}
