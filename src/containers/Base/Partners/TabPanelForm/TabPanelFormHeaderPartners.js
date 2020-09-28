import BreadCrumbs from '../../../../components/BreadCrumbs/BreadCrumbs';
import { ListHeader, ListTitle, Title, TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import React from 'react';
import { useHistory } from 'react-router';
import { StyledButton } from '../../../../styles/styles';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { updateContragent } from '../../../../store/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function HeaderList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.contragents.currentContragent);

  const routeChange = (e) => {
    dispatch(updateContragent(state));
    alert('Кнопка работает // Функционал ожидается после соединения с базой данных');
    e.preventDefault();
    // let path = `/base/partners/`;
    // history.push(path);
  };

  const links = [
    { id: 'home', value: 'Главная' },
    { id: 'installation', value: 'Базы' },
    { id: 'constructions', value: 'Контрагенты' },
  ];

  return (
    <>
      <Grid fluid className="resetPadding">
        <Row className="resetPadding">
          <Col xs={12}>
            <BreadCrumbs links={links} />
          </Col>
        </Row>
        <Row className="ListTitleInfo">
          <Col xs className="ListTitleHeader">
            <TitleLogo />
            <Title>Контрагенты</Title>
          </Col>
          <Col xs className="ListTitleInfoButton">
            <StyledButton backgroundColor="#008556" onClick={routeChange}>
              Сохранить
            </StyledButton>
            <StyledButton backgroundColor="#D42D11" onClick={routeChange}>
              Удалить
            </StyledButton>
            <StyledButton backgroundColor="#2C5DE5" onClick={routeChange}>
              Создать договор
            </StyledButton>
          </Col>
        </Row>
      </Grid>
    </>
  );
}
