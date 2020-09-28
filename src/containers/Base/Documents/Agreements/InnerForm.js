import React from 'react';
import BackOffice from '../../../../components/Panels/Construction/BackOffice/BackOffice';
import TechDept from '../../../../components/Panels/Construction/TechDept/TechDept';
import AccDept from '../../../../components/Panels/Construction/AccDept/AccDept';
import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../../components/Styles/ControlToolbarStyle';
import AgreementsTab from '../../../../components/Panels/AgreementsTab/AgreementsTab';
import ApplicationsTab from '../../../../components/Panels/ApplicationsTab/ApplicationsTab';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Договора' }, { value: 'Приложения' }];
const panel1 = <AgreementsTab />;
const panel2 = <ApplicationsTab />;

const InnerForm = (props) => {
  return (
    <form style={{ width: '100%' }}>
      <div>
        <STabs
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
          onSelect={(index) => props.selectedTab(index)}>
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => {
                return <STab key={index}>{tab.value}</STab>;
              })}
            </STabList>
          </ControlToolbar>
          <STabPanel>{panel1}</STabPanel>
          <STabPanel>{panel2}</STabPanel>
        </STabs>
      </div>
    </form>
  );
};

export default InnerForm;
