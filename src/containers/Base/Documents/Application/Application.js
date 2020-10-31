import React, { createContext, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Layout, Breadcrumb } from 'antd';

import InnerForm from './TabPanelForm/TabPanelFormApplication';

import breadcrumbs from '../../../../img/outdoor_furniture/bx-breadcrumbs.svg';

const { Content, Sider } = Layout;

export const constructApplication = createContext();

const APPLICATION_ITEM = gql`
 query searchApplication($id: ID) {
    searchApplication(id: $id) {
      edges {
      node {
        id
        reservation {
          edges {
            node {
              dateFrom
              dateTo
            }
          }
        }
        project {
          title
          creator
          createdAt
          comment
          brand {
            id
            title
          }
          partner {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
    }
  }
`;

const ApplicationBase = (props) => {
  const [ id ] = useState(props.match.params.id);
  const [item, setItem] = useState({});

  const { error, data, loading } = useQuery( APPLICATION_ITEM, { variables: { id } } )

  useMemo(() => {
    if (data && data.searchApplication.edges.length) {
      setItem(data.searchApplication.edges[0].node);
    }
  }, [data]);
  if (error) return <h3>Error :(</h3>;
  if (loading) return <h3></h3>;

  return (
    <constructApplication.Provider value={[item, setItem]}>
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
              <Breadcrumb.Item>Бренды</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                minHeight: 280,
              }}>
              <InnerForm />
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
    </constructApplication.Provider>
  );
};

export default ApplicationBase;