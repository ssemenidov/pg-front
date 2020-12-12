import React, { useState, useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { EstimateContext } from './Estimate';
import { useParams } from 'react-router-dom';
import { getBookedSides, getEstimateReservations, getExtraCosts, gettNonRts, EditCosts, DeleteModal, CreateCosts,
  getSidebarInfoData } from './utils';


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
import Tablea from '../../../components/Tablea/Tablea_estimate';
import HeaderBar from '../../../components/HeaderBar/HeaderBarTablea';

import {
  initColumnsForPopupBookedSides,
  initColumnsForPopupExtraCharge,
  initColumnsForPopupHotPtc,
} from './estimateColumns';

import { useQuery, useMutation } from '@apollo/client';

const PanelDesign = ({ setBlock, created, setCreated }) => {
  const [activeTab, setActiveTab] = useState('booked-sides');

  // const [activeTab, setActiveTab] = useState('hot-ptc');
  const params = useParams();
  const attachmentId = params.appId;
  const projectId = params.id;
  const [editingItem, setEditingItem] = useState({});
  const [deleted, setDeleted] = useState(false);
  const {sort, setSort, openEditModal, setOpenEditModal, periodFilter,
    setPeriodFilter, setSidebarData} = useContext(EstimateContext);

  let extraCosts = [];


  let estimateQueryVariables = {}
  if (projectId)
    estimateQueryVariables.projectId = projectId;
  if (attachmentId)
    estimateQueryVariables.attachmentId = attachmentId;

  const salesEstimateQuery = useQuery(SEARCH_SALES_ESTIMATE_ITOGS, {variables: estimateQueryVariables});
  const [query, setQuery] = useState(attachmentId ? ATTACHMENT_BOOKED_SIDES_QUERY : projectId ? PROJECT_BOOKED_SIDES_QUERY : '');

  const [deleteAddCosts] = useMutation(DELETE_ADD_COSTS_QUERY);
  const [deleteNonRts] = useMutation(DELETE_NON_RTS);

  useEffect(() => {
    if (!salesEstimateQuery.loading) {
      setSidebarData(getSidebarInfoData(salesEstimateQuery.data));
    }
  }, [salesEstimateQuery.data, salesEstimateQuery.loading])

  useEffect(() => {
    const refetchData = async () => {
      await salesEstimateQuery.refetch();
    };
    refetchData();
  }, [activeTab]);


  // const {loading, error, data, refetch} = useQuery(query, {variables: {id: attachmentId || projectId || ''}});

  let bookedSides = [];
  let nonRts = [];

  if (created || deleted) {
    salesEstimateQuery.refetch().then((val) => {
      created ? setCreated(false) : setDeleted(false);
    });
  }
  // let getByKeys = (key, key2='reservations') => (
  //   data[key]?.edges.length ? (data[key]?.edges.length ? data[key].edges[0]?.node[key2]?.edges : []) : []
  // );

  if (salesEstimateQuery.data && !salesEstimateQuery.loading) {
    switch (activeTab) {
      case 'booked-sides':
        bookedSides = getEstimateReservations(salesEstimateQuery.data, sort, periodFilter);
        break;
      case 'extra-charge':
        extraCosts = getExtraCosts(salesEstimateQuery.data, sort, periodFilter);
        break;
      case 'hot-ptc':
        nonRts = gettNonRts(salesEstimateQuery.data, sort);
        break;
    }
  }

  const [columnsForPopupBookedSides, setColumnsForPopupBookedSides] = useState(initColumnsForPopupBookedSides);
  const [columnsForPopupExtraCharge, setColumnsForPopupExtraCharge] = useState(initColumnsForPopupExtraCharge);
  const [columnsForPopupHotPtc, setColumnsForPopupHotPtc] = useState(initColumnsForPopupHotPtc);

  let mainContent = {
    'booked-sides': (
      <Tablea
        key='booked-sides'
        columns={columnsForPopupBookedSides}
        data={bookedSides}
        select={true}
        edit={false}
        loading={salesEstimateQuery.loading}
        notheader={true}
      />
    ),
    'extra-charge': (
      <Tablea
        key='extra-charge'
        columns={columnsForPopupExtraCharge}
        data={extraCosts}
        select={true}
        edit={true}
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        openModal={DeleteModal}
        deleteEstimate={deleteAddCosts}
        setDeleted={setDeleted}
        loading={salesEstimateQuery.loading}
        notheader={true}
      />
    ),
    'hot-ptc': (
      <Tablea
        key='hot-ptc'
        columns={columnsForPopupHotPtc}
        data={nonRts}
        openEditModal={openEditModal}
        select={true}
        edit={true}
        setOpenEditModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        openModal={DeleteModal}
        deleteEstimate={deleteNonRts}
        setDeleted={setDeleted}
        loading={salesEstimateQuery.loading}
        notheader={true}
      />
    ),
  };

  let tabEditColData = {
    'booked-sides': {
      columnsForPopup: columnsForPopupBookedSides,
      setColumnsForPopup: setColumnsForPopupBookedSides,
    },
    'extra-charge': {
      columnsForPopup: columnsForPopupExtraCharge,
      setColumnsForPopup: setColumnsForPopupExtraCharge,
    },
    'hot-ptc': {
      columnsForPopup: columnsForPopupHotPtc,
      setColumnsForPopup: setColumnsForPopupHotPtc,
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
        refetch={salesEstimateQuery.refetch}
      />
      <CreateCosts block={activeTab} refetch={salesEstimateQuery.refetch} />
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
