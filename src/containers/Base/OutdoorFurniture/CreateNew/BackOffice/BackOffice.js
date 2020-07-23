import React from "react";import "date-fns";import DetailsBlock from "../Components/Blocks/DetailsBlock"import IntroBlock from "../Components/Blocks/IntroBlock"import SizesBlock from "../Components/Blocks/SizesBlock"import useStyles from "../Components/Blocks/Styles/UseMaterialStyles"import {Container, BlockWrapper} from "../Components/Blocks/Styles/StyledBlocks"export default function BackOffice() {    const classes = useStyles();    return (        <Container className={classes.root}>            <BlockWrapper>                <IntroBlock/>                <DetailsBlock/>            </BlockWrapper>            <SizesBlock/>        </Container>    )}