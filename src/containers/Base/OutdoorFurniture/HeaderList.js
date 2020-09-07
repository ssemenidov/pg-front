import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../components/Styles/ComponentsStyles';
import React from 'react';
import { useHistory } from 'react-router';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../styles/styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../components/Styles/StyledBlocks';

export default function HeaderList() {
  const history = useHistory();

  const routeChange = () => {
    let path = `/base/construction`;
    history.push(path);
  };

  const links = [
    { id: 'home', value: 'Главная' },
    { id: 'installation', value: 'Базы' },
    { id: 'constructions', value: 'Конструкции' },
  ];

  return (
    <>
      <HeaderWrapper>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Конструкции</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <StyledButton backgroundColor="#008556" onClick={routeChange}>
            Создать конструкцию
          </StyledButton>
        </ButtonGroup>
      </HeaderWrapper>
    </>
  );
}
