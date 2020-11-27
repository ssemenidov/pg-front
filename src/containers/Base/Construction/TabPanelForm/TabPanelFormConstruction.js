import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { constructContext } from '../Construction';
import BackOffice from '../../../../components/Panels/Construction/BackOffice/BackOffice';
import TechDept from '../../../../components/Panels/Construction/TechDept/TechDept';
import AccDept from '../../../../components/Panels/Construction/AccDept/AccDept';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar } from '../../../../components/Styles/ControlToolbarStyle';
import Other from '../../../../components/Panels/Construction/OtherConstr/Other';
import ConstructionHist from '../../../../components/Panels/Construction/History/ConstructionHist';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../components/Styles/DesignList/styles';
import { routes } from '../../../../routes';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';

const tabs = [
  { value: 'Бэк офис' },
  { value: 'Технический отдел' },
  { value: 'Бухгалтерия' },
  { value: 'Другое' },
  { value: 'История' },
];


const CONSTRUCT_DELETE = gql`
  mutation Delete($id: ID!) {
    deleteConstruction(id: $id) {
      deletedId
    }
  }
`;
const CONSTRUCT_UPDATE = gql`
  mutation ($id: ID!,
    $isNonRts: Boolean,
    $nonrtsOwner: ID,
    $backComment: String
    $crew: ID
    $techInventNumber: String
    $techPhoneConstruction: String
    $techProblem: String
    $statusConnection: Boolean
    $obstruction: String
    $buhInventNumber: String
    $otherLink: String
  ) {
    updateConstruction(id: $id
      input: {
        isNonrts: $isNonRts
        nonrtsOwner: $nonrtsOwner
        backComment: $backComment
        crew: $crew
        techInventNumber: $techInventNumber
        techPhoneConstruction: $techPhoneConstruction
        techProblem: $techProblem
        statusConnection: $statusConnection
        obstruction: $obstruction
        buhInventNumber: $buhInventNumber
        presentationUrl: $otherLink
      }) {
      construction {
        id
      }
    }
  }
`;
const InnerForm = (props) => {
  const [item, setItem] = useContext(constructContext);
  const history = useHistory();

  const [updateConstruction] = useMutation(CONSTRUCT_UPDATE);
  const [deleteConstruction] = useMutation(CONSTRUCT_DELETE);

  const Update = (e) => {
    history.push('/base/outdoor_furniture')
    e.preventDefault();
    updateConstruction({ variables: {
       ...item,
        // TODO: PTCDEC-225 Реализовать логику обновления местоположений для конструкций. Все адресные данные вынесены
        //  в Location. Нужно искать Location при обновлении и если его нет, создавать новый.
        // city:item.city && item.city.id,
        // district:item.district && item.district.id,
        // postcode:item.postcode && item.postcode.id,
        crew:item.crew && item.crew.id,
        isNonRts: false
       } });

    // history.push(`/base/outdoor_furniture`);
    // history.go(0);
  };
  const Delete = () => {
    deleteConstruction({ variables: { id: item.id } });
    history.push(`/base/outdoor_furniture`);
    history.go(0);

  };
  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Конструкция номер </JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556" onClick={Update}>
            Сохранить
          </StyledButton>

          {/* <StyledButton backgroundColor="#2c5de5">Создать конструкцию</StyledButton> */}
          <StyledButton backgroundColor="#d42d11" onClick={Delete}>
            Демонтировать
          </StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
      <div>
        <STabs selectedTabClassName="is-selected" selectedTabPanelClassName="is-selected">
          <ControlToolbar position="static">
            <STabList>
              {tabs.map((tab, index) => {
                return <STab key={index}>{tab.value}</STab>;
              })}
            </STabList>
          </ControlToolbar>
          <STabPanel><BackOffice /></STabPanel>
          <STabPanel><TechDept /></STabPanel>
          <STabPanel><AccDept /></STabPanel>
          <STabPanel><Other /></STabPanel>
          <STabPanel><ConstructionHist /></STabPanel>
        </STabs>
      </div>
    </form>
  );
};

export default InnerForm;
