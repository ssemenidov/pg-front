import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';

const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Добро пожаловать в Продажи!" bordered={true} style={{ width: 300 }}>
        <Link to="/sales/advertising_parties">Справочник рекламных сторон</Link>
        <Link to="/sales/batch_placement">Пакетное размещение</Link>
        <Link to="/sales/com_projects">Коммерческие проекты</Link>
        <Link to="/sales/invoice">Счета</Link>
      </StyledCard>
    </StyledDiv>
  );
};

export default Main;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
`;

const StyledCard = styled(Card)`
  & > div {
    display: flex;
    flex-direction: column;
  }
`;
