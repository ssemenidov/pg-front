import React from 'react';
import InputAnchor from '../../../components/Inputs/InputAnchor';
import Multiline from '../../../components/Inputs/Multiline';
import SelectAnchor from '../../../components/Inputs/SelectAnchor';
import { BlockBody, Medium, Row, Column, BlockTitle, InputTitle } from '../../../components/Styles/StyledBlocks';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { StyledButton } from '../../../styles/styles';
import { colorAccent } from '../Main/Styles';
import { ButtonGroup } from '../../../components/Styles/ButtonStyles';
// import { sendContragentValues } from '../../../../../store/actions/actions';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-multiline': {
      height: 123,
      width: '100%',
    },
  },
}));

export default function AdminConstructionItem({title}) {
  const classes = useStyles();
  const state = useSelector((state) => state.contragents.currentContragent);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <Medium style={{ height: '100%' }}>
      <BlockTitle>{title}</BlockTitle>
    </Medium>
  );
}
