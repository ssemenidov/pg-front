import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { useQuery, gql, useMutation } from '@apollo/client';

import { locationContext } from '../Location';
import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../../components/Styles/ControlToolbarStyle';
import GeneralInformation from '../../../../components/Panels/Location/GeneralInformation/GeneralInfomation';

import HistoryTable from '../../../../components/Panels/Location/HistoryTable/HistoryTable';

import { Button } from 'antd';
import printerIcon from '../../../../img/header-bar/printer.svg';
import exportIcon from '../../../../img/header-bar/export.svg';
import settingsIcon from '../../../../img/header-bar/settings.svg';

import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../styles/styles';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [{ value: 'Общая информация' }, { value: 'История' }];
const panel1 = <GeneralInformation />;
const panel2 = <HistoryTable />;
const links = [
  { id: '', value: 'Главная' },
  { id: 'base', value: 'Базы' },
  { id: 'base/locations', value: 'Список проектов' },
];
const LOCATION_DELETE = gql`
  mutation Delete($id: ID!) {
    deleteLocation(id: $id) {
      deletedId
    }
  }
`;
export default function InnerForm(props) {

  const  id =useContext(locationContext);
 
  const history = useHistory();
  const [deleteLocation] = useMutation( LOCATION_DELETE);
  const Delete = () => {
    console.log(id);
    deleteLocation({ variables: { id: id } });
    history.push(`/base/locations`);
    history.go(0);
 
  };

  return (
    <form style={{ width: '100%', margin: '0 2vw 0 0' }}>
       <BreadCrumbs links={links} />
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Местоположение </JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton
            backgroundColor="#008556"
            onClick={() => {
              history.push(`/base/locations`);
            }}>
            Сохранить
          </StyledButton>
          <StyledButton backgroundColor="#D42D11" onClick={Delete}>Удалить</StyledButton>
          <StyledButton backgroundColor="#2c5de5">Добавить местоположение</StyledButton>
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
