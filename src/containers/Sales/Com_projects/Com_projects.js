import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import PanelDesign from './PanelCom_projects';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import FilterBar from './FilterBar';
import { useHistory } from 'react-router';
const Com_projects = () => {
  const [block, setBlock] = useState(0);
  const history = useHistory();
  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/com_projects', value: 'Комерчиские Пректы' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div className="flex-margin">
        <LeftBar>
          <SearchBtn />
          <CreateBtn text="Смарт кнопка" />
        </LeftBar>
        <FilterBar />
      </div>

      <div style={{ overflowX: 'hidden', width: '70vw', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Коммерчeские Проекты</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block === 0 && (
              <>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/project_card');
                  }}>
                  Создать Проект
                </StyledButton>
                <StyledButton backgroundColor="#FF5800">Создать отчет</StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
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

export default Com_projects;
