import React, { useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { partnerContext } from '../../../../../containers/Base/Partner/Partner';
import { StyledInput, StyledSelect, StyledDatePicker } from '../../../../Styles/DesignList/styles';

import { BlockBody, Large, Row, BlockTitle, InputTitle } from '../../../../Styles/StyledBlocks';
import styled from 'styled-components';
import anchorIcon from '../../../../../img/input/anchor.svg';
const InputWrapper = styled.div`
  width: 22%;
`;
const AGENCY_T = gql`
    {
      searchAgencyCommissionType {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
const AGENCY_DISTRIBUTE_T = gql`
    {
      searchAgencyCommissionDistribute {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  `;
export default function Commissions() {
  const [item, setItem] = useContext(partnerContext);
  const agency = useQuery( AGENCY_T).data;
  const agencyDistribute = useQuery( AGENCY_DISTRIBUTE_T).data;

  if (!agency || !agencyDistribute ) {
    return <span></span>;
  }
  return (
    <Large>
      <BlockTitle style={{ padding: '15px 26px 15px 24px' }}>Агентская коммисия</BlockTitle>
      <BlockBody>
        <Row>
          <InputWrapper>
            <InputTitle>Тип АК</InputTitle>
            <StyledSelect
              defaultValue={item.agencyCommissionType ? item.agencyCommissionType.id: <img src={anchorIcon} />  }
              onChange={(value) => setItem({ ...item, agencyCommissionType: { ...item.agencyCommissionType, id: value } })}>
              {agency && agency.searchAgencyCommissionType.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={anchorIcon} />
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>Агентская коммисия</InputTitle>
            <StyledInput
              prefix={<img src={anchorIcon} />}
              defaultValue={item.agencyCommission ? item.agencyCommission : ''}
              onChange={(e) => setItem({ ...item, agencyCommission: e.target.value })}
            ></StyledInput>
          </InputWrapper>
          <InputWrapper>
            <InputTitle>АК распространяется</InputTitle>
            <StyledSelect
              defaultValue={item.isAgencyCommissionWithNds ? item.isAgencyCommissionWithNds : <img src={anchorIcon} />}
              onChange={(value) => setItem({ ...item, isAgencyCommissionWithNds: value })}
            >
              <StyledSelect.Option key="yes" value={true}>
                <img src={anchorIcon} />
                <span>на сумму с НДС</span>
              </StyledSelect.Option>
              <StyledSelect.Option key="no" value={false}>
                <img src={anchorIcon} />
                <span>на сумму без НДС</span>
              </StyledSelect.Option>
            </StyledSelect>

          </InputWrapper>
          <InputWrapper>
            <InputTitle>На какие услуги распространяется АК</InputTitle>
            <StyledSelect
              defaultValue={item.agencyCommissionDistribute ? item.agencyCommissionDistribute.id: <img src={anchorIcon} />  }
              onChange={(value) => setItem({ ...item, agencyCommissionDistribute: { ...item.agencyCommissionDistribute, id: value } })}
            >
              {agencyDistribute && agencyDistribute.searchAgencyCommissionDistribute.edges.map((item)=>
                <StyledSelect.Option key ={item.node.id} value={item.node.title}>
                  <img src={anchorIcon} />
                  <span>{item.node.title}</span>
                </StyledSelect.Option>
              )}
            </StyledSelect>
          </InputWrapper>
        </Row>
      </BlockBody>
    </Large>
  );
}
