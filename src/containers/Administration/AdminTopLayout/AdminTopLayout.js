import { Layout } from 'antd';
import { AdministrationBreadcrumb } from '../components/AdminBreadcrumb';
import { HeaderWrapper, StyledButton } from '../../../styles/styles';
import { HeaderTitle } from '../components/HeaderTitle';
import { adminTitle } from '../Main/adminRoutes';
import { BtnExport, BtnPrint, BtnSettings, ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { colorAccent } from '../Style/Styles';
import { NavigationPanel } from '../components/NavigationPanel';
import React from 'react';

export function AdminTopLayout({children, activeRoute, buttonName, buttonClickHandler}) {
  return (
    <Layout>
      <Layout>
        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <AdministrationBreadcrumb location={activeRoute} />
          <HeaderWrapper>
            <HeaderTitle title={adminTitle} />
            {
              buttonName && <ButtonGroup>
                <StyledButton backgroundColor={colorAccent} onClick={buttonClickHandler}>
                  {buttonName}
                </StyledButton>
              </ButtonGroup>
            }
          </HeaderWrapper>
          <NavigationPanel activeItem={activeRoute}></NavigationPanel>
          <div style={{ display: 'flex' }}>
            {children}
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
}
