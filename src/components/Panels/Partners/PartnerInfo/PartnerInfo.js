import React from 'react';
import GeneralInfo from './Blocks/GeneralInfo';
import Address from './Blocks/Address';
import useStyles from '../../../Styles/UseInputMaterialStyles';
import { Container } from '../../../Styles/StyledBlocks';
import { BlockWrapper } from '../../../Styles/StyledBlocks';
import BankAccount from './Blocks/BankAccount';
import ContactPerson from './Blocks/ContactPerson';
import Commissions from './Blocks/Commissions';
import { Col, Grid, Row } from 'react-flexbox-grid';

const PartnerInfo = () => {
  // const classes = useStyles();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap',marginBottom:"20px" }}>
    <div style={{ flex: '1 0 45%', margin: '1vw 1vw 1vw 0' }}>
    <GeneralInfo />
    </div>
    <div style={{ flex: '1 0 22%', margin: '1vw 1vw 1vw 1vw' }}>
    <Address />
    </div>
    <div style={{ flex: '1 0 22%', margin: '1vw 0 1vw 1vw' }}>
    <BankAccount />
    </div>
    <div style={{ flex: '0 1 100%', margin: '1vw 0 1vw 0' }}>
    <ContactPerson />
    </div>
    <div style={{ flex: '0 1 100%', margin: '1vw 0 1vw 0' }}>
    <Commissions />
    </div>
  </div>
   

  );
};

export default PartnerInfo;
