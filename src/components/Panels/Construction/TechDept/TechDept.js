import React from 'react';
import Tech from './Blocks/Tech';
import TechParams from './Blocks/TechParams';
import useStyles from '../../../Styles/UseInputMaterialStyles';
import { Container, BlockWrapper } from '../../../Styles/StyledBlocks';
import { Col, Grid, Row } from 'react-flexbox-grid';

export default function TechDept() {
  const classes = useStyles();
  return (
    <Grid fluid className=" resetPadding ">
      <Row xs={12} className=" resetPadding">
        <Col xs={6}>
          <Tech />
        </Col>
        <Col xs={6}>
          <TechParams />
        </Col>
      </Row>
    </Grid>
  );
}
