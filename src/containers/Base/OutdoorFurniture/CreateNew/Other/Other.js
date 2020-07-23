import React from "react";import {BlockWrapper, Container} from "../Components/Blocks/Styles/StyledBlocks";import TechParams from "../Components/Blocks/TechParams";import useStyles from "../Components/Blocks/Styles/UseMaterialStyles"import OtherParams from "../Components/Blocks/OtherParams";import MapBlock from "../Components/Blocks/MapBlock"import ContactMap from "../Components/Blocks/MapBlock";export default function Other() {    const classes = useStyles();    return (        <Container className={classes.root}>            <BlockWrapper>                <OtherParams/>                <ContactMap/>            </BlockWrapper>        </Container>    )}