import React from 'react';
import clsx from 'clsx';
import styled  from "styled-components";
import { Grid, Row } from 'react-flexbox-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';

import { colorAccent, fontFamily, fontSizeInput } from '../Style/Styles';


export const TrashSpacer = styled.div`
  margin-left: 2rem;
  display: inline-block;
`;

export const PenSpacer = styled.div`
  margin-left: 1rem;
  display: inline-block;
  float:right;
`;

export const TrashSearchSpacer = styled.div`
  margin-left: 2rem;
  display: inline-block;
`;

export const PenSearchSpacer = styled.div`
  margin-left: 2rem;
  display: inline-block;
  float:right;
`;

export const RadioLabel = styled.div`
  margin-left: 1rem;
  display: inline-block;
`;

export const GridNoPadding = styled(Grid)`
  padding: 0
`;

export const RowMargin1st = styled(Row)`
  margin-top: 1rem
`;

export const RowMargin2st = styled(Row)`
  margin-top: 2rem
`;

const useStylesRadio = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: colorAccent, // '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
export function StyledRadio(props) {
  const classes = useStylesRadio();

  return (
    <Radio
      checked={props.checked}
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
      onChange={props.onChange}
    />
  );
}


function SvgTransparentPen(props) {
  return (
    <svg x="0px" y="0px" viewBox="0 0 12.4 12.4" {...props}>
      <path d="M0.7,12.4c0.1,0,0.1,0,0.2,0l2.7-0.7c0.1,0,0.2-0.1,0.3-0.2L12,3.3c0.3-0.3,0.4-0.6,0.4-0.9S12.3,1.7,12,1.4
l-1.1-1.1c-0.5-0.5-1.4-0.5-1.9,0L0.9,8.6C0.8,8.7,0.7,8.8,0.7,8.9L0,11.5C0,11.8,0,12,0.2,12.2C0.3,12.3,0.5,12.4,0.7,12.4z
M10,1.3l1.1,1.1L10,3.4L8.9,2.4L10,1.3z M8,3.3L1.9,9.4l-0.4,1.4L3,10.4l6.1-6.1L8,3.3z"/>
    </svg>
  );
}

const StyledTransparentPen = styled(SvgTransparentPen)`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  fill: #6D88AF;
  fill-rule: evenodd;
  clip-rule: evenodd;
`;

function SvgTransparentPenBlock(props) {
  return (
    <div style={{display: "inline-block", padding: "0 .5rem 0 .5rem"}} {...props}>
      <StyledTransparentPen />
    </div>
  );
}

export const StyledPen = styled(SvgTransparentPenBlock)`
  cursor: pointer;
  opacity: 0.5;
  &:hover {
      opacity: 1;
  }
`;

function SvgTransparentTrash(props) {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" {...props}>
      <path d="M3.83577 17.3337C2.91661 17.3337 2.16911 16.5862 2.16911 15.667V5.66699H0.502441V4.00033H3.00244H3.83577V2.33366C3.83577 1.41449 4.58327 0.666992 5.50244 0.666992H10.5024C11.4216 0.666992 12.1691 1.41449 12.1691 2.33366V4.00033H13.0024H15.5024V5.66699H13.8358V15.667C13.8358 16.5862 13.0883 17.3337 12.1691 17.3337H3.83577ZM10.5024 2.33366H5.50244V4.00033H10.5024V2.33366ZM4.66911 5.66699H11.3358H12.1691L12.1699 15.667H3.83577V5.66699H4.66911ZM5.50244 7.33366H7.16911V14.0003H5.50244V7.33366ZM8.83577 7.33366H10.5024V14.0003H8.83577V7.33366Z" />
    </svg>
  );
}

const StyledTransparentTrash = styled(SvgTransparentTrash)`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  fill: #D42D11;
  fill-rule: evenodd;
  clip-rule: evenodd;
`;

function StyledTransparentTrashBlock(props) {
  return (
    <div style={{display: "inline-block", padding: "0 .5rem 0 .5rem"}} {...props}>
      <StyledTransparentTrash />
    </div>
  );
}

export const StyledTrash = styled(StyledTransparentTrashBlock)`
  cursor: pointer;
  opacity: 0.7;
  &:hover {
      opacity: 1;
  }
`;


export const messageStyle = {
  fontFamily: `${fontFamily}, sans-serif`,
  fontSize: fontSizeInput,
  lineHeight: fontSizeInput,
  fontWeight: 300,
  whiteSpace: "nowrap",
  paddingTop: "1rem"
}
