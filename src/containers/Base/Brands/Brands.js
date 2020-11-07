import React, { createContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { gql, useMutation } from '@apollo/client';
import { Breadcrumb } from 'antd';

import { LeftBar } from '../../../components/Styles/DesignList/styles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import {
  StyledButton, HeaderWrapper,
  HeaderTitleWrapper
} from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

import PanelDesign from './PanelBrands';
import FilterBar from './FilterBar';

const BRAND_CREATE = gql`
  mutation {
    createBrand(input: {}) {
      brand {
        id
      }
    }
  }
`;

export const brandsContext = createContext();

const Brands = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const [createBrand, { data }] = useMutation(BRAND_CREATE);

  useMemo(() => {
    if (data) {
      history.push(`/base/partner/brand/${data.createBrand.brand.id}`);
    }
  }, [data]);
  const addBrand= () => {
    createBrand();
  };
  return (
    <brandsContext.Provider value={[filter, setFilter]}>
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
            <Breadcrumb.Item>
              <Link to="/base/brands">Бренды</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Бренды</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton
                backgroundColor="#008556"
                type="button"
                onClick={addBrand}
                >
                Создать бренд
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
            width: 100%;
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
    </brandsContext.Provider>
  );
};

export default Brands;
