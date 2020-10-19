import React, { useState,createContext } from 'react';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../styles/styles';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar, ToolbarControl } from '../../../../components/Styles/ControlToolbarStyle';
import AgreementsTab from '../../../../components/Panels/AgreementsTab/AgreementsTab';
import ApplicationsTab from '../../../../components/Panels/ApplicationsTab/ApplicationsTab';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { Link } from 'react-router-dom';
import { BtnBrand, BtnExport, BtnPrint, BtnSettings } from '../../../../components/Styles/ButtonStyles';

import print_icon from '../../../../img/outdoor_furniture/table_icons/print.svg';
import export_icon from '../../../../img/outdoor_furniture/table_icons/export_icon.svg';
import settings_icon from '../../../../img/outdoor_furniture/table_icons/setting.svg';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Договора' }, { value: 'Приложения' }];
const panel1 = <AgreementsTab />;
const panel2 = <ApplicationsTab />;

const InnerForm = (props) => {
  const [block, setBlock] = useState(0);
  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Документы</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          {block == 0 && (
            <Link to="/base/documents/agreement">
              <StyledButton backgroundColor="#2c5de5">Создать договор</StyledButton>
            </Link>
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
            <ToolbarControl>
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
