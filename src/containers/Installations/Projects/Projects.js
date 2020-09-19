import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderTitleWrapper, HeaderWrapper } from '../../../styles/styles';
import PanelDesign from './PanelProjects';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import FilterBar from './FilterBar';
import { useHistory } from 'react-router';

const Projects = () => {
  const history = useHistory();
  const [block, setBlock] = useState(0);
  const [collapsed, setCollapsed] = useState(true);
  const links = [
    { id: '', value: 'Главная' },
    { id: 'installations', value: 'Монтажи' },
    { id: 'installations/projects', value: 'Проекты' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="flex-margin">
        <LeftBar>
          <SearchBtn onClick={() => setCollapsed(!collapsed)} />
        </LeftBar>
        {collapsed && <FilterBar />}
      </div>

      <div style={{ width: '70vw', overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Список проектов</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            <StyledButton
              backgroundColor="#2C5DE5"
              onClick={() => {
                history.push('/installations/orders');
              }}>
              Выгрузка разнарядки
            </StyledButton>
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} />
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
         .flex-margin {
            display: flex;
            margin: 0 2vw 0 0;
          }
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Projects;
