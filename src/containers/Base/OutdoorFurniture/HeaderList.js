import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import {
  ListHeader,
  ListTitle,
  StyledButton,
  Title,
  TitleLogo,
} from '../../../components/Styles/ComponentsStyles';
import React from 'react';
import { useHistory } from 'react-router';

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
      <BreadCrumbs links={links} />
      <ListHeader>
        <ListTitle>
          <TitleLogo />
          <Title>Конструкции</Title>
        </ListTitle>
        <StyledButton onClick={routeChange}>Создать конструкцию</StyledButton>
      </ListHeader>
    </>
  );
}
