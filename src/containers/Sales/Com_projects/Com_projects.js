import React, { useState } from 'react';
import { LeftBar, StyledButton } from '../../../styles/styles';
import PanelDesign from './PanelCom_projects';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../Base/Partners/LeftBar/SearchBtn';
import CreateBtn from '../../Base/Partners/LeftBar/CreateBtn';
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

      <div style={{ width: '70vw', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '2vw 0',
          }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <TitleLogo />
            <JobTitle>Коммерчeские Проекты</JobTitle>
          </div>
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
        </div>

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
          .project-info {
            border-radius: 8px;
            border: 1px solid #d3dff0;
            height: 100%;
            padding: 1.5%;
            flex: 0 1 auto;
            margin: 0 2vw 0 0;
            width:422px;
          }
          .project-info p {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Com_projects;
