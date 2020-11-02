import React, { useState,createContext, useMemo } from 'react';

import { useQuery, gql, useMutation } from '@apollo/client';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../components/Styles/DesignList/styles';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar, ToolbarControl } from '../../../../components/Styles/ControlToolbarStyle';
import AgreementsTab from '../../../../components/Panels/AgreementsTab/AgreementsTab';
import ApplicationsTab from '../../../../components/Panels/ApplicationsTab/ApplicationsTab';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { Link } from 'react-router-dom';
import {  Input } from 'antd';
import { BtnBrand, BtnExport, BtnPrint, BtnSettings } from '../../../../components/Styles/ButtonStyles';

import print_icon from '../../../../img/outdoor_furniture/table_icons/print.svg';
import export_icon from '../../../../img/outdoor_furniture/table_icons/export_icon.svg';
import settings_icon from '../../../../img/outdoor_furniture/table_icons/setting.svg';
import searchInputIcon from '../../../../img/header-bar/search-icon.svg';
STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Договора' }, { value: 'Приложения' }];
const panel1 = <AgreementsTab />;
const panel2 = <ApplicationsTab />;
const CONTRACT_CREATE = gql`
  mutation {
    createContract(input: {

    }) {
      contract {
        id
      }
    }
  }
`;
const InnerForm = (props) => {
  const [block, setBlock] = useState(0);
  const history = props.history;
  const [  createContract, { data }] = useMutation(CONTRACT_CREATE);
  useMemo(() => {
    if (data) {

     history.push(`/base/documents/agreement/${data.createContract.contract.id}`);
    }
  }, [data]);
  const addContract= (e) => {

    createContract();
    //e.preventDefault();


  };
  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Документы</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          {block == 0 && (
              <StyledButton backgroundColor="#2c5de5" onClick={addContract}>Создать договор</StyledButton>

          ) }
        </ButtonGroup>
      </HeaderWrapper>
      <div>
        <STabs
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
          >
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => {
                return (
                  <STab key={index} onClick={() => setBlock(index)}>
                    {tab.value}
                  </STab>
                );
              })}
            </STabList>
            <ToolbarControl style={{width:"40%",minWidth:"270px"}}>
              <Input
                  style={{ marginLeft: '20px' }}
                  placeholder="Быстрый поиск"
                  suffix="Найти"
                  prefix={<img src={searchInputIcon} />}
                />
              <BtnPrint>
                <img src={print_icon} alt="" />
              </BtnPrint>
              <BtnExport
              // onClick={exportBtnHandler}
              >
                <img src={export_icon} alt="" />
                Экспорт
              </BtnExport>
              <BtnSettings>
                <img src={settings_icon} alt="" />
              </BtnSettings>
            </ToolbarControl>
          </ControlToolbar>

          <STabPanel>{panel1}</STabPanel>
          <STabPanel>{panel2}</STabPanel>

        </STabs>
      </div>
    </form>
  );
};

export default InnerForm;
