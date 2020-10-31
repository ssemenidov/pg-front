import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Input } from 'antd';
import styled from 'styled-components';

import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { InfoList, InfoItem, InfoLine, InfoValue, InfoInput, InfoTitle } from '../../../components/Styles/InfoPanel';

import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import SidebarInfo from '../../../components/SidebarInfo';

import PanelDesign from './PanelProject_card';

import { sidebarInfoData } from './stubDataSource';

const Project_card = () => {
  const history = useHistory();
  const [block, setBlock] = useState(0);

  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/project_card', value: 'Проекты' },
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

      <div style={{ width: '100%', overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Проект Coca-cola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block === 0 && (
              <>
                <StyledButton
                  backgroundColor="#D42D11"
                  onClick={() => {
                    history.push('/sales/summary');
                  }}>
                  Формирование сводки проекта
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/application');
                  }}>
                  Создать приложение
                </StyledButton>
                <StyledButton
                  backgroundColor="#2C5DE5"
                  onClick={() => {
                    history.push('/sales/estimate');
                  }}>
                  Смета проекта
                </StyledButton>
              </>
            )}
          </ButtonGroup>
        </HeaderWrapper>

        <div style={{ display: 'flex' }}>
          {/*<InfoList>*/}
          {/*  <InfoItem>*/}
          {/*    <InfoTitle>О Проекте</InfoTitle>*/}

          {/*    <InfoLine>*/}
          {/*      <span>Код проекта</span>*/}
          {/*      <InfoValue>#2020876153</InfoValue>*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Дата создания</span>*/}
          {/*      <InfoValue>21.05.2020</InfoValue>*/}
          {/*    </InfoLine>*/}

          {/*    <InfoLine>*/}
          {/*      <span>Менеджер бэк-офиса</span>*/}
          {/*      <InfoInput defaultValue="@username" />*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Менеджер по продажам</span>*/}
          {/*      <InfoInput defaultValue="@username" />*/}
          {/*    </InfoLine>*/}
          {/*  </InfoItem>*/}
          {/*  <InfoItem>*/}
          {/*    <InfoTitle>Информация о бренде</InfoTitle>*/}

          {/*    <InfoLine>*/}
          {/*      <span>Бренд</span>*/}
          {/*      <InfoInput defaultValue="CocaCola" />*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Сектор деятельности:</span>*/}
          {/*      <InfoInput defaultValue="Безалкогольные напитки" />*/}
          {/*    </InfoLine>*/}
          {/*  </InfoItem>*/}
          {/*  <InfoItem>*/}
          {/*    <InfoTitle>Доп. инфо</InfoTitle>*/}

          {/*    <InfoLine>*/}
          {/*      <span>Рекламодатель</span>*/}
          {/*      <InfoInput defaultValue="Агентство" />*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Рекламное агентство</span>*/}
          {/*      <InfoInput defaultValue="-" />*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Брендинг</span>*/}
          {/*      <InfoInput defaultValue="Да" />*/}
          {/*    </InfoLine>*/}
          {/*    <InfoLine>*/}
          {/*      <span>Агентская комиссия</span>*/}
          {/*      <InfoInput defaultValue="10%" />*/}
          {/*    </InfoLine>*/}
          {/*  </InfoItem>*/}
          {/*  <InfoItem>*/}
          {/*    <InfoTitle>Коментарий к проекту</InfoTitle>*/}

          {/*    <InfoLine>*/}
          {/*      <InfoInput.TextArea*/}
          {/*        rows={4}*/}
          {/*        defaultValue=" Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение."*/}
          {/*      />*/}
          {/*    </InfoLine>*/}
          {/*  </InfoItem>*/}
          {/*</InfoList>*/}
          <SidebarInfo data={sidebarInfoData}/>
          <PanelDesign style={{ flex: '0 1 auto' }} setBlock={setBlock} />
        </div>
      </div>
      {/* {block === 0 ? null : <FilterBar />} */}
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

export default Project_card;
