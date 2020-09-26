import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import { Input } from 'antd';
import PanelDesign from './PanelEstimate';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import FilterBar from '../../Base/OutdoorFurniture/OutdoorFurnitureList/FilterBar/FilterBar';
import AddBtn from '../../../components/LeftBar/AddBtn';
import styled from 'styled-components';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
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
        <AddBtn text="Добавить расход" />
      </LeftBar>
      <div style={{ width: '100%', overflowX: 'hidden', margin: '0 2vw 0 0' }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Смета - CocaCola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
            {block === 0 ? (
              <>
                <StyledButton backgroundColor="#008556">Добавить расход</StyledButton>
                <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
              </>
            ) : (
              <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
            )}
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <InfoList>
            <InfoItem>
              <InfoTitle>Аренда</InfoTitle>

              <InfoLine>
                <span>Аренда по прайсу:</span>
                <InfoValue>99 999 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>99 999 тг.</span>
                <InfoValue>10%</InfoValue>
              </InfoLine>

              <InfoLine>
                <span>Аренда на клиента:</span>
                <InfoValue>9 999 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Скидка на аренду на клиента:</span>
                <InfoValue>5%</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Доп. работы</InfoTitle>

              <InfoLine>
                <span>Монтаж:</span>
                <InfoValue>83 782.47 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Печать:</span>
                <InfoValue>73 639.76 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Доп. расходы</InfoTitle>

              <InfoLine>
                <span>Согласование эскизов:</span>
                <InfoValue>71 841.67 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Доп. печать:</span>
                <InfoValue>10 399.84 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Доп. монтаж:</span>
                <InfoValue>14 892.96 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Размещение в регионах:</span>
                <InfoValue>81 964.85 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Оформление брендированных конструкций:</span>
                <InfoValue>45 649.72 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Дополнительный фотоотчет:</span>
                <InfoValue>36 406.35 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Агентская комиссия</InfoTitle>

              <InfoLine>
                <span>Процент АК:</span>
                <InfoValue>5 %</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Сумма АК:</span>
                <InfoValue>30 000 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Сумма за вычетом АК:</span>
                <InfoValue>150 000 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Налоги</InfoTitle>

              <InfoLine>
                <span>Налог:</span>
                <InfoValue>79 597.85 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Скидка на налог:</span>
                <InfoValue>10%</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Налога после скидки:</span>
                <InfoValue>81 872.03 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>НОН РТС</InfoTitle>

              <InfoLine>
                <span>Наружная реклама Актау:</span>
                <InfoValue>35 000 тг.</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Радио Алматы:</span>
                <InfoValue>20 000 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoLine style={{ fontSize: '16px', fontWeight: '600' }}>
                <span>ИТОГО</span>
                <span>1 124 888 тг..</span>
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

export default Estimate;
const InfoList = styled.ul`
  border-radius: 8px;
  border: 1px solid #d3dff0;
  height: 100%;
  padding: 1.5%;
  flex: 0 1 auto;
  margin: 0 2vw 0 0;
  max-width: 370px;
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
