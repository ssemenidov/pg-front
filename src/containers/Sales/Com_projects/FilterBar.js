import React, { useState } from 'react';
import { FilterMenu, SearchTitle, FilterText } from '../../../components/Styles/StyledFilters';

import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

import { Collapse } from '@material-ui/core';
import { FilterSectionTitle, FilterSection, FilterSectionTitleText } from '../../../components/Styles/StyledFilters';
import ArrowUp from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowUp';
import ArrowDown from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowDown';
import InputAnchor from '../../../components/Inputs/InputAnchor';
import SelectAnchor from '../../../components/Inputs/SelectAnchor';
const FilterBar = () => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen1(!open1)}>
          <FilterSectionTitleText> по дате</FilterSectionTitleText>
          {open1 && <ArrowUp />}
          {!open1 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open1}>
          <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Выберите период" />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen2(!open2)}>
          <FilterSectionTitleText> по параметрам</FilterSectionTitleText>
          {open2 && <ArrowUp />}
          {!open2 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open2}>
          <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Бренд" />
          <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Рекламодатель" />
          <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Рекламное агенство" />
          <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Сектор деятельности" />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Создатель " />
        <SelectAnchor options={[{ label: 'case 1' }, { label: 'case 2' }]} placeholder="Менеджер по продажам" />
      </FilterSection>
      <BtnGroup>
        <ResetButton>Очистить</ResetButton>
        <SubmitButton>Искать</SubmitButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
