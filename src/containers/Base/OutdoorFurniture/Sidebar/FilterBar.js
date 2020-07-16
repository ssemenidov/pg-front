import React from "react";import styled from 'styled-components'import TextField from '@material-ui/core/TextField';import MenuItem from '@material-ui/core/MenuItem';import cities from "../../../../feed/cities";import {makeStyles} from '@material-ui/core/styles';import icon_globe from "../../../../img/outdoor_furniture/filter_icons/bx-globe.svg"import icon_envelope from "../../../../img/outdoor_furniture/filter_icons/bx-envelope.svg"import icon_directions from "../../../../img/outdoor_furniture/filter_icons/bx-directions.svg"import icon_anchor from "../../../../img/outdoor_furniture/filter_icons/bx-ancor.svg"import clsx from 'clsx';import InputAdornment from '@material-ui/core/InputAdornment';import FormControlLabel from "@material-ui/core/FormControlLabel";import Checkbox from "@material-ui/core/Checkbox";const useStyles = makeStyles(() => ({    root: {        '& .MuiSelect-selectMenu': {            // width: 160,            height: 40,            display: 'flex',            justifyContent: 'center',            alignItems: 'center',            background: "#FFFFFF",            padding: 0,            margin: 0        },        '& .MuiInputBase-input': {            width: 200,            height: 40,            margin: 0,            display: 'flex',            justifyContent: 'center',            alignItems: 'center',            background: "#FFFFFF",            padding: 0,        },        '& .MuiFormControlLabel-label':{            fontSize: '14px',        },        '& .MuiOutlinedInput-adornedStart':{            backgroundColor: "#FFFFFF",        }    },    textField: {        // width: '25ch',    },}));const FilterMenu = styled.div`        width: 302px;        height: 1080px;`;const FilterText = styled.h6`        //font-family: SFUIDisplay;        font-size: 14px;        line-height: 16px;        text-transform: uppercase;        color: #003360;        margin: 26px;`;const SearchTitle = styled.div`        width: 100%;        height: 38px;`;const Form = styled.form`        width: 100%;        height: 1000px;        text-align: center;`;const FilterSection = styled.div`        border-top: 1px solid #D3DFF0;        padding-top: 20px;`;const FilterSectionTitle = styled.div`        padding-left: 32px;        margin-bottom: 20px;`;const FilterSectionTitleText = styled.div`        font-size: 14px;        text-align: left;        color: #171717`;const Checks = styled.div`        width: 100%;        display: flex;        flex-direction: column;        padding-left: 20px;`;const BtnGroup = styled.div`      width: 100%;      padding: 20px;      display: flex;      justify-content: space-between;      border-top: 1px solid #D3DFF0;`;const ResetBtn = styled.button`        width: 118px;        height: 40px;        background: #EEF3FF;        border: 1px solid #2C5DE5;        border-radius: 4px;        //font-family: SFUIDisplay;        font-size: 14px;        line-height: 14px;        text-align: center;        color: #2C5DE5;`;const SubmitBtn = styled.button`        width: 98px;        height: 40px;        background: #2C5DE5;        border: 1px solid #2C5DE5;        border-radius: 4px;         //font-family: SFUIDisplay;        font-size: 14px;        line-height: 14px;        text-align: center;        color: #FFFFFF;`;const FilterBar = () => {    const classes = useStyles();    const [city, setCity] = React.useState('Almaty');    const handleChangeSelect = (e) => {        setCity(e.target.value);    };    const [state, setState] = React.useState({        checkedA: true,        checkedB: true,        checkedF: true,    });    const handleChangeCheck = (e) => {        setState({ ...state, [e.target.name]: e.target.checked });    };    return (        <FilterMenu>            <SearchTitle>                <FilterText>                    Поиск                </FilterText>            </SearchTitle>            <Form noValidate autoComplete="off"                  className={classes.root}            >                <FilterSection>                    <FilterSectionTitle>                        <FilterSectionTitleText>                            Поиск по местоположению                        </FilterSectionTitleText>                    </FilterSectionTitle>                    <TextField                        id="outlined"                        select                        label="Выберите город"                        value={city}                        onChange={handleChangeSelect}                        variant="outlined"                        style={{marginBottom: 16}}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_globe} alt=""/>                            </InputAdornment>                        }}                    >                        {cities.map((option) => (                            <MenuItem key={option.value} value={option.value}>                                {option.value}                            </MenuItem>                        ))}                    </TextField>                    <TextField                        id="outlined"                        select                        label="Выберите район"                        value={city}                        onChange={handleChangeSelect}                        variant="outlined"                        style={{marginBottom: 20}}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_directions} alt=""/>                            </InputAdornment>                        }}                    >                        {cities.map((option) => (                            <MenuItem key={option.value} value={option.value}>                                {option.value}                            </MenuItem>                        ))}                    </TextField>                    <TextField                        id="outlined"                        label="Почтовый индекс"                        select                        placeholder={"Выберите город"}                        value={city}                        onChange={handleChangeSelect}                        variant="outlined"                        style={{marginBottom: 20}}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_envelope} alt=""/>                            </InputAdornment>                        }}                    >                        {cities.map((option) => (                            <MenuItem key={option.value} value={option.value}>                                {option.value}                            </MenuItem>                        ))}                    </TextField>                </FilterSection>                <FilterSection>                    <FilterSectionTitle>                        <FilterSectionTitleText>                            Поиск по адресу                        </FilterSectionTitleText>                    </FilterSectionTitle>                    <TextField                        id="outlined-search"                        type="search"                        label="Адрес маркетинговый"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <TextField                        id="outlined-search"                        type="search"                        label="Адрес юридический"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                </FilterSection>                <FilterSection>                    <FilterSectionTitle>                        <FilterSectionTitleText>                            Поиск по параметрам                        </FilterSectionTitleText>                    </FilterSectionTitle>                    <TextField                        id="outlined-search"                        type="search"                        label="Код конструкции"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <TextField                        id="outlined-search"                        type="search"                        label="Инвентарный номер 1С"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <TextField                        id="outlined-search"                        type="search"                        label="Формат"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <TextField                        id="outlined-search"                        type="search"                        label="Горит/Не горит"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <TextField                        id="outlined-search"                        type="search"                        label="Координаты"                        defaultValue=""                        variant="outlined"                        style={{marginBottom: 20}}                        className={clsx(classes.margin, classes.textField)}                        InputProps={{                            startAdornment: <InputAdornment position="start">                                <img src={icon_anchor} alt=""/>                            </InputAdornment>                        }}                    />                    <Checks>                        <FormControlLabel                            control={                                <Checkbox                                    checked={state.checkedA}                                    onChange={handleChangeCheck}                                    name="checkedA"                                    color="primary"                                    size="small"                                />                            }                            label="Демонтированная конструкция"                        />                        <FormControlLabel                            control={                                <Checkbox                                    checked={state.checkedB}                                    onChange={handleChangeCheck}                                    name="checkedB"                                    color="primary"                                    size="small"                                />                            }                            label="Доступная конструкция"                        />                        <FormControlLabel                            control={                                <Checkbox                                    checked={state.checkedF}                                    onChange={handleChangeCheck}                                    name="checkedF"                                    color="primary"                                    size="small"                                />                            }                            label="Наличие помехи"                        />                    </Checks>                    <BtnGroup>                        <ResetBtn>                            Очистить                        </ResetBtn>                        <SubmitBtn>                            Искать                        </SubmitBtn>                    </BtnGroup>                </FilterSection>            </Form>        </FilterMenu>    )}export default FilterBar