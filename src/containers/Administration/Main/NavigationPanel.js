import React from 'react';

import styled from 'styled-components';

import {adminRoutesArr} from './adminRoutes';
import {colorAccent, colorBackgroundLightBlue, borderRadius, colorTextWhite, borderRadiusInternal} from './Styles'
import {colorTextBlack} from './Styles'
import { Link } from 'react-router-dom';
import { ControlToolbar } from '../../../components/Styles/ControlToolbarStyle';
import { STab, STabList } from '../../../components/Styles/TabPanelsStyles';
import { Layout } from 'antd';

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
        return <Link to={tab.to} className="LinkStyle">
          <STab key={tab.idx} className={tab.idx === activeItem.idx ? "is-selected" : ""}>
            {tab.name}
          </STab>
        </Link>
      })}
    </STabList>
  </ControlToolbar>
}
