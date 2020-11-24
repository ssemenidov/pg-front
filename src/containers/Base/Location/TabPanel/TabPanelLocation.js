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
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../components/Styles/DesignList/styles';
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

  { id: 'base', value: 'Базы' },
  { id: 'base/locations', value: 'Список местоположений' },
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
    $area:Float
    $cadastralNumber: String
    $purposeLocation: ID
    $comment: String

    $postcode: ID
    $legalAddress: ID

    $resolutionNumber:String
    $resolutionNumberDate: DateTime

    $areaAct:String
    $areaActDate: DateTime

    $rentContractEnd: DateTime
    $rentContractStart: DateTime
    $rentContractNumber: String
    $rentContractCreatedAt: DateTime
    $registrationStatusLocation: ID

    $constructionsRemove: [ID]
  ) {
    updateLocation(
      id: $id
      input: {
        area:$area
        cadastralNumber:$cadastralNumber
        purposeLocation:$purposeLocation
        comment: $comment

        postcode:$postcode
        legalAddress: $legalAddress

        resolutionNumber:$resolutionNumber
        resolutionNumberDate: $resolutionNumberDate

        areaAct:$areaAct
        areaActDate: $areaActDate

        rentContractEnd: $rentContractEnd
        rentContractStart: $rentContractStart
        rentContractNumber: $rentContractNumber
        rentContractCreatedAt: $rentContractCreatedAt
        registrationStatusLocation: $registrationStatusLocation

        constructionsRemove: $constructionsRemove
      }
    ) {
      location {
        id
      }
    }
  }
`;

export default function InnerForm(props) {
  const  [item, setItem] = useContext(locationContext);

  const history = useHistory();
  const [updateLocation] = useMutation(LOCATION_UPDATE);
  const [deleteLocation] = useMutation(LOCATION_DELETE);
  const Update = () => {
    console.log(item);
    let constructionIdList = null;
    if(item.construction && item.construction.edges) {
      constructionIdList = item.construction.edges.map(item => item.node.id);
    }

    updateLocation({ variables:  {
      ...item,
      purposeLocation: item.purposeLocation && item.purposeLocation.id,
      postcode: item.postcode && item.postcode.id,
      legalAddress: item.legalAddress && item.legalAddress.id,
      registrationStatusLocation: item.registrationStatusLocation && item.registrationStatusLocation.id,
      constructionsRemove: item.constructionsRemove && item.constructionsRemove
     } });

    // history.push(`/base/locations`);
    // history.go(0);
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
