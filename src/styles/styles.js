import styled from 'styled-components';

export const LeftBar = styled.div`
  border-right: 1px solid #d3dff0;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  width: 80px;
`;

export const StyledButton = styled.button`
  background: ${(props) => props.backgroundColor || 'grey'};
  padding: 13px 25px;
  border-radius: 4px;
  margin: 0 0 0 23px;
  font-family: "SF UI Display Light", sans-serif;
  white-space: nowrap;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff;
  border: none;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 35px 0;
`;

export const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
