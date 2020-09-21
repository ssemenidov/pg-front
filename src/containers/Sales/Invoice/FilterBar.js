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
          <FilterSectionTitleText> по дате</FilterSectionTitleText>
          {open1 && <ArrowUp />}
          {!open1 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open1}>
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Выберите период"
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
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Код проекта"
          />
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Номер приложения"
          />
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Бренд"
          />
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Рекламодатель"
          />
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Рекламное агенство"
          />
        </Collapse>
      </FilterSection>
      <FilterSection>
        <FilterSectionTitle onClick={() => setOpen3(!open3)}>
          <FilterSectionTitleText> По менеджерам</FilterSectionTitleText>
          {open3 && <ArrowUp />}
          {!open3 && <ArrowDown />}
        </FilterSectionTitle>

        <Collapse in={open3}>
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="Ответственный"
          />
          <SelectAnchor
            options={[
              { label: 'case 1', value: 'case 1' },
              { label: 'case 2', value: 'case 2' },
            ]}
            placeholder="По продажам"
          />
        </Collapse>
      </FilterSection>
      <BtnGroup>
        <SubmitButton>Поиск</SubmitButton>
        <ResetButton>Очистить</ResetButton>
      </BtnGroup>
    </FilterMenu>
  );
};

export default FilterBar;
