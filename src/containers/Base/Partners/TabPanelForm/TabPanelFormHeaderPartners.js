import React from 'react';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';

import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { StyledButton, HeaderWrapper, HeaderTitleWrapper } from '../../../../styles/styles';

export default function TabPanelHeader(props) {
  return (
    <>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Контрагент - Юниверсал ТОО</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556">Сохранить</StyledButton>
          <StyledButton backgroundColor="#d42d11">Удалить</StyledButton>
          <StyledButton backgroundColor="#2c5de5">Создать договор</StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
    </>
  );
}
