import React, { useState } from 'react';
import {
  FilterMenu,
  SearchTitle,
  FilterText,
  FilterSectionTitle,
  FilterSection,
  FilterSectionTitleText,
} from '../../../components/Styles/StyledFilters';

import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';

import { Collapse } from '@material-ui/core';
import ArrowUp from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowUp';
import ArrowDown from '../../../components/CollapseArrows/CollapseArrowIcons/ArrowDown';
import InputAnchor from '../../../components/Inputs/InputAnchor';
import SelectAnchor from '../../../components/Inputs/SelectAnchor';
const FilterBar = () => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  return (
    <FilterMenu
      onKeyDown={(e) => {
        e.key === 'Enter' && alert('Фильтр');
      }}>
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
          <SelectAnchor
            placeholder="Выберите период"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen2(!open2)}>
          <FilterSectionTitleText> по параметрам</FilterSectionTitleText>
          {open2 && <ArrowUp />}
          {!open2 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open2}>
          <SelectAnchor
            placeholder="Выберите город"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />

          <SelectAnchor
            placeholder="Бренд"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Рекламодатель"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Менеджер по продажам"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Ответств. менеджер"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
        </Collapse>
      </FilterSection>

      <BtnGroup>
        <SubmitButton onClick={() => alert('Фильтр')}>Поиск</SubmitButton>
        <ResetButton>Очистить</ResetButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
