import styled from 'styled-components';
import { Select, Input, DatePicker } from 'antd';

export const LeftBar = styled.div`
  border-right: 1px solid #d3dff0;
  background-color: #f5f7fa;
  display: flex;
  alight-items: center;
  flex-direction: column;
<<<<<<< HEAD
  width: 60px;
=======
  min-width: 60px;
  max-width: 60px;
>>>>>>> ce94380bf0f0431b270030a453ef417744c5a209
`;

export const StyledButton = styled.button`
  background: ${(props) => props.backgroundColor || 'grey'};
  padding: 13px 25px;
  border-radius: 4px;
  margin: 0 0 0 23px;
  font-family: 'SF UI Display Light', sans-serif;
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

// Input components

export const StyledSelect = styled(Select)`
  color: #656565;
  display: flex;
  align-items: center;

  & > div {
    height: 40px !important;
    display: flex;
    align-items: center;
  }

  .ant-select-selection-item span {
    color: #656565 !important;
    margin-left: 5px;
  }
`;

export const StyledInput = styled(Input)`
  height: 40px;
  color: #656565;
`;

export const StyledDatePicker = styled(DatePicker)`
  height: 40px;
  width: 100%;
`;
