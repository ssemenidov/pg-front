import React, { useState, createContext } from 'react';
import {  Checkbox, } from 'antd';
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
import { useParams } from 'react-router-dom';
import {  CITIES_QUERY } from './utils';

import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';

import PanelDesign from './PanelEstimate';
import SidebarInfo from '../../../components/SidebarInfo';

import { sidebarInfoData } from '../stubDataSource';
import {  useQuery } from '@apollo/client';

export const EstimateContext = createContext();

const Estimate = () => {
  const [cities, setCities] = useState({
    data: [],
    loaded: false,
  });
  const { id, appId } = useParams();
  const currentId = appId ? appId : id ? id : '';
  const [block, setBlock] = useState(0);
  const [createModal, setCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [sort, setSort] = useState('');
  const [created, setCreated] = useState(false);
  const links = [
    { id: '', value: 'Главная' },
    { id: 'sales', value: 'Продажи' },
    { id: 'sales/estimate', value: 'Смета' },
  ];

  const { loading, error, data } = useQuery(CITIES_QUERY);

  if (data && !cities.loaded) {
    setCities({
      data: data.searchCity.edges.map((city) => {
        return {
          id: city.node.id,
          title: city.node.title,
        };
      }),
      loaded: true,
    });
  }

  return (
    <EstimateContext.Provider
      value={{
        cities,
        sort,
        setSort,
        createModal,
        setCreateModal,
      }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <LeftBar className="left-bar">
          <SearchBtn />
          <CreateBtn text="Добавить бронь" />
          <PackageBtn text="Добавить пакет" />
          <EditBtn text="Перейти в монтажи" />
          <PaperBtn text="Сводка проекта" />
          <BoxBtn text="Архив дизайнов" />

          {block !== 0 && (
            <AddBtn
              text="Добавить расход"
              onClick={() => {
                setCreateModal(true);
                console.log(createModal);
              }}
            />
          )}
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
                  <StyledButton
                    backgroundColor="#008556"
                    onClick={() => {
                      setCreateModal(true);
                      console.log("clicked")
                    }}>
                    Добавить расход
                  </StyledButton>
                  <StyledButton backgroundColor="#2C5DE5">Выгрузка данных</StyledButton>
                </>
              ) : (
                <>
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
            <PanelDesign
              openEditModal={openEditModal}
              setOpenEditModal={setOpenEditModal}
              setBlock={setBlock}
              created={created}
              setCreated={setCreated}
              cities={cities}
            />
          </div>
        </div>

        <style>
          {`
          .left-bar {
            margin: 0 2vw 0 0;
          }
          
          .ant-input-number {
            width: 100%;
          }

        //   .ant-table-filter-trigger-container  {
        //     background: transparent !important;
        //     cursor: unset;
        // }
        // .ant-table-filter-trigger-container>span {
        //   display: flex;
        //   align-items: center;
        //   width: 15px;
        // }
        // .ant-table-filter-trigger-container-open {
        //     background: transparent !important;
        // }
        // .ant-table-filter-trigger-container-open:hover {
        //     background: transparent !important;
        // }
          `}
        </style>
      </div>
    </EstimateContext.Provider>
  );
};

export default Estimate;
const InfoWrap = styled.div`
  margin: 0 2vw 0 0;
`;
