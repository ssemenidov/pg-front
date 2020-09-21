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
  const [open3, setOpen3] = useState(true);

  return (
    <FilterMenu>
      <SearchTitle>
        <FilterText>Поиск</FilterText>
      </SearchTitle>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen1(!open1)}>
          <FilterSectionTitleText> Поиск по местоположению</FilterSectionTitleText>
          {open1 && <ArrowUp />}
          {!open1 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open1}>
          <SelectAnchor
            placeholder="Выберите город"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Выберите район"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Почтовый индекс"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen2(!open2)}>
          <FilterSectionTitleText>Поиск по проекту</FilterSectionTitleText>
          {open2 && <ArrowUp />}
          {!open2 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open2}>
          <SelectAnchor
            placeholder="Название проекта"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />

          <SelectAnchor
            placeholder="Формат"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen3(!open3)}>
          <FilterSectionTitleText> Поиск по дате</FilterSectionTitleText>
          {open3 && <ArrowUp />}
          {!open3 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open3}>
          <SelectAnchor
            placeholder="Дата  монтажа"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
          <SelectAnchor
            placeholder="Дата демонтажа"
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
          />
        </Collapse>
      </FilterSection>

      <BtnGroup>
        <ResetButton>Очистить</ResetButton>
        <SubmitButton>Искать</SubmitButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
