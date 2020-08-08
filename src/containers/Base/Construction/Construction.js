import React from "react";
import {PageWrap, ContentWrap} from "../../../components/Styles/ComponentsStyles";
import InnerForm from "./TabPanelForm/TabPanelFormConstruction";
import SearchButton from "../../../components/ButtonGroup/SearchButton";
import LeftBar from "../../../components/LeftBar/LeftBar";
import {Col, Grid, Row} from "react-flexbox-grid";
import SearchBtn from "../Partners/LeftBar/SearchBtn";


export default function Construction() {

    const [showSearchBtn, setSearchBtn] = React.useState(false)

    const handleTabSelected = (index) => {
        if (index === 4) {
            setSearchBtn(true)
        } else setSearchBtn(false)

    }

    return (
        <Grid fluid className="resetPadding">
            <Row className="resetPadding">
                <Col>
                    <LeftBar>
                        {showSearchBtn ?
                            <Col xs={1} className="contentInfo resetPadding">
                                <SearchBtn/>
                            </Col>
                            : null}
                    </LeftBar>

                </Col>
                <Col xs={11} className="resetPadding  marginLeft10">
                    {/*<ContentWrap>*/}
                    <InnerForm
                        selectedTab={handleTabSelected}
                    />
                    {/*</ContentWrap>*/}
                </Col>
            </Row>
        </Grid>
    );
}

