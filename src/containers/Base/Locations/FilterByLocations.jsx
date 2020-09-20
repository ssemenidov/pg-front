import React from 'react';
import { Collapse } from '@material-ui/core';
import { LocationCity } from '@material-ui/icons';
import { FilterSection, FilterSectionTitle, FilterSectionTitleText } from '../../../components/Styles/StyledFilters';
import SimpleInput from '../../../components/KhanInputs/SimpleInput';
import ArrowDown from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowDown';
import ArrowUp from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowUp';
import { StyledSelect, StyledInput } from '../../../styles/styles';
import { useDispatch, useSelector } from 'react-redux';

export default function FilterLocation() {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <FilterSection>
      <FilterSectionTitle onClick={handleClick}>
        <FilterSectionTitleText>Поиск по местоположению</FilterSectionTitleText>
        {open && <ArrowUp style={{ marginLeft: 20, marginRight: 0 }} />}
        {!open && <ArrowDown />}
      </FilterSectionTitle>
      <Collapse in={open}>
        {/* <SimpleInput
          placeholder="Город"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_CITY",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Район"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_DISTRICT",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Юридический адрес"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_LEGALADDRESS",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Маркетинговый адрес"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_MARKADDRESS",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Почтовый индекс"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_POSTALCODE",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Кадастровый номер"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_CADASTRALNUMBER",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        />
        <SimpleInput
          placeholder="Целевое назначение"
          onChange={(e) => {
            dispatch({
              type: "SET_FORM_TARGET",
              payload: e.target.value.toLowerCase(),
            });
          }}
          icon={<LocationCity style={{ color: "rgb(178,187,201)" }} />}
        /> */}
        <StyledSelect
          style={{ marginTop: '20px' }}
          defaultValue={
            <>
              <LocationCity style={{ color: 'rgb(178,187,201)' }} />
              <span>Город</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
        <StyledSelect
          style={{ marginTop: '20px' }}
          defaultValue={
            <>
              <LocationCity style={{ color: 'rgb(178,187,201)' }} />
              <span>Район</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
        <StyledInput
          style={{ marginTop: '20px' }}
          placeholder="Юридический адрес"
          prefix={<LocationCity style={{ color: 'rgb(178,187,201)' }} />}
        />
        <StyledInput
          style={{ marginTop: '20px' }}
          placeholder="Маркетинговый адрес"
          prefix={<LocationCity style={{ color: 'rgb(178,187,201)' }} />}
        />
        <StyledSelect
          style={{ marginTop: '20px' }}
          defaultValue={
            <>
              <LocationCity style={{ color: 'rgb(178,187,201)' }} />
              <span>Почтовый индекс</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
        <StyledInput
          style={{ marginTop: '20px' }}
          placeholder="Кадастровый номер"
          prefix={<LocationCity style={{ color: 'rgb(178,187,201)' }} />}
        />
        <StyledSelect
          style={{ marginTop: '20px' }}
          defaultValue={
            <>
              <LocationCity style={{ color: 'rgb(178,187,201)' }} />
              <span>Целевое назначение</span>
            </>
          }
          suffixIcon={null}>
          <StyledSelect.Option value="Option1">Выбор 1</StyledSelect.Option>
          <StyledSelect.Option value="Option2">Выбор 2</StyledSelect.Option>
        </StyledSelect>
      </Collapse>
    </FilterSection>
  );
}
