import React, { useMemo, useState ,createContext} from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import PanelAgreement from './PanelAgreement';

import { Layout, Menu, Breadcrumb, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

import breadcrumbs from '../../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import { TitleLogo } from '../../../../components/Styles/ComponentsStyles';
import { HeaderWrapper, HeaderTitleWrapper, StyledButton } from '../../../../styles/styles';
import { ButtonGroup } from '../../../../components/Styles/ButtonStyles';
import { JobTitle } from '../../../../components/Styles/StyledBlocks';
export const agreementContext = createContext();
const { Header, Content, Sider } = Layout;
const AGREEMENT_ITEM = gql`
  query SearchContract(
    $id:ID!
  )
    {
    searchContract(
      id:$id
    ) {
      edges {
        node {
          id
          creator
          initiator
          contractType
          paymentDate
          signatoryOne
          signatoryTwo
          basedOnDocument
          returnStatus
          contractPdf
          additionallyAgreement
          comment
          createdAt
          updatedAt

        }
      }
    }
  }
`;
const OutdoorFurniture = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [item, setItem] = useState({});
  
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const { error, data, loading } = useQuery(AGREEMENT_ITEM , { variables: { id: id } });
    useMemo(() => {
    if (data) {
      console.log(data);
      setItem(data.searchContract.edges[0].node);
    }
  }, [data]);
  console.log(item);
  // if (error) return <h3>Error :(</h3>;
  // if (loading) return <h3></h3>;

  return (
    <Layout>
      <Layout>
        <Sider className="layout-sider"></Sider>

        <Layout className="layout-main" style={{ padding: '30px 30px 0 30px' }}>
          <Breadcrumb className="layout-breadcrumb">
            <Breadcrumb.Item>
              <img src={breadcrumbs} style={{ margin: '0 8px 0 0' }} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/base/">Базы</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Список Проектов</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}>
            <HeaderWrapper>
              <HeaderTitleWrapper>
                <TitleLogo />
                <JobTitle>Проект</JobTitle>
              </HeaderTitleWrapper>
              <ButtonGroup>
                <StyledButton backgroundColor="#008556" onClick={() => history.push(`/base/documents/agreement/123`)}>
                  Сохранить
                </StyledButton>
              </ButtonGroup>
            </HeaderWrapper>
            <div style={{ display: 'flex' }}>
              <PanelAgreement style={{ flex: '0 1 auto' }} />
            </div>
          </Content>
        </Layout>
      </Layout>
      <style>
        {`
          .layout-main {
            background: #fff !important;
            height: 100% !important;
          }
          .layout-sider {
            background: #F5F7FA;
            min-width: 60px !important;
            max-width: 60px !important;
            border-right: 1px solid #d3dff0 !important;
          }
          .layout-breadcrumb {
            font-size: 11px;
            margin: 0 0 20px 0;
          }
          .layout-breadcrumb a, .layout-breadcrumb span {
            color: #8AA1C1 !important;
          }
        `}
      </style>
    </Layout>
  );
};
export default OutdoorFurniture;
