import { BreadCrumbsRoutes } from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import React from 'react';
import { useHistory } from 'react-router';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';

import {routes} from '../../../routes';

const HeaderSales = () => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/base/construction`;
    history.push(path);
  };

  return (
    <>
      <BreadCrumbsRoutes links={[routes.root.root, routes.sales.root, routes.sales.batch_placement]} />
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Пакетное размещение</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#FF5800" onClick={routeChange}>
            Создать отчет
          </StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
    </>
  );
}

export default HeaderSales;
