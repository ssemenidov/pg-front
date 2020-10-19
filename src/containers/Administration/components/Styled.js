import styled  from "styled-components";
import { Grid, Row } from 'react-flexbox-grid';

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
