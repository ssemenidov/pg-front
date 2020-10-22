import React, { useState, useEffect } from 'react';
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
import { StyledPen, TrashSearchSpacer, RadioLabel, PenSearchSpacer, StyledRadio } from '../components/Styled'
import useDebounce from '../components/useDebounce';

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

function SearchInputField({id, type, value, name, onChange, style}) {
  return (
    <StyledTextField
      style={{ width: '100%', background: 'white', marginTop: '1.5rem', ...style }}
      fullWidth
      id={id}
      type={type}
      placeholder="Быстрый поиск"
      value={value}
      variant="outlined"
      required
      name={name}
      onChange={onChange}
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

function handleEdit(event, value) {
  console.log(event);
  event.preventDefault();
}

function handleDelete(event, value) {
  console.log(event);
  event.preventDefault();
}

function EditableLabel({name, value, editHandler, deleteHandler}) {
  return (
    <div style={{width: "100%", display: "flex", flexFlow: "row wrap"}}>
      <RadioLabel>{name}</RadioLabel>
      <div style={{marginLeft: "auto"}}></div>
      <PenSearchSpacer />
      <StyledPen src={icon_pen} alt="" onClick={(event) => editHandler(event, value)}/>
      <TrashSearchSpacer />
      <img className="EditTrashStyle" src={icon_trash} alt="" onClick={(event) => deleteHandler(event, value)}/>
    </div>
  );
}


const StyledForm = styled.form`
  background-color: ${colorWhite};
  padding: 0;
  border: 1px solid ${borderColor};
  border-radius: 8px;
  margin: 1rem 0;
  overflow-y: scroll;
  max-height: 16rem;

  & .MuiOutlinedInput-multiline {
    // height: 123px;
    width: 100%;
  }
`;


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


const StyledBlockTitle = styled(BlockTitle)`
  margin: 0;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;


const StyledFormControlLabel = styled(FormControlLabel)`
  & .MuiFormControlLabel-label {
    width: 100%;
  }
`;


function filterValues(searchedTerm, values, key) {
  if (searchedTerm === "")
    return values;

  const rxp = new RegExp(searchedTerm, "i");

  let newFilteredValues = []
  for (let val of values) {
    if (val[key].search(rxp) >= 0) {
      newFilteredValues.push(val);
    }
  }
  return newFilteredValues;
}


function AdminConstructionPopulatedItem({ location,
                                          values,
                                          className,
                                          selectHandler,
                                          appendHandler,
                                          editHandler,
                                          deleteHandler})
{
  const lastIdx = values.length - 1;

  let onChangeRadio = (event) => {
    location.setStateSelectedIdx(parseInt(event.target.value));
  };

  let setBackground = ((isSelected, style) => {
    return isSelected ? { ...style, backgroundColor: colorRadiobuttonSelected } : style;
  });

  let onSearchChange = (event) => location.setSearchTerm(event.target.value);

  // Хук вернет только последне значение (которое мы передали) ...
  // ... если прошло более 500ms с последнего вызова.
  // Иначе он вернет предыдущее значение searchTerm.
  const debouncedSearchTerm = useDebounce(location.searchTerm, 500);

  let filteredValues = filterValues(debouncedSearchTerm, values, "name");
  filteredValues.sort(
    function(a, b) {
      return a.name.localeCompare(b.name);
    }
  )

  return (
    <Medium style={{ height: '100%' }} className={className}>
      <StyledBlockTitle>
        {location.title}
        <StyledButton backgroundColor={colorAccent2} onClick={(event) => appendHandler(event)}>
          Добавить
        </StyledButton>
      </StyledBlockTitle>
      <BlockBody>
        <SearchInputField name="Быстрый поиск" onChange={onSearchChange} />
        <StyledForm action="">
          <RadioGroup name="customized-radios">
            {
              filteredValues.map((val, idx) => (
                <StyledFormControlLabel
                  value={idx}
                  key={idx}
                  style={setBackground(
                    idx === location.stateSelectedIdx,
                    idx === lastIdx ? controlStylesLast : controlStyles)}
                  // isSelected = {idx === location.stateSelectedIdx}
                  control={
                    <StyledRadio
                      onChange={onChangeRadio} checked={idx === location.stateSelectedIdx}
                      onClick={() => (selectHandler ? selectHandler(val) : null)}
                    />
                  }
                  label={
                    <EditableLabel
                      name={val !== null ? val.name : ""}
                      onSelect={() => (selectHandler ? selectHandler(val) : null)}
                      value={val}
                      editHandler={editHandler}
                      deleteHandler={deleteHandler}
                    />
                  }
                />))

            }
          </RadioGroup>
        </StyledForm>
      </BlockBody>
    </Medium>
  );
}


export function AdminConstructionItem({ location, ...props})
{
  let [values, isReactComponent] = location.src.query(location.getSearchVariables());
  return isReactComponent
    ? values
    : <AdminConstructionPopulatedItem location={location} values={values} {...props} />;
}
