import React, { useContext } from 'react';
import { partnerContext } from '../../../../../../containers/Base/Partner/Partner';

import { StyledButton, StyledSelect , StyledInput} from '../../../../../../styles/styles';
import { RedDeleteBtn } from '../../../../../Styles/ButtonStyles';
import { InputTitle } from '../../../../../Styles/StyledBlocks';
import { Row } from '../../../../../Styles/StyledBlocks';
import red_can from '../../../../../../img/outdoor_furniture/red_can.svg';
import styled from 'styled-components';
import anchorIcon from '../../../../../../img/input/anchor.svg';

const InputWrapper = styled.div`
  width: 30%;
`;

export default function ExtraRow(props) {
  const [item, setItem] = useContext(partnerContext);
  return (
    <Row style={{ justifyContent: 'spaceBetween', padding: '0 7px 0 0' }}>
      <InputWrapper>
        <InputTitle>ФИО</InputTitle>
        <StyledInput
              prefix={<img src={anchorIcon} />}
              ></StyledInput>
        {/* <InputAnchor
          value={props.state ? props.state.fullname : ''}
          onChange={(e) => {
            dispatch(
              props.sendContragentValues('phoneContact', [
                ...state.phoneContact.map((contact) => {
                  if (contact._id === props.state._id) {
                    return { ...contact, fullname: e.target.value };
                  } else {
                    return contact;
                  }
                }),
              ])
            );
          }}
          placeholder="ФИО"
        /> */}
      </InputWrapper>
      <InputWrapper>
        <InputTitle>Телефон</InputTitle>
        <StyledInput
              prefix={<img src={anchorIcon} />}
              ></StyledInput>
        {/* <InputAnchor
          value={props.state ? props.state.phone : ''}
          onChange={(e) => {
            dispatch(
              props.sendContragentValues('phoneContact', [
                ...state.phoneContact.map((contact) => {
                  if (contact._id === props.state._id) {
                    return { ...contact, phone: e.target.value };
                  } else {
                    return contact;
                  }
                }),
              ])
            );
          }}
          placeholder="Телефон"
        /> */}
      </InputWrapper>

      <InputWrapper>
        <InputTitle>E-mail</InputTitle>
        <StyledInput
              prefix={<img src={anchorIcon} />}
              ></StyledInput>
        {/* <InputAnchor
          value={props.state ? props.state.email : ''}
          onChange={(e) => {
            dispatch(
              props.sendContragentValues('phoneContact', [
                ...state.phoneContact.map((contact) => {
                  if (contact._id === props.state._id) {
                    return { ...contact, email: e.target.value };
                  } else {
                    return contact;
                  }
                }),
              ])
            );
          }}
          placeholder="E-mail"
        /> */}
      </InputWrapper>
      <RedDeleteBtn onClick={props.removeClickHandler}>
        <img src={red_can} alt="" />
      </RedDeleteBtn>
    </Row>
  );
}
