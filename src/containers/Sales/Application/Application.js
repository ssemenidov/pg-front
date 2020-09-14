import React, { useState } from 'react';
import { LeftBar, StyledButton } from '../../../styles/styles';
import PanelDesign from './PanelApplication';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../Base/Partners/LeftBar/SearchBtn';
import FilterBar from '../../Base/OutdoorFurniture/OutdoorFurnitureList/FilterBar/FilterBar';
import EditBtn from '../../Base/Partners/LeftBar/EditBtn';
import PaperBtn from '../../Base/Partners/LeftBar/PaperBtn';
import PackageBtn from '../../Base/Partners/LeftBar/PackageBtn';
import BoxBtn from '../../Base/Partners/LeftBar/BoxBtn';
import CreateBtn from '../../Base/Partners/LeftBar/CreateBtn';
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
        <CreateBtn text="Создть новое" />
        <PackageBtn text="Изменить текущее" />
        <BoxBtn text="Архив дизайнов" />
      </LeftBar>
      <div style={{ width: '100%', margin: '0 2vw 0 0' }}>
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
            <JobTitle>Приложение №202005123 - CocaCola</JobTitle>
          </div>
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
        </div>
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
