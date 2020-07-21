import React from "react";import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";import {Collapse, TextField} from "@material-ui/core";import InputAdornment from "@material-ui/core/InputAdornment";import {FilterSectionTitle, FilterSection, FilterSectionTitleText} from "../Styles/UseStyledFilters"import clsx from "clsx";import icon_anchor from "../../../../../../img/outdoor_furniture/filter_icons/bx-ancor.svg";import useStyles from "../Styles/UseMaterialStyles"export default function FilterByAddress() {    const classes = useStyles();    const [open, setOpen] = React.useState(true);    const handleClick = () => {        setOpen(!open);        console.log("click")    };    return (        <FilterSection>            <FilterSectionTitle                onClick={handleClick}            >                <FilterSectionTitleText>                    Поиск по адресу                </FilterSectionTitleText>                {open && < ArrowDropUp/>}                {!open && <ArrowDropDown/>}            </FilterSectionTitle>            <Collapse in={open} >                <TextField                    id="outlined-search"                    type="search"                    placeholder="Адрес маркетинговый"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />                <TextField                    id="outlined-search"                    type="search"                    placeholder="Адрес юридический"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />            </Collapse>        </FilterSection>    )}