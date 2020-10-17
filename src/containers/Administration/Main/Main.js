import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';
import {adminRoutesArr} from './adminRoutes'

const Main = () => {
  return (
    <StyledDiv>
      <StyledCard title="Административная панель" bordered={true} style={{ width: 300 }}>
        {adminRoutesArr.map(({key, idx, to, name}) =>
          <Link key={key} to={to}>{name}</Link>
        )}
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
