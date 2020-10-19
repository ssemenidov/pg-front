import React from 'react';

import styled from 'styled-components';

import {adminRoutesArr} from '../Main/adminRoutes';
import {colorAccent, colorBackgroundLightBlue, borderRadius, colorTextWhite, borderRadiusInternal} from '../Style/Styles'
import {colorTextBlack} from '../Style/Styles'
import { Link } from 'react-router-dom';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { STab, STabList } from '../../../components/Styles/TabPanelsStyles';
import { Layout } from 'antd';


const StyledLink = styled(Link)`
  color: #000000;
`

export function NavigationPanel({activeItem}) {
  const activeItemStyle = {
    backgroundColor: colorAccent,
    color: colorTextWhite
  };
  const inactiveItemStyle = {
    color: colorTextBlack
  };

  return <ControlToolbar position="static">
    <STabList>
      {adminRoutesArr.map(tab => {
        // console.log(tab.value, index)
        return (
          <StyledLink key={tab.idx} to={tab.to}>
            <STab className={tab.idx === activeItem.idx ? "is-selected" : ""}>
              {tab.name}
            </STab>
          </StyledLink>
        )
      })}
    </STabList>
  </ControlToolbar>
}

