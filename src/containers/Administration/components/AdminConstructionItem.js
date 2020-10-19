import React, { useState } from 'react';
import clsx from 'clsx'
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import { BlockBody, Medium, Row, Column, BlockTitle } from '../../../components/Styles/StyledBlocks';
import { makeStyles } from '@material-ui/core/styles';
import { StyledButton } from '../../../styles/styles';
import { colorAccent, colorAccent2, colorWhite, borderColor, colorRadiobuttonSelected } from '../Style/Styles';
import { StyledPen, TrashSearchSpacer, RadioLabel, PenSearchSpacer } from '../components/Styled'

import icon_anchor from '../../../img/partners/bx-search-alt.svg';
import icon_pen from '../../../img/administration/edit-icon-transparent.svg';
import icon_trash from '../../../img/administration/red_can.svg';

import '../Style/style.css'

const StyledInputAdornment = styled(InputAdornment)`
  font-size: .9em;
  font-weight: 500;
  color: ${colorAccent}
`;

const StyledTextField = styled(TextField)`
  & input {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }
`;

function SearchInputField(props) {
  return (
    <StyledTextField
      style={{ width: '100%', background: 'white', marginTop: '1.5rem', ...props.style }}
      fullWidth
      id={props.id}
      type={props.type}
      placeholder="Быстрый поиск"
      value={props.value}
      variant="outlined"
      required
      name={props.name}
      onChange={props.onChange}
      InputProps={{
        style: { fontSize: '.9rem', paddingTop: 0 },
        startAdornment: (
          <InputAdornment position="start">
            <img src={icon_anchor} alt="" />
          </InputAdornment>
        ),
        endAdornment: (
          <StyledInputAdornment position="end">
            <span>Найти</span>
          </StyledInputAdornment>
        ),
      }}
    />
  );
}



const useStylesRadio = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: colorAccent, // '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
function StyledRadio(props) {
  const classes = useStylesRadio();

  return (
    <Radio
      checked={props.checked}
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
      onChange={props.onChange}
    />
  );
}

function EditableLabel(props) {
  return <div style={{width: "100%", display: "flex", flexFlow: "row wrap"}}>
    <RadioLabel>{props.name}</RadioLabel>
    <div style={{marginLeft: "auto"}}></div>
    <PenSearchSpacer />
    <Link to={`/base/partners/partner/`}>
      <StyledPen src={icon_pen} alt="" />
    </Link>
    <TrashSearchSpacer />
    <Link to={`/base/partners/partner/`}>
      <img className="EditTrashStyle" src={icon_trash} alt="" />
    </Link>
  </div>;
}

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-multiline': {
      height: 123,
      width: '100%',
    },
  },
}));

const formStyles = {
  backgroundColor: colorWhite,
  // padding: ".5rem 0 .1rem 1rem",
  padding: "0",
  border: "1px solid",
  borderColor: borderColor,
  borderRadius: "8px",
  margin: "1rem 0",
  overflowY: "scroll",
  maxHeight: "16rem"
};

const controlStyles = {
  borderBottom: "1px solid",
  borderBottomColor: borderColor,
  padding: ".5rem 1rem .5rem .5rem",
  margin: "0",
};

const controlStylesLast = {
  margin: "0",
  padding: ".5rem 1rem .5rem .5rem",
};

function Loading(props) {
  return <h3></h3>
}

function Error(props) {
  return <p>Error :(</p>
}

const StyledBlockTitle = styled(BlockTitle)`
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;


const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    width: 100%;
  }
  // background-color: ${props => props.isSelected ? colorRadiobuttonSelected : undefined}
`;

function AdminConstructionItemComponent({title, className, values}) {
  const classes = useStyles();
  let [stateSelectedIdx, setStateSelectedIdx] = useState(-1);

  const lastIdx = values.length - 1;

  let onChangeRadio = (event) => {
    setStateSelectedIdx(parseInt(event.target.value));
  };

  let setBackground = ((isSelected, style) => {
    return isSelected ? { ...style, backgroundColor: colorRadiobuttonSelected } : style;
  });

  return (
    <Medium style={{ height: '100%' }} className={className}>
      <StyledBlockTitle>
        {title}
        <StyledButton backgroundColor={colorAccent2}>
          Добавить
        </StyledButton>
      </StyledBlockTitle>
      <BlockBody>
        <SearchInputField name="Быстрый поиск"></SearchInputField>
        <form action="" className={classes.root} style={formStyles}>
          <RadioGroup name="customized-radios">
            {values.map((val, idx) => <StyledFormControlLabel
              value={idx}
              key={idx}
              style={setBackground(idx === stateSelectedIdx, idx === lastIdx ? controlStylesLast : controlStyles)}
              // isSelected = {idx === stateSelectedIdx}
              control={<StyledRadio onChange={onChangeRadio} checked={idx === stateSelectedIdx}/>}
              label={<EditableLabel name={val.name} />}
            />)

            }
          </RadioGroup>
        </form>
      </BlockBody>
    </Medium>
  );
}

function AdminConstructionItemDatasource(props) {
  let searchValue = ""
  let [values, isReactComponent] = props.datasource.query(searchValue);

  if (isReactComponent)
    return values;

  return <AdminConstructionItemComponent values={values} {...props} />;
}


export function AdminConstructionItem(props) {
  if (props.datasource.queryIsEmpty())
    return <AdminConstructionItemComponent values={props.datasource.stubData} {...props} />
  else
    return <AdminConstructionItemDatasource {...props} />
}

