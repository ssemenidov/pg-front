import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';

const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Добро пожаловать в Монтажи!" bordered={true} style={{ width: 300 }}>
        <Link to="/installations/projects">Подача разнарядки</Link>
        <Link to="/installations/orders"> Выгрузка разнарядки</Link>
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
