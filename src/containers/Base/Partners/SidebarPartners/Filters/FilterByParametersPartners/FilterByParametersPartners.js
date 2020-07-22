import React from "react";import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons";import {Collapse, MenuItem, TextField} from "@material-ui/core";import InputAdornment from "@material-ui/core/InputAdornment";import {FilterSectionTitle, FilterSection, FilterSectionTitleText} from "../Styles/UseStyledFilters"import clsx from "clsx";import icon_anchor from "../../../../../../img/outdoor_furniture/filter_icons/bx-ancor.svg";import useStyles from "../Styles/UseMaterialStyles"export default function FilterByParametersPartners() {    const classes = useStyles();    const [state, setState] = React.useState({        checkedA: true,        checkedB: true,        checkedF: true,    });    const [open, setOpen] = React.useState(true);    const handleChangeCheck = (e) => {        setState({...state, [e.target.name]: e.target.checked});    };    const handleClick = () => {        setOpen(!open);    };    return (        <FilterSection>            <FilterSectionTitle onClick={handleClick}>                <FilterSectionTitleText>                    Поиск по параметрам                </FilterSectionTitleText>                {open && < ArrowDropUp/>}                {!open && <ArrowDropDown/>}            </FilterSectionTitle>            <Collapse in={open}>                <TextField                    id="outlined-search"                    type="search"                    placeholder="Контрагент"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />                <TextField                    id="outlined-search"                    type="search"                    placeholder="Бренд"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />                <TextField                    id="outlined-search"                    type="search"                    placeholder="Руководитель"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />                <TextField                    id="outlined-search"                    type="search"                    placeholder="Сектор деятельности"                    defaultValue=""                    variant="outlined"                    style={{marginBottom: 20}}                    className={clsx(classes.margin, classes.textField)}                    InputProps={{                        startAdornment: <InputAdornment position="start">                            <img src={icon_anchor} alt=""/>                        </InputAdornment>                    }}                />                {/*<Checks>*/}                {/*    <FormControlLabel*/}                {/*        control={*/}                {/*            <Checkbox*/}                {/*                checked={state.checkedA}*/}                {/*                onChange={handleChangeCheck}*/}                {/*                name="checkedA"*/}                {/*                color="primary"*/}                {/*                size="small"*/}                {/*            />*/}                {/*        }*/}                {/*        label="Демонтированная конструкция"*/}                {/*    />*/}                {/*    <FormControlLabel*/}                {/*        control={*/}                {/*            <Checkbox*/}                {/*                checked={state.checkedB}*/}                {/*                onChange={handleChangeCheck}*/}                {/*                name="checkedB"*/}                {/*                color="primary"*/}                {/*                size="small"*/}                {/*            />*/}                {/*        }*/}                {/*        label="Доступная конструкция"*/}                {/*    />*/}                {/*    <FormControlLabel*/}                {/*        control={*/}                {/*            <Checkbox*/}                {/*                checked={state.checkedF}*/}                {/*                onChange={handleChangeCheck}*/}                {/*                name="checkedF"*/}                {/*                color="primary"*/}                {/*                size="small"*/}                {/*            />*/}                {/*        }*/}                {/*        label="Наличие помехи"*/}                {/*    />*/}                {/*</Checks>*/}            </Collapse>        </FilterSection>    )}