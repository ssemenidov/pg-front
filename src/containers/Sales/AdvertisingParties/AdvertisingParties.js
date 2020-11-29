import React, { useState,createContext } from 'react';
import { Layout } from 'antd';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs'

import { ReservationSlider } from './BottomSlider'
import FilterBar from './FilterBar';
import { FilterLeftBar } from './LeftBarFilters/FilterLeftBar';

import { colorOrangeAccent, colorAccent } from '../../../components/Styles/Colors';
import './styles_adv_part.scss'
import { SliderState } from '../../../components/SlidingBottomPanel/SliderState';
import { GanttChartAdvertisingSides } from './GanttChartAdvertisingSides';
import { useHistory } from 'react-router';
import { routes } from '../../../routes';


export const adverContext = createContext();


const AdvertisingParties = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [filter, setFilter] = useState({});
  const [refetch, setRefetch] = useState(null);
  const [ganttUpdater, setGanttUpdater]= useState(null);
  const history = useHistory();

  const sliderState = new SliderState({name: "", key: ""})
  return (
    <adverContext.Provider value={[filter, setFilter]}>
    <Layout>
      <Layout>
        <FilterLeftBar props={setCollapsed, collapsed}/>
        {collapsed && <FilterBar refetch={refetch} ganttUpdater={ganttUpdater}/>}
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <BreadCrumbsRoutes links={[routes.sales.root, routes.sales.advertising_parties]} />
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
              <StyledButton backgroundColor={colorAccent}
                            onClick={() => history.push(routes.sales.project_card.url("VlByb2plY3ROb2RlOjI="))}

              >Сохранить</StyledButton>
              <StyledButton backgroundColor={colorOrangeAccent}>Создать отчет</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="outdoor-table-bar" style={{ flex: '0 1 auto' }}>
              <GanttChartAdvertisingSides filter={filter} setRefetch={setRefetch} setGanttUpdater={setGanttUpdater}/>
            </div>
            {sliderState.addShowed && <ReservationSlider sliderState={sliderState} />}
          </div>
        </Layout>
      </Layout>
    </Layout>
    </adverContext.Provider>
  );
};
export default AdvertisingParties;
