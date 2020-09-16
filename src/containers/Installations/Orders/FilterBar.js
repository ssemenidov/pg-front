import React from 'react';
import { useDispatch } from 'react-redux';
import FilterByLocation from '../../../components/Filters/FilterByLocation/FilterByLocation';
import { FilterMenu, SearchTitle, FilterText } from '../../../components/Styles/StyledFilters';
import FilterByBIN from '../../../components/Filters/FilterByBIN/FilterByBIN';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { getPartnersData, filterPartners } from '../../../store/actions/actions';

const FilterBar = () => {
  const dispatch = useDispatch();
  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <FilterByLocation />
      <BtnGroup>
        <ResetButton
          onClick={() => {
            dispatch({ type: 'CLEAR_PARTNERS_FILTER' });
            dispatch(getPartnersData());
          }}>
          Очистить
        </ResetButton>
        <SubmitButton onClick={() => dispatch(filterPartners())}>Искать</SubmitButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
