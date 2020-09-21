import React from 'react';
import { useDispatch } from 'react-redux';
import FilterByParametersPartners from '../../../components/Filters/FilterByCompany/FilterByCompany';
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
      <FilterByParametersPartners />
      <BtnGroup>
        <SubmitButton>Поиск</SubmitButton>
        <ResetButton>Очистить</ResetButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
