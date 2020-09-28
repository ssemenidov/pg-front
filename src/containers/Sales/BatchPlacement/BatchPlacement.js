import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Table, DatePicker, Checkbox, Select, Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PanelBatch from './PanelBatch';
import { LeftBar } from '../../../styles/styles';
import { useHistory } from 'react-router';

import FilterBar from './FilterBar';
import freeIcon from '../../../img/sales/free.svg';
import bookedIcon from '../../../img/sales/booked.svg';
import soldIcon from '../../../img/sales/sold.svg';
import advertisingIcon from '../../../img/sales/advertising-side-header.svg';
import breadcrumbs from '../../../img/outdoor_furniture/bx-breadcrumbs.svg';
import collapseDownIcon from '../../../img/input/collapse-down.svg';
import SearchBtn from '../../../components/LeftBar/SearchBtn';
import CreateBtn from '../../../components/LeftBar/CreateBtn';

const { Content, Sider } = Layout;

const BatchPlacement = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [reservationTab, setReservationTab] = useState(true);
  const [cityTab, setCityTab] = useState(true);
  const [parametersTab, setParametersTab] = useState(true);
  const history = useHistory();
  return (
    <Layout>
      <Layout>
        <StyledSider>
          <StyledSider>
            <LeftBar>
              <SearchBtn onClick={() => setCollapsed(!collapsed)} />
              <CreateBtn
                text="Создать проект"
                onClick={() => {
                  history.push('/sales/project_new');
                }}
              />
            </LeftBar>
          </StyledSider>
        </StyledSider>
        {collapsed && <FilterBar />}
        <StyledLayout>
          <StyledBreadcrumb>
            <Breadcrumb.Item>
              <img src={breadcrumbs} />
              <Link to="/">Главная</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/sales/">Продажи</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Пакетное размещение</Breadcrumb.Item>
          </StyledBreadcrumb>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <img src={advertisingIcon} />
              <h2
                style={{
                  fontSize: '24px',
                  color: '#003360',
                  fontWeight: '600',
                  fontFamily: 'SF UI Display Medium, sans-serif',
                }}>
                Пакетное размещение
              </h2>
            </div>
            <Button type="primary" className="header-page-btn">
              <span>Создать отчет</span>
              <img src={collapseDownIcon} />
            </Button>
          </div>

          <Content>
            <PanelBatch style={{ flex: '0 1 auto' }} />
          </Content>
        </StyledLayout>
      </Layout>
      <style>{`
        .filter-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          color: #171717 !important;
          font-weight: 600;
        }
        .filter-panel-header img {
          cursor: pointer;
        }
        .filter-panel-title {
          height: 65px;
          align-items: flex-end;
          text-transform: uppercase;
        }
        .filter-panel-title strong {
          color: #003360 !important;
        }
        .filter-panel-date {
          flex-direction: column;
        }
        .filter-panel-date span {
          font-weight: 600;
          color: #1A1A1A !important;
        }
        .filter-datepicker {
          margin-top: 20px;
        }
        .filter-panel-status {
          display: flex;
          flex-direction: column;
        }
        .filter-panel .custom-checkbox {
          margin: 0 !important;
        }
        .filter-panel-status > div > div {
          display: flex;
          align-items: center;
        }
        .filter-panel-status > div > div span {
          color: #1A1A1A !important;
        }
        .filter-panel > div > div > span {
          color: #1A1A1A !important;
        }
        .dot-1 {
          height: 8px;
          margin: 0 4px;
          width: 8px;
          background-color: #63D411;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-2 {
          height: 8px;
          margin: 0 4px;
          width: 8px;
          background-color: #117BD4;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-3 {
          height: 8px;
          margin: 0 4px;
          width: 8px;
          background-color: #FDC911;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-4 {
          height: 8px;
          margin: 0 4px;
          width: 8px;
          background-color: #D42D11;
          border-radius: 50%;
          display: inline-block;
        }
        .filter-panel-city {
          display: flex;
          flex-direction: column;
        }
        .ant-select ant-select-selection-item span {
          color: #656565 !important;
        }
      
        .filter-panel-parameters {
          display: flex;
          flex-direction: column;
        }
        .checkbox-block > span {
          color: #1A1A1A !important;
          margin-left: 8px;
        }
        .filter-panel-purpose {
          display: flex;
          flex-direction: column;
        }
        .group-btn {
          justify-content: space-between;
        }
        .clear-btn, .search-btn {
          border-radius: 4px;
          width: 45%;
        }
        .clear-btn span {
          color: #2C5DE5 !important;
          font-weight: 600;
        }
        .clear-btn {
          background: #EEF3FF;
          border: 1px solid #2C5DE5;
        }
        .search-btn {
          background: #2C5DE5;
        }
        .search-btn span {
          color: #FFF !important;
        }
        .search-btn:hover span , .search-btn:active span {
          color: #2C5DE5 !important;
        }
        .header-bar {
          display: flex;
          background: #E7EEF8;
          margin-bottom: 10px;
          border-radius: 4px;
          border: 1px solid #D3DFF0;
          height: 45px;
          padding: 5px;
          justify-content: space-between;
        }
        .header-bar > div {
          display: flex;
        }
        .header-bar > div > div {
          display: flex;
        }
        .header-btn {
          border: 1px solid #D3DFF0;
          margin-right: 5px;
          width: 32px;
          height: 32px;
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .header-date-btn {
          display: flex;
          justify-content: space-between;
        }
        .header-date-btn span {
          color: #252525 !important;
        }
        .header-page-btn {
          border-radius: 4px;
          background: #FF5800;
          display: flex;
          align-items: center;
          padding: 15px 30px;
          border: 1px solid #FF5800 !important ;
        }
        .header-page-btn span {
          color: #fff !important;
          font-weight: 600;
        }
        .header-page-btn:active, .header-page-btn:hover, .header-page-btn:focus {
          background: #FF5800 !important;
        }
      `}</style>
    </Layout>
  );
};

export default BatchPlacement;

const StyledLayout = styled(Layout)`
  background: #fff !important;
  height: 100% !important;
  padding: 30px 30px 0 30px;
`;

const StyledSider = styled(Sider)`
  background: #f5f7fa;
  min-width: 60px !important;
  max-width: 60px !important;
  border-right: 1px solid #d3dff0 !important;
`;

const LeftBarList = styled.ul`
  padding: 10px 5px !important;
`;

const ListItem = styled.li`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 55px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 1px solid #d3dff0;
  margin-bottom: 15px;

  span {
    text-align: center;
    line-height: normal;
    margin: 10px 0;
    color: #003360 !important;
    font-size: 11px;
  }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  font-size: 11px;
  margin: 0 0 20px 0;

  a,
  span {
    color: #8aa1c1 !important;
  }

  img {
    margin: 0 8px 0 0;
  }
`;

const StyledTable = styled(Table)`
  th,
  td {
    color: #1a1a1a !important;
    font-weight: 600 !important;
  }

  .ant-table {
    border: 1px solid #d3dff0 !important;
    border-radius: 8px;
  }

  .ant-table-row td:not(:first-child) {
    padding: 5px !important;
  }

  th {
    background: transparent !important;
  }

  .ant-table-body tr td:not(:first-child) {
    background: #f5f7fa !important;
  }
`;

const StyledFilterPanel = styled.div`
  width: 240px;
  background: #f5f7fa;
  border-right: 1px solid #d3dff0;

  & > div {
    display: flex;
    padding: 20px 15px;
    border-bottom: 1px solid #d3dff0;
  }
`;
