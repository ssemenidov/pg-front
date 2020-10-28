import React, { useContext } from 'react';
import { partnerContext } from '../../../../../../containers/Base/Partner/Partner';
import { useQuery, gql, useMutation } from '@apollo/client';

import { StyledButton, StyledSelect , StyledInput} from '../../../../../Styles/DesignList/styles';
import { RedDeleteBtn } from '../../../../../Styles/ButtonStyles';
import { InputTitle } from '../../../../../Styles/StyledBlocks';
import { Row } from '../../../../../Styles/StyledBlocks';
import red_can from '../../../../../../img/outdoor_furniture/red_can.svg';
import styled from 'styled-components';
import anchorIcon from '../../../../../../img/input/anchor.svg';

const InputWrapper = styled.div`
  width: 30%;
`;
const CONTACT_DELETE = gql`
  mutation Delete($id: ID!) {
    deleteContactPerson(id: $id) {
      deletedId
    }
  }
`;
export default function ExtraRow(props) {
  const [item, setItem] = useContext(partnerContext);
  const contact=item.contactPerson.edges[props.index].node;
  const [deleteContactPerson] = useMutation(CONTACT_DELETE);
  const deleteContact=()=>{
    deleteContactPerson({variables:{id:contact.id}})
  }
  return (
    <Row>
    <InputWrapper>
      <InputTitle>ФИО</InputTitle>

      <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={contact.name ? contact.name : ''}
            onChange={(e) => setItem({ ...item, name: e.target.value })}></StyledInput>
    </InputWrapper>
    <InputWrapper>
      <InputTitle>Телефон</InputTitle>

      <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={contact.phone ? contact.phone : ''}
            onChange={(e) => setItem({ ...item, phone: e.target.value })}></StyledInput>
    </InputWrapper>
    <InputWrapper>
      <InputTitle>E-mail </InputTitle>

      <StyledInput
            prefix={<img src={anchorIcon} />}
            defaultValue={contact.email ? contact.email : ''}
            onChange={(e) => setItem({ ...item, email: e.target.value })}></StyledInput>
    </InputWrapper>

    <RedDeleteBtn onClick={deleteContact}>
      <img src={red_can} alt="" />
    </RedDeleteBtn>
  </Row>
  );
}
