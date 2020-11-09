import React, { useState, useEffect, useContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { agreementContext } from './Agreement';
import EditInfo from "./Blocks/EditIfo"
import Table from '../../../../components/Tablea';

import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../components/Styles/DesignList/styles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';

const CONTRACT_UPDATE = gql`
mutation(
  $id:ID!

  $initiator:String
  $creator:String
  $contractType: String
  $signatoryOne: String
  $signatoryTwo: String
  $basedOnDocument: String
  $returnStatus: Boolean
  $comment: String
) {
  updateContract(
    id:$id
    input: {

      initiator:$initiator
      creator:$creator
      contractType:$contractType
      signatoryOne:$signatoryOne
      signatoryTwo:$signatoryTwo
      basedOnDocument:$basedOnDocument
      returnStatus:$returnStatus
      comment:$comment

    }
  ) {
    contract {
      id
    }
  }
}
`;

const columns = [
  {
    title: 'Код договора',
    dataIndex: 'code',

    width: 130,
  },
  {
    title: 'Бренд',
    dataIndex: 'brand',

    width: 100,
  },
  {
    title: 'Сектор деятельности',
    dataIndex: 'sector',
    width: 100,
  },
  {
    title: 'Создано',
    dataIndex: 'create',
    width: 100,
  },
  {
    title: 'Создатель',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: 'Приложение',
    dataIndex: 'application',
    width: 100,
  },
];

var data = [
  {
    key: 1,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 2,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 3,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 4,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
  {
    key: 5,
    code: '#2020050301323',
    brand: 'CocaCola',
    sector: 'Производство напитков',
    create: '29.05.2020',
    creator: 'Колобов Анемподист',
    application: '02394.pdf',
  },
];
const PanelDesign = (props) => {
  const  [item, setItem] =useContext(agreementContext);
  const [updateContract] = useMutation(CONTRACT_UPDATE);
  const Update = (e) => {
    e.preventDefault();
    updateContract({ variables:
       item

        });

    // history.push(`/base/outdoor_furniture`);
    // history.go(0);
  };
  if (item.attachmentSet && item.attachmentSet.edges.length) {
    data = item.attachmentSet.edges.map((attach) => ({
      key: attach.node.id,

    }));
  }
  return (
    <div>
    <HeaderWrapper>
    <HeaderTitleWrapper>
      <TitleLogo />
      <JobTitle>Договор № 2020050301323</JobTitle>
    </HeaderTitleWrapper>
    <ButtonGroup>
      <StyledButton backgroundColor="#008556" onClick={Update} >
        Сохранить
      </StyledButton>
    </ButtonGroup>
  </HeaderWrapper>
    <div style={{ display: 'flex',marginBottom:"20px"  }}>
      <div style={{ flex: '1 0 40%', margin: '0 1vw 1vw 0' }}>
        <EditInfo></EditInfo>
      </div>
      <div style={{ display: 'flex', overflowX: 'hidden', width: '100%' }}>
        <div className="outdoor-table-bar">
          <Table style={{ width: '100%' }} columns={columns} data={data}  title={`Связанные проекты`}/>
        </div>
        <style>
          {`.outdoor-table-bar {
            width: 100%;
          }
          `}
        </style>
      </div>
    </div>
    </div>
  );
};

export default PanelDesign;
