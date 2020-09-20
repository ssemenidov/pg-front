import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import PanelDesign from './PanelProject_card';
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
import styled from 'styled-components';
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

      <div style={{ width: '100%', margin: '0 2vw 0 0' }}>
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
          <InfoList>
            <InfoItem>
              <InfoTitle>О Проекте</InfoTitle>

              <InfoLine>
                <span>Код проекта</span>
                <InfoValue>#2020876153</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Дата создания</span>
                <InfoValue>21.05.2020</InfoValue>
              </InfoLine>

              <InfoLine>
                <span>Создатель</span>
                <InfoValue>@username</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Информация о бренде</InfoTitle>

              <InfoLine>
                <span>Бренд</span>
                <InfoValue>CocaCola</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Сектор деятельности:</span>
                <InfoValue>Безалкогольные напитки</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Доп. инфо</InfoTitle>

              <InfoLine>
                <span>Рекламодатель</span>
                <InfoValue>Агентство</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Рекламное агентство</span>
                <InfoValue>-</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Брендинг</span>
                <InfoValue>Да</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Агентская комиссия</span>
                <InfoValue>10%</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Менеджер по Продажам</span>
                <InfoValue>Иван Иванович Иванов</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Коментарий к проекту</InfoTitle>

              <InfoLine>
                <span>
                  Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение.{' '}
                </span>
              </InfoLine>
            </InfoItem>
          </InfoList>
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
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 1.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 422px;
  box-sizing: border-box;
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
