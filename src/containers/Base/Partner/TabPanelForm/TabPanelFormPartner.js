import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

import { partnerContext } from '../Partner';
import PartnerInfo from '../../../../components/Panels/Partners/PartnerInfo/PartnerInfo';
import RelatedProjects from '../../../../components/Panels/Partners/RelatedProjects/RelatedProjects';
import RelatedBrands from '../../../../components/Panels/Partners/RelatedBrands/RelatedBrands';
import RelatedAdvertisers from '../../../../components/Panels/Partners/RelatedAdvertisers/RelatedAdvertisers';

import { STab, STabList, STabPanel, STabs } from '../../../../components/Styles/TabPanelsStyles';
import { ControlToolbar, ToolbarControl } from '../../../../components/Styles/ControlToolbarStyle';
import { BtnBrand, BtnExport, BtnPrint, BtnSettings } from '../../../../components/Styles/ButtonStyles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';

import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../styles/styles';

import print_icon from '../../../../img/outdoor_furniture/table_icons/print.svg';
import export_icon from '../../../../img/outdoor_furniture/table_icons/export_icon.svg';
import settings_icon from '../../../../img/outdoor_furniture/table_icons/setting.svg';

STabPanel.tabsRole = 'TabPanel';
STabList.tabsRole = 'TabList';
STab.tabsRole = 'Tab';
STabPanel.tabsRole = 'TabPanel';

const tabs = [
  { value: 'Общая информация' },
  { value: 'Связанные проекты' },
  { value: 'Связанные бренды' },
  { value: 'Связанные рекламодатели' },
];

const panel1 = <PartnerInfo />;
const panel2 = <RelatedProjects />;
const panel3 = <RelatedBrands />;
const panel4 = <RelatedAdvertisers />;

const PARTNER_DELETE = gql`
  mutation Delete($id: ID!) {
    deletePartner(id: $id) {
      deletedId
    }
  }
`;
const PARTNER_UPDATE = gql`
mutation(
  $id: ID!
 $title:String
 $comment:String
 $workingSector:ID
 $partnerType:ID
 $clientType:ID
 $binNumber:String

) 
{
  updatePartner(
    id: $id
    input:{
      title:$title
      comment:$comment
      workingSector:$workingSector
      binNumber:$binNumber
      partnerType:$partnerType
      clientType:$clientType
  
    }
  ) {
    partner {
     id
    
    }
}
}
`;

export default function TabPaneForm(props) {
  const [item, setItem] = useContext(partnerContext );
  const history = useHistory();

  const [updateConstruction] = useMutation(PARTNER_UPDATE);
  const [deleteConstruction] = useMutation(PARTNER_DELETE);
  const Update = () => {
    updateConstruction({ variables: {
      ...item,
      workingSector:item.workingSector && item.workingSector.id ,
      partnerType:item.partnerType && item.partnerType.id ,
      clientType:item.clientType && item.clientType.id 
    } });
      console.log({
        ...item,
        workingSector:item.workingSector.id });
    history.push(`/base/partners`);
    history.go(0);
  };
  const Delete = () => {
    deleteConstruction({ variables: { id: item.id } });
    history.push(`/base/partners`);
    history.go(0);
 
  };
  return (
    <form style={{ width: '100%' }}>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Контрагент - Юниверсал ТОО</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556"  onClick={Update} >Сохранить</StyledButton>
          <StyledButton backgroundColor="#d42d11"  onClick={Delete}>Удалить</StyledButton>
          {/* <StyledButton backgroundColor="#2c5de5">Создать договор</StyledButton> */}
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
                // console.log(tab.value, index)
                return <STab key={index}>{tab.value}</STab>;
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
          <STabPanel>{panel3}</STabPanel>
          <STabPanel>{panel4}</STabPanel>
        </STabs>
      </div>
    </form>
  );
}
