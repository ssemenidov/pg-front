import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import PanelDesign from './PanelApplication';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import FilterBar from '../../Base/OutdoorFurniture/OutdoorFurnitureList/FilterBar/FilterBar';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import { useHistory } from 'react-router';
const Application = () => {
  const history = useHistory();
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/application', value: 'Приложение' },
  ];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <LeftBar className="left-bar">
        <SearchBtn />
        <CreateBtn text="Добавить бронь" />
        <PackageBtn text="Добавить пакет" />
        <EditBtn text="Перейти в монтажи" />
        <PaperBtn text="Сводка проекта" />
        <BoxBtn text="Архив дизайнов" />
      </LeftBar>
      <div style={{ width: '100%', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Приложение №202005123 - CocaCola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block === 0 && (
              <>
                <StyledButton
                  backgroundColor="#008556"
                  onClick={() => {
                    history.push('/sales/invoice');
                  }}>
                  Выставить счет
                </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />

          {block === 0 ? null : <FilterBar />}
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
      <style>
        {`
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
            max-width:422px;
            width:25vw;
          }
          .project-info p {
            margin: 0;
          }
        `}
      </style>
    </div>
  );
};

export default Application;
