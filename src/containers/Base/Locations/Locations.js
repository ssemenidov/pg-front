import React, { createContext, useEffect, useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import PanelDesign from './PanelLocations';
import FilterBar from './FilterBar';

import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { LeftBar } from '../../../styles/styles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
export const locationsContext = createContext();

const Locations = (props) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  return (
    <locationsContext.Provider value={[filter, setFilter]}>
      <div className="locations-table">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>

        {collapsed && <FilterBar />}
        <div className="locations-table-bar">
          <Breadcrumb className="layout-breadcrumb">
            <Breadcrumb.Item>
              <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/base/">Базы</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Список местоположений</Breadcrumb.Item>
          </Breadcrumb>
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Список местоположений</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton
                backgroundColor="#008556"
                onClick={() => {
                  history.push(`/base/locations/location`);
                }}>
                Создать новое
              </StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex' }}>
            <PanelDesign style={{ flex: '0 1 auto' }} history={history} />
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
            padding: 30px 30px 0 30px;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 20px 0;
          }
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
        </style>
      </div>
    </locationsContext.Provider>
  );
};

export default Locations;
