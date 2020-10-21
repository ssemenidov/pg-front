import React from 'react';
import clsx from 'clsx';
import styled  from "styled-components";
import { Grid, Row } from 'react-flexbox-grid';
import { makeStyles } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';

import { colorAccent } from '../Style/Styles';

export const StyledPen = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

export const TrashSpacer = styled.div`
  margin-left: 3rem;
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

export const EditTrashImg = styled.img`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
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
