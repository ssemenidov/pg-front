import React from 'react';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../styles/styles';
import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { Link } from 'react-router-dom';

const HeaderAgreement = () => {
  const links = [
    { id: '', value: 'Главная' },
    { id: 'base', value: 'Базы' },
    { id: 'base/projects', value: 'Список проектов' },
  ];

  return (
    <>
      <BreadCrumbs links={links} />
      <HeaderWrapper style={{ margin: 0 }}>
        <HeaderTitleWrapper>
          <TitleLogo />
          <JobTitle>Договор</JobTitle>
        </HeaderTitleWrapper>
        <ButtonGroup>
          <Link to="/base/documents/agreement">
            <StyledButton backgroundColor="#008556">Сохранить</StyledButton>
          </Link>
        </ButtonGroup>
      </HeaderWrapper>
    </>
  );
};

export default HeaderAgreement;
