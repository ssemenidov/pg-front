import React, { useEffect, useState } from 'react';
import { PageWrap } from '../../../../components/Styles/ComponentsStyles';
import SearchBtn from '../../../../components/LeftBar/SearchBtn';
import LeftBar from '../../../../components/LeftBar/LeftBar';
import TabPanelFormPartners from './TabPanelFormPartners';
import { ContentWrap } from '../../../../components/Styles/ComponentsStyles';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { getCurrentPartner, resetCurrentPartner } from '../../../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Content, Sider } = Layout;

export default function PartnerGeneralInfo(props) {
  const [showSearchBtn, setSearchBtn] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [index, setIndex] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof props.match.params.id != 'undefined') {
      dispatch(getCurrentPartner(props.match.params.id));
    } else {
      dispatch(resetCurrentPartner());
    }
  }, [props.match]);

  const handleTasSelected = (index) => {
    setIndex(index);
    if (index === 0) {
      setSearchBtn(false);
    } else setSearchBtn(true);
  };

  return (
    <Layout>
      <Layout>
        <StyledSider>{showSearchBtn ? <SearchBtn onClick={() => setCollapsed(!collapsed)} /> : null}</StyledSider>
        <TabPanelFormPartners selectedTab={handleTasSelected} index={index} />
      </Layout>
    </Layout>
  );
}

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;
