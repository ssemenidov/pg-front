import React, { useContext, useEffect, useMemo } from 'react';
import { constructContext } from '../../../../../containers/Base/Construction/Construction';
import { useQuery, gql, useMutation } from '@apollo/client';

import { BlockBody, BlockTitle, BlockTitleText, Large } from '../../../../Styles/StyledBlocks';
import { BtnSuccess } from '../../../../Styles/ButtonStyles';
import ExtraRow from './Extras/ExtraRow';
const SiDE_CREATE = gql`
  mutation CreateConstructionSide(
    $id: ID
  ){
    createConstructionSide(input: {
      construction: $id
    }) {
      constructionSide {
        id
      }
    }
  }
`;
export default function Sides() {
  const [item, setItem] = useContext(constructContext);
  const [createConstruction, { data }] = useMutation(SiDE_CREATE);
  const create=(e)=>{
    createConstruction({variables:item});
  }

 
  return (
    <Large>
      <BlockTitle>
        <BlockTitleText>Стороны конструкции</BlockTitleText>
        <BtnSuccess onClick={create}>Добавить сторону</BtnSuccess>
      </BlockTitle>
      <BlockBody>
        {item.constructionSide && item.constructionSide.edges.map((side,index) => {
          return (
            <div key={index}>
              <ExtraRow
              index={index}

              />
            </div>
          );
        })}
      
      </BlockBody>
    </Large>
  );
}
