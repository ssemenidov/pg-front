import React, { useEffect, useState } from 'react';
import PanelDesign from './PanelLocations';
import FilterBar from './FilterBar';

import { LeftBar } from '../../../styles/styles';
import HeaderList from './HeaderList';
import { BtnGroup, ResetButton, SubmitButton } from '../../../components/Styles/ButtonStyles';
import { FilterMenu, SearchTitle, FilterText } from '../../../components/Styles/StyledFilters';
import SearchBtn from '../../../components/LeftBar/SearchBtn';

const Locations = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="locations-table">
      <LeftBar>
        <SearchBtn />
      </LeftBar>

      {collapsed && <FilterBar />}
      <div className="locations-table-bar">
        <HeaderList />
        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} />
        </div>
      </div>
      <style>
        {`
          .locations-table{
            display:flex;
          }
          .locations-table-bar{
            display: flex;
            flex-direction: column;
              overflow-x: hidden;
            margin: 0 2vw;
          }
        `}
      </style>
    </div>
  );
};

export default Locations;
