import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NewAndAllBlockInput from "./NewAndAllBlockInput/NewAndAllBlockInput";
import TableContent from "./TableContent/TableContent";
import RelatedBrands from "./RelatedBrands/RelatedBrands";
import RelatedAdvertisers from "./relatedAdvertisers/relatedAdvertisers";
import {PostInfoInput} from "../../../../store/action";
import {connect} from "react-redux";
import "./PartnerEdit.css"
import SearchBar from "../../OutdoorFurniture/Sidebar/Search/SearchBar";
import styled from "styled-components";



function TabPanel(props) {
    const {children, value, index} = props;

    return (
        <div>
            <div
                id={`simple-tabpanel-${index}`}
                // aria-labelledby={`simple-tab-${index}`}
            >
                {value === index && (
                    <Box p={2} style={{width: "100%"}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
    };
}

const SimpleTabs = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue)
        return {
            class: "active",
        }

    };
    let fastSearch =
        <span className="input_fast_search" id="input_fast_search">
            <input type="text" placeholder="Быстрый поиск" className="fast_search"/>
            <a href="/#" className="input_fast_search_button">Найти</a>
        </span>
    let tieBrand = <button className="brand" id="brand">Привязать бренд</button>
    const PageWrap = styled.div`
      display: flex;
`;

    return (
            <PageWrap>
                <SearchBar/>
                <div className="counterparty_Header">
                    <div className="counterparty_Header_logo">
                        <div style={{display: "flex", margin: "0", paddingTop: "5px"}}>
                                <span style={{
                                    width: "33px",
                                    height: "32px",
                                    borderRadius: "4px",
                                    background: "red"
                                }}>
                    <img src={require("../../../../img/outdoor_furniture/bx-book.svg")} alt=""
                         style={{width: "16px", margin: "8px"}}/>
                    </span>
                            <h1 className="logo_title_counterparty">Контрагенты</h1>
                        </div>
                        <div className="counterparty_Header_Buttons">
                            <button className="counterparty_Header_Button"
                                    onClick={() => props.postInfo(props.infoForm)}
                                    style={{padding: " 0 22px"}}>Сохранить
                            </button>
                            <button className="counterparty_Header_Button">Удалить</button>
                            <button className="counterparty_Header_Button">Создать договор</button>
                        </div>
                    </div>
                    <div className="search_counterparty">
                        <div className="tab">
                            <Tabs value={value} onChange={handleChange}>
                                <Tab className="tablinks" label="ОБЩАЯ ИНФОРМАЦИЯ " {...a11yProps(0)} />
                                <Tab className="tablinks" label="СВЯЗАННЫЕ ПРОЕКТЫ" {...a11yProps(1)} />
                                <Tab className="tablinks" label="СВЯЗАННЫЕ БРЕНДЫ" {...a11yProps(2)} />
                                <Tab className="tablinks" label="СВЯЗАННЫЕ РЕКЛАМОДАТЕЛИ" {...a11yProps(3)} />
                            </Tabs>
                        </div>
                        <span style={{display: "flex"}}>
                        {(value === 2) ? tieBrand : null}
                            {(value === 1) ? fastSearch : null}
                            <a href="/#" className="button_setting">
                            <img src={require("../../../../img/partners/print.png")} alt="" style={{padding: "8px"}}/>
                        </a>
                        <button className="export">Экспорт</button>
                        <a href="/#" className="button_setting">
                            <img src={require("../../../../img/partners/bx-cog.svg")} alt="" style={{padding: "8px"}}/>
                        </a>
                 </span>
                    </div>

                </div>
                <TabPanel value={value} index={0} className="search_counterparty">
                    <NewAndAllBlockInput/>
                </TabPanel>
                <TabPanel value={value} index={1} className="search_counterparty">
                    <TableContent/>
                </TabPanel>
                <TabPanel value={value} index={2} className="search_counterparty">
                    <RelatedBrands/>
                </TabPanel>
                <TabPanel value={value} index={3} className="search_counterparty">
                    <RelatedAdvertisers/>
                </TabPanel>
            </PageWrap>
    );
}

const mapStateToProps = state => {
    return {
        infoForm: state.table.infoForm
    }
}
const mapDispatchToProps = dispatch => {
    return {
        postInfo: (info) => dispatch(PostInfoInput(info))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleTabs)