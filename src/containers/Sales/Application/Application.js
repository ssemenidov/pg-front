import React, { useState } from 'react';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../styles/styles';
import { Input } from 'antd';
import PanelDesign from './PanelApplication';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import EditBtn from '../../../components/LeftBar/EditBtn';
import PaperBtn from '../../../components/LeftBar/PaperBtn';
import PackageBtn from '../../../components/LeftBar/PackageBtn';
import BoxBtn from '../../../components/LeftBar/BoxBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import { useHistory } from 'react-router';
import styled from 'styled-components';
const Application = () => {
  const history = useHistory();
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
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          margin: '0 2vw 0 0',
        }}>
        <BreadCrumbs links={links} />
        <HeaderWrapper>
          <HeaderTitleWrapper>
            <TitleLogo />
            <JobTitle>Приложение №202005123 - CocaCola</JobTitle>
          </HeaderTitleWrapper>
          <ButtonGroup>
          
                <StyledButton
                  backgroundColor="#008556"
                  onClick={() => {
                    history.push('/sales/invoice');
                  }}>
                  Выставить счет
                </StyledButton>
                <StyledButton backgroundColor="#D42D11">Удалить</StyledButton>
          
          </ButtonGroup>
        </HeaderWrapper>
        <div style={{ display: 'flex' }}>
          <InfoList>
            <InfoItem>
              <InfoTitle>Информация о приложении</InfoTitle>

              <InfoLine>
                <span>Дата создания:</span>
                <InfoValue>23.05.2020</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Дата начала:</span>
                <InfoValue>23.05.2020</InfoValue>
              </InfoLine>

              <InfoLine>
                <span>Дата окончания:</span>
                <InfoValue>23.05.2020</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Информация о договоре</InfoTitle>

              <InfoLine>
                <span>Номер:</span>
                <InfoValue>№2137651273</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Подписан:</span>
                <InfoValue>21.03.2020</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Информация о подписанте</InfoTitle>

              <InfoLine>
                <span>ФИО:</span>
                <InfoValue>Иванов Иван Иванович</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Должность:</span>
                <InfoValue>Директор</InfoValue>
              </InfoLine>
            </InfoItem>
            <InfoItem>
              <InfoTitle>Оплата</InfoTitle>

              <InfoLine>
                <span>Срок оплаты:</span>
                <InfoValue>23.04.2020</InfoValue>
              </InfoLine>
              <InfoLine>
                <span>Стоимость:</span>
                <InfoValue>10 399.84 тг.</InfoValue>
              </InfoLine>
            </InfoItem>
          </InfoList>
          <PanelDesign style={{ flex: '0 1 auto' }}  />
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

export default Application;
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
