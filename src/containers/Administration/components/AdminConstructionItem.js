import React, { useState } from 'react';
import clsx from 'clsx'
import InputAnchor from '../../../components/Inputs/InputAnchor';
import Multiline from '../../../components/Inputs/Multiline';
import SelectAnchor from '../../../components/Inputs/SelectAnchor';
import { BlockBody, Medium, Row, Column, BlockTitle, InputTitle } from '../../../components/Styles/StyledBlocks';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { StyledButton } from '../../../styles/styles';
import { colorAccent, colorAccent2, colorWhite, borderColor } from '../Style/Styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
// import { sendContragentValues } from '../../../../../store/actions/actions';

import '../Style/style.css'
import { TextField, RadioGroup, FormControlLabel, Radio, withStyles } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import icon_anchor from '../../../img/partners/bx-search-alt.svg';
import icon_pen from '../../../img/administration/edit-icon-transparent.svg';
import icon_trash from '../../../img/administration/red_can.svg';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';


function SearchInputField(props) {
  return (
    <TextField
      className="admin-search-input"
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
          <InputAdornment position="end" className="admin-search-input-search-text" style={{color: colorAccent}}>
            <span>Найти</span>
          </InputAdornment>
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
    <div className="RadioLabel">{props.name}</div>
    <div style={{marginLeft: "auto"}}></div>
    <div className="PenSearchSpacer"></div>
    <Link to={`/base/partners/partner/`}>
      <img className="EditPenStyle" src={icon_pen} alt="" />
    </Link>
    <div className="TrashSearchSpacer"></div>
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


export class GqlDatasource {
  constructor(dataQuery, methodName, stubData = [], selector = "title") {
    this.query = dataQuery;
    this.selector = (data) => data[methodName].edges.map(item => ({ key: item.node.id, name: item.node[selector] }));
    this.filter = (value) => ({ [selector]: value });
    this.enableStubs = true;
    this.stubData = stubData;
  }
}


function AdminConstructionItemComponent({title, className, values}) {
  const classes = useStyles();
  let [stateSelectedIdx, setStateSelectedIdx] = useState(-1);

  const lastIdx = values.length - 1;

  let onChangeRadio = (event) => {
    setStateSelectedIdx(parseInt(event.target.value));
  };

  return (
    <Medium style={{ height: '100%' }} className={className}>
      <BlockTitle className="admin-construction-item-header">{title}
        <StyledButton backgroundColor={colorAccent2}>
          Добавить
        </StyledButton>
      </BlockTitle>
      <BlockBody>
        <SearchInputField name="Быстрый поиск"></SearchInputField>
        <form action="" className={classes.root} style={formStyles}>
          <RadioGroup name="customized-radios">
            {values.map((val, idx) => <FormControlLabel
              value={idx}
              key={idx}
              style={idx === lastIdx ? controlStylesLast : controlStyles }
              className={idx === stateSelectedIdx ? "admin-search-form-control admin-search-form-control-selected"
                : "admin-search-form-control"}
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
  let datasource = props.datasource;
  let searchValue = ""
  let values;

  const { loading, error, data } = useQuery(datasource.query, { variables: datasource.filter(searchValue) });
  if (error) {
    if (!datasource.enableStubs)
      return <Error/>;
    else
      values = datasource.stubData;
  } else {
    if (loading)
      return <Loading/>;
    values = data ? datasource.selector(data) : [];
  }

  return <AdminConstructionItemComponent values={values} {...props} />;
}


export function AdminConstructionItem(props) {
  if (props.datasource.query === null)
    return <AdminConstructionItemComponent values={props.datasource.stubData} {...props} />
  else
    return <AdminConstructionItemDatasource {...props} />
}
