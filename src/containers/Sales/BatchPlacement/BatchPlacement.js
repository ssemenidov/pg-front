import React, { useState,createContext } from 'react';
import { Layout, Breadcrumb } from 'antd';
import styled from 'styled-components';
import { PanelBatch } from './PanelBatch';

import FilterBar from './FilterBar';
import { FilterLeftBar } from './LeftBarFilters/FilterLeftBar';

import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ReservationSlider } from './BottomSlider'

import { colorOrangeAccent, colorAccent } from '../../../components/Styles/Colors';
import './styles_adv_part.scss'
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
export const batchContext = createContext();
const { Sider } = Layout;

const BatchPlacement = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter]= useState(null);
  const [refetch, setRefetch]= useState(null);
  const [ganttUpdater, setGanttUpdater] = useState(null);

  const sliderState = new SliderState({name: "", key: ""})
  return (
    <batchContext.Provider value={[filter, setFilter]}>
    <Layout>
      <Layout>
        <FilterLeftBar props={setCollapsed, collapsed}/>
        {collapsed && <FilterBar setRefetch={setRefetch} refetch={refetch} ganttUpdater={ganttUpdater}/>}
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          {/* <BreadCrumbs links={links}/> */}
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Справочник рекламных сторон</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton backgroundColor={colorAccent}
                            onClick={() => { sliderState.setAddShowed(true); }}
              >Быстрая бронь</StyledButton>
              <StyledButton backgroundColor={colorAccent}>Создать проект</StyledButton>
              <StyledButton backgroundColor={colorAccent}>Сохранить</StyledButton>
              <StyledButton backgroundColor={colorOrangeAccent}>Создать отчет</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="outdoor-table-bar" style={{ flex: '0 1 auto' }}>
              <PanelBatch filter={filter} setRefetch={setRefetch} setGanttUpdater={setGanttUpdater}/>
            </div>
            {sliderState.addShowed && <ReservationSlider sliderState={sliderState} />}
          </div>
        </Layout>
      </Layout>
    </Layout>
    </batchContext.Provider>
  );
};

export default BatchPlacement;

const StyledLayout = styled(Layout)`
  background: #fff !important;
  height: 100% !important;
  padding: 30px 30px 0 30px;
`;

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;
const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 11px;
  margin: 0 0 20px 0;

  a,
  span {
    color: #8aa1c1 !important;
  }

  img {
    margin: 0 8px 0 0;
  }
`;
