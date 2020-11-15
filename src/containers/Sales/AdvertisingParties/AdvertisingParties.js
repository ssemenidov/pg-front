import React, { Component, useState } from 'react';
import { Layout, Menu, Breadcrumb, Table, DatePicker, Checkbox, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Resizable } from 'react-resizable';
import { LeftBar, StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../components/Styles/DesignList/styles';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs'

import PanelAdver from './PanelAdver';
import FilterBar from './FilterBar';
import { FilterLeftBar } from './FilterLeftBar';

import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import CreateBtn from '../../../components/LeftBar/CreateBtn';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import './styles.scss'

const { Content, Sider } = Layout;

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  );
};


const links = [
  { id: 'sales', value: 'Продажи' },
  { id: 'sales/advertising_parties', value: 'Справочник рекламных сторон' },
];


const AdvertisingParties = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Layout>
      <Layout>
        <FilterLeftBar props={setCollapsed, collapsed}/>
        {collapsed && <FilterBar />}
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <BreadCrumbs links={links}/>
          <HeaderWrapper>
            <HeaderTitleWrapper>
              <TitleLogo />
              <JobTitle>Справочник рекламных сторон</JobTitle>
            </HeaderTitleWrapper>
            <ButtonGroup>
              <StyledButton backgroundColor="#FF5800">Создать отчет</StyledButton>
            </ButtonGroup>
          </HeaderWrapper>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <PanelAdver style={{ flex: '0 1 auto' }} />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default AdvertisingParties;
