import React from 'react';

import { Button, Form, Select } from 'antd';
import styled from 'styled-components';
import { Col, Grid } from 'antd';

import { InputTitle } from '../Styles/StyledBlocks';
import { colorAccent, fontFamily, fontSizeInput, fontWeightInput } from '../Styles/Colors';

const { Option } = Select;

// export const SliderGrid = styled(Grid)`
//   padding: .7rem 2rem .7rem 1rem;
// `

export const SliderCellColRaw = styled(Col)`
  padding-top: .5rem;
`

export const adaptiveRow = {xl: 6, lg: 9, md: 12}

export const adaptivCol = {xl: 2, lg: 3, sm: 6}

export const OpacityInputTitle = styled(InputTitle)`
    opacity: 0;
`

export function SliderCol({children}) {
  return <SliderCellColRaw {...adaptivCol}>
    {children}
  </SliderCellColRaw>
}

export const StyledButtonSlider = styled(Button)`
  width: 100%;
  background: ${colorAccent} !important;
  padding: 13px 25px;
  border-radius: 4px;
  margin: 2rem 0 0 0;
  font-family: 'SF UI Display Light', sans-serif;
  white-space: nowrap;
  font-size: 14px;
  line-height: 14px;
  color: #ffffff !important;
  border: none;
  height: 2.5rem;
`

export const SliderFormItem = styled(Form.Item)`
  font-size: 12pt;
  font-weight: 700;
  margin-bottom: 0;
`;

export const StyledSelect = styled(Select)`
  font-family: ${fontFamily}, sans-serif;
  white-space: nowrap;
  font-size: ${fontSizeInput};
  line-height: ${fontSizeInput};
  font-weight: ${fontWeightInput};
  & .ant-select-dropdown {
      z-index: 9999;
  }
`;

export const StyledOption = styled(Option)`
  font-family: ${fontFamily}, sans-serif;
  font-size: ${fontSizeInput};
  line-height: ${fontSizeInput};
  font-weight: ${fontWeightInput};
`;
