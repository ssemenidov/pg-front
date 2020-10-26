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
const LOCATION_UPDATE = gql`
  mutation(
    $id: ID!
    $area:String
    $cadastralNumber: String
    $targetPurpose: String
    $comment: String
    $address:String
    $postcode:String
    $city:ID
    $district:ID
    $areaAct:String
    $areaActDate: DateTime
    $resolutionNumber:String
    $resolutionNumberDate: DateTime
    $rentContractEnd: DateTime
    $rentContractStart: DateTime
    $rentContractNumber: String
    $rentContractCreatedAt: DateTime
    $rentRegistrationStatus: String
  ) {
    updateLocation(
      id: $id
      input: {
        area:$area
        cadastralNumber:$cadastralNumber
        targetPurpose:$targetPurpose
        comment: $comment
        address:$address
        postcode:$postcode
        city:$city
        district:$district
        areaAct:$areaAct
        areaActDate: $areaActDate
        resolutionNumber:$resolutionNumber
        resolutionNumberDate: $resolutionNumberDate
        rentContractEnd: $rentContractEnd
        rentContractStart: $rentContractStart
        rentContractNumber: $rentContractNumber
        rentContractCreatedAt: $rentContractCreatedAt
        rentRegistrationStatus: $rentRegistrationStatus
      }
    ) {
      location {
        id
      }
    }
  }
`;

export default function InnerForm(props) {
  const  [item, setItem] =useContext(locationContext);

  const history = useHistory();
  const [updateLocation] = useMutation(LOCATION_UPDATE);
  const [deleteLocation] = useMutation( LOCATION_DELETE);
  const Update = () => {
    updateLocation({ variables:  {
       ...item,
        city:item.city &&  item.city.id,
        district:item.district &&  item.district.id,
       } });

    history.push(`/base/locations`);
    history.go(0);
  };
  const Delete = () => {
    deleteLocation({ variables: { id: item.id } });
    history.push(`/base/locations`);
    history.go(0);
  };
  const addConstruction = (e) => {
    e.preventDefault();

    history.push(`/base/locations/location/${item.id}/add_outdoor_furniture`);
    history.go(0);
  }


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
            backgroundColor="#2c5de5"
            type="button"
            onClick={(e) => addConstruction(e)}
          >
            Добавить конструкцию
          </StyledButton>
          <StyledButton
            backgroundColor="#008556"
            type="button"
            onClick={Update}
          >
            Сохранить
          </StyledButton>
          <StyledButton
            backgroundColor="#D42D11"
            onClick={Delete}
          >
            Удалить
          </StyledButton>
          {/* <StyledButton backgroundColor="#2c5de5">Добавить местоположение</StyledButton> */}
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
