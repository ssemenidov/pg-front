import React, { useState } from 'react';
import { Input, Checkbox } from 'antd';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import AddBtn from '../../../components/LeftBar/AddBtn';
import styled from 'styled-components';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';

import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';

import PanelDesign from './PanelEstimate';
import SidebarInfo from '../../../components/SidebarInfo';

import { sidebarInfoData } from '../stubDataSource';

const Estimate = () => {
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/estimate', value: 'Смета' },
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

        {block !== 0 && <AddBtn text="Добавить расход" />}
      </LeftBar>

      <div style={{ width: '100%', overflow: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Смета - CocaCola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block !== 0 ? (
              <>
                <StyledButton backgroundColor="#008556">Добавить расход</StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            ) : (
              <>
                <StyledButton backgroundColor="#008556"> Создать приложение </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Добавить в приложение </StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <InfoWrap>
            <ControlToolbar style={{ fontWeight: '600' }}>
              <span>Посчитать с НДС?</span>
              <Checkbox>Да</Checkbox>
            </ControlToolbar>
            <SidebarInfo data={sidebarInfoData} />
          </InfoWrap>
          <PanelDesign setBlock={setBlock} />
        </div>
      </div>

      <style>
        {`
          .left-bar {
            margin: 0 2vw 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Estimate;
const InfoWrap = styled.div`
  margin: 0 2vw 0 0;
`;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 4.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 320px;
  box-sizing: border-box;
  width: 40vw;
`;
const InfoItem = styled.li`
  margin: 4% 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d3dff0;
`;
const InfoTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
`;
const InfoLine = styled.div`
  margin: 4% 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const InfoValue = styled.span`
  font-weight: 600;
  text-align: right;
`;
const InfoInput = styled(Input)`
  font-weight: 600;

  margin-left: auto;
  width: 150px;
`;
