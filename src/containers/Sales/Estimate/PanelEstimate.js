import React, { useState, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { EstimateContext } from './Estimate';
import { useParams } from 'react-router-dom';
import { getBookedSides, getEstimateReservations, getExtraCosts, gettNonRts, EditCosts, DeleteModal, CreateCosts } from './utils';
import {
  DELETE_ADD_COSTS_QUERY,
  DELETE_NON_RTS,
} from './q_mutations';

import {
  SEARCH_SALES_ESTIMATE_ITOGS,
  NON_RTS_QUERY,
  ATTACHMENT_BOOKED_SIDES_QUERY,
  EXTRA_COSTS_QUERY,
  PROJECT_BOOKED_SIDES_QUERY,
  PROJECT_EXTRA_COSTS_QUERY,
  PROJECT_NON_RTS_QUERY,
} from './q_queries';


import { CustomTabBtn, CustomTabList } from '../../../components/Styles/DesignList/styles';

import Table from '../../../components/TableResizable/Table';
import Tablea from '../../../components/Tablea/Tablea';
import HeaderBar from '../../../components/HeaderBar';

import {
  initColumnsForPopupBookedSides,
  initColumnsTableBookedSides,
  initColumnsForPopupExtraCharge,
  initColumnsTableExtraCharge,
  initColumnsForPopupHotPtc,
  initColumnsTableHotPtc,
} from './stubDataSource';
import { useQuery, useMutation } from '@apollo/client';

const PanelDesign = ({ setBlock, created, setCreated }) => {
  const [activeTab, setActiveTab] = useState('booked-sides');
  const params = useParams();
  const attachmentId = params.appId;
  const projectId = params.id;
  const [editingItem, setEditingItem] = useState({});
  const [deleted, setDeleted] = useState(false);
  const { sort, setSort, openEditModal, setOpenEditModal, periodFilter, setPeriodFilter } = useContext(EstimateContext);
  let extraCosts = [];

  useEffect(() => {
    const refetchData = async () => {
      return await refetch();
    };
    refetchData();
  }, [activeTab]);

  useEffect(() => {
    const refetchData = async () => {
      return await salesEstimateQuery.refetch();
    };
    refetchData();
  }, [activeTab]);

  let estimateQueryVariables = {}
  if (projectId)
    estimateQueryVariables.projectId = projectId;
  if (attachmentId)
    estimateQueryVariables.attachmentId = attachmentId;

  const salesEstimateQuery = useQuery(SEARCH_SALES_ESTIMATE_ITOGS, {variables: estimateQueryVariables});
  const [query, setQuery] = useState(attachmentId ? ATTACHMENT_BOOKED_SIDES_QUERY : projectId ? PROJECT_BOOKED_SIDES_QUERY : '');

  const [deleteAddCosts] = useMutation(DELETE_ADD_COSTS_QUERY);
  const [deleteNonRts] = useMutation(DELETE_NON_RTS);

  const {loading, error, data, refetch} = useQuery(query, {variables: {id: attachmentId || projectId || ''}});
  let bookedSides = [];
  let nonRts = [];

  if (created || deleted) {
    refetch().then((val) => {
      created ? setCreated(false) : setDeleted(false);
    });
  }
  let getByKeys = (key, key2="reservations") => data[key].edges.length ? data[key].edges[0].node[key2].edges : [];
  if (salesEstimateQuery.data && !salesEstimateQuery.loading) {
    switch (activeTab) {
      case 'booked-sides':
        bookedSides = getEstimateReservations(salesEstimateQuery.data, sort, periodFilter);
        break;
      case 'extra-charge':
        // extraCosts = getExtraCosts(data.searchSalesAdditionalCost.edges, sort, periodFilter);
        break;
      case 'hot-ptc':
        // nonRts = gettNonRts(data.searchSalesNonrts.edges, sort);
        break;
    }
  }


  if (data) {
    if (attachmentId) {
      switch (activeTab) {
        case 'booked-sides':
          //bookedSides = getEstimateReservations(salesEstimateQuery.data, sort, periodFilter);
          // bookedSides = getBookedSides(getByKeys('searchAttachment'), sort, periodFilter);
          break;
        case 'extra-charge':
          extraCosts = getExtraCosts(data.searchSalesAdditionalCost.edges, sort, periodFilter);
          break;
        case 'hot-ptc':
          nonRts = gettNonRts(data.searchSalesNonrts.edges, sort);
          break;
      }
    }
    else if (projectId) {
      switch (activeTab) {
        case 'booked-sides':
          // bookedSides = getEstimateReservations(salesEstimateQuery.data, sort, periodFilter);
          // bookedSides = getBookedSides(getByKeys('searchProject'), sort, periodFilter);
          break;
        case 'extra-charge':
          extraCosts = getExtraCosts(getByKeys('searchProject', 'additionalCosts'), sort, periodFilter);
          break;
        case 'hot-ptc':
          nonRts = gettNonRts(getByKeys('searchProject', 'additionalCostsNonrts'), sort);
          break;
      }
    }
  }

  const [columnsForPopupBookedSides, setColumnsForPopupBookedSides] = useState(initColumnsForPopupBookedSides);
  const [columnsTableBookedSides, setColumnsTableBookedSides] = useState(initColumnsTableBookedSides);
  const [columnsForPopupExtraCharge, setColumnsForPopupExtraCharge] = useState(initColumnsForPopupExtraCharge);
  const [columnsTableExtraCharge, setColumnsTableExtraCharge] = useState(initColumnsTableExtraCharge);
  const [columnsForPopupHotPtc, setColumnsForPopupHotPtc] = useState(initColumnsForPopupHotPtc);
  const [columnsTableHotPtc, setColumnsTableHotPtc] = useState(initColumnsTableHotPtc);

  let mainContent = {
    'booked-sides': (
      <Tablea
        key="booked-sides"
        columns={columnsTableBookedSides/*columnsTableBookedSides*/}  /*columnsForPopupBookedSides*/
        data={bookedSides}
        select={true}
        edit={false}
        loading={loading || salesEstimateQuery.loading}
        notheader={true}
      />
    ),
    'extra-charge': (
      <Table
        key="extra-charge"
        columns={columnsTableExtraCharge}
        data={extraCosts}
        edit={true}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        openModal={DeleteModal}
        deleteEstimate={deleteAddCosts}
        setDeleted={setDeleted}
        loading={loading}
        select={true}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          placement: 'top',
          pageSizeOptions: ['25', '50', '100', '1000'],
          total: 100,
        }}
      />
    ),
    'hot-ptc': (
      <Table
        key="hot-ptc"
        columns={columnsTableHotPtc}
        data={nonRts}
        openEditModal={openEditModal}
        edit={true}
        setOpenEditModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        openModal={DeleteModal}
        deleteEstimate={deleteNonRts}
        setDeleted={setDeleted}
        select={true}
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          placement: 'top',
          pageSizeOptions: ['25', '50', '100', '1000'],
          total: 100,
        }}
      />
    ),
  };

  let tabEditColData = {
    'booked-sides': {
      columnsForPopup: columnsForPopupBookedSides,
      setColumnsForPopup: setColumnsForPopupBookedSides,
      setColumnsTable: setColumnsForPopupBookedSides, // setColumnsTableBookedSides,
    },
    'extra-charge': {
      columnsForPopup: columnsForPopupExtraCharge,
      setColumnsForPopup: setColumnsForPopupExtraCharge,
      setColumnsTable: setColumnsTableExtraCharge,
    },
    'hot-ptc': {
      columnsForPopup: columnsForPopupHotPtc,
      setColumnsForPopup: setColumnsForPopupHotPtc,
      setColumnsTable: setColumnsTableHotPtc,
    },
  };

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <HeaderBar enableEditQuantityOfColumns={true} columnsConfig={tabEditColData[activeTab]}>
        <CustomTabList>
          <CustomTabBtn
            className={activeTab === 'booked-sides' && 'active'}
            onClick={() => {
              setActiveTab('booked-sides');
              setQuery(() => {
                return attachmentId ? ATTACHMENT_BOOKED_SIDES_QUERY : projectId ? PROJECT_BOOKED_SIDES_QUERY : '';
              });
              setBlock(0);
              setSort('');
              setPeriodFilter('');
            }}>
            ЗАБРОНИРОВАННЫЕ СТОРОНЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'extra-charge' && 'active'}
            onClick={() => {
              setActiveTab('extra-charge');
              setQuery(attachmentId ? EXTRA_COSTS_QUERY : projectId ? PROJECT_EXTRA_COSTS_QUERY : '');
              setBlock(1);
              setSort('');
              setPeriodFilter('');
            }}>
            ДОП. РАСХОДЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'hot-ptc' && 'active'}
            onClick={() => {
              setActiveTab('hot-ptc');
              setQuery(attachmentId ? NON_RTS_QUERY : projectId ? PROJECT_NON_RTS_QUERY : '');
              setBlock(2);
              setSort('');
              setPeriodFilter('');
            }}>
            НОН РТС
          </CustomTabBtn>
        </CustomTabList>
      </HeaderBar>
      <Layout.Content>{mainContent[activeTab]}</Layout.Content>
      <EditCosts
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        editingItem={editingItem}
        block={activeTab}
        refetch={refetch}
      />
      <CreateCosts block={activeTab} refetch={refetch} />
      <style>
        {`
        .ant-drawer-bottom .ant-drawer-content-wrapper {
          left: 60px;
          box-shadow: 0px -4px 16px rgba(0, 0, 0, 0.0973558) !important;
          border-radius: 8px 8px 0px 0px;
          width: calc(100% - 60px);
        }

        .ant-drawer-bottom  .ant-drawer-close {
            padding: 10px 24px;
        }`}
      </style>
    </div>
  );
};

export default PanelDesign;
