import React, { useEffect, useMemo, useState, createContext } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import InnerForm from './TabPanelForm/TabPanelFormPartner';

import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export const partnerContext = createContext();
const PartnersInfo = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [item, setItem] = useState({});
  const PARTNER_ITEM = gql`
  query SearchPartner($id: ID!) {
    searchPartner(id: $id) {
      edges {
        node {
          id
          title
          workingSector {
            id
            title
          }
          comment

          partnerType {
            id
            title
          }
          clientType {
            id
            title
          }
          binNumber
          city {
            title
            id
          }
          district {
            title
            id
          }
          postcode
          legalAddress
          actualAddress
          bankRecipient
          iik
          bik
          kbe
          agencyCommissionType{
            id
          }
          agencyCommission
          agencyCommissionNds{
            id
          }
          contactPerson {
            edges {
              node {
                id
                name
                email
                phone
              }
            }
          }






        }
      }
    }
  }
`;

const { error, data, loading } = useQuery(PARTNER_ITEM, { variables: { id: id } });

useMemo(() => {
  if (data) {
    setItem(data.searchPartner.edges[0].node);
  }
}, [data]);
console.log(item);
if (error) return <h3>Error :(</h3>;
if (loading) return <h3></h3>;
  return (
    <partnerContext.Provider value={ [item, setItem]}>
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
            <Breadcrumb.Item>Контрагенты</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}>
            <InnerForm  constructionID={props.match.params.id} />
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
          .layout-breadcrumb a,.layout-breadcrumb  span {
            color: #8AA1C1 !important;
          }
        `}
      </style>
    </Layout>
    </partnerContext.Provider>
  );
};

export default PartnersInfo;
