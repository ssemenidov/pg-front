import React from 'react';
import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../../components/Styles/ControlToolbarStyle';
import GeneralInformation from '../../../../components/Panels/Location/GeneralInformation/GeneralInfomation';
import TabPanelHeaderLocation from './TabPanelHeaderLocation';
import HistoryTable from '../../../../components/Panels/Location/HistoryTable/HistoryTable';

import { Button } from 'antd';
import printerIcon from '../../../../img/header-bar/printer.svg';
import exportIcon from '../../../../img/header-bar/export.svg';
import settingsIcon from '../../../../img/header-bar/settings.svg';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Общая информация' }, { value: 'История' }];
const panel1 = <GeneralInformation />;
const panel2 = <HistoryTable />;

export default function InnerForm(props) {
  return (
    <form style={{ width: '100%', margin: '0 2vw 0 0' }}>
      <TabPanelHeaderLocation locationID={props.locationID} />
      <div>
        <STabs
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
          onSelect={(index) => props.selectedTab(index)}>
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => {
                console.log(tab.value);
                return <STab key={index}>{tab.value}</STab>;
              })}
            </STabList>
            <div style={{ display: 'flex' }}>
              <Button style={{ marginLeft: '5px' }} className="header-btn">
                <img src={printerIcon} />
              </Button>
              <Button
                style={{ width: '110px', margin: '0 5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                className="header-btn">
                <img src={exportIcon} />
                <span>Экспорт</span>
              </Button>
              <Button className="header-btn">
                <img src={settingsIcon} />
              </Button>
            </div>
          </ControlToolbar>
          <STabPanel>{panel1}</STabPanel>
          <STabPanel>{panel2}</STabPanel>
        </STabs>
      </div>
    </form>
  );
}
