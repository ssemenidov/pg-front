import React, { useState } from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';
import {
  NON_RTS_QUERY,
  BOOKED_SIDES_QUERY,
  EXTRA_COSTS_QUERY,
  PROJECT_BOOKED_SIDES_QUERY,
  PROJECT_EXTRA_COSTS_QUERY,
  PROJECT_NON_RTS_QUERY,
  getBookedSides,
  getExtraCosts,
  gettNonRts,
  EditCosts,
  EditModal,
  DeleteModal,
  DELETE_ADD_COSTS_QUERY,
  DELETE_NON_RTS,
} from './utils';

import { CustomTabBtn, CustomTabList } from '../../../components/Styles/DesignList/styles';

import Table from '../../../components/TableResizable/Table';
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

const PanelDesign = ({ setBlock, created, setCreated, cities, openEditModal, setOpenEditModal }) => {
  const [activeTab, setActiveTab] = useState('booked-sides');
  const { appId, id } = useParams();
  const [editingItem, setEditingItem] = useState({});
  const [deleted, setDeleted] = useState(false);
  let extraCosts = [];

  const [query, setQuery] = useState(appId ? BOOKED_SIDES_QUERY : id ? PROJECT_BOOKED_SIDES_QUERY : '');

  const [deleteAddCosts] = useMutation(DELETE_ADD_COSTS_QUERY);
  const [deleteNonRts] = useMutation(DELETE_NON_RTS);

  const { loading, error, data, refetch } = useQuery(query, {
    variables: {
      id: appId ? appId : id ? id : '',
    },
  });
  let bookedSides = [];
  let nonRts = [];

  if (created || deleted) {
    refetch().then((val) => {
      created ? setCreated(false) : setDeleted(false);
    });
  }

  if (data) {
    switch (activeTab) {
      case 'booked-sides':
        if (appId) {
          bookedSides = getBookedSides(data.searchAttachment.edges[0].node.estimate.reservations.edges);
        }
        if (id) {
          bookedSides = getBookedSides(
            data.searchProject.edges.length ? data.searchProject.edges[0].node.reservations.edges : [],
          );
        }
        break;
      case 'extra-charge':
        if (appId) {
          extraCosts = getExtraCosts(data.searchSalesAdditionalCost.edges);
        }
        if (id) {
          extraCosts = getExtraCosts(
            data.searchProject.edges.length ? data.searchProject.edges[0].node.additionalCosts.edges : [],
          );
        }
        break;
      case 'hot-ptc':
        if (appId) {
          nonRts = gettNonRts(data.searchSalesNonrts.edges);
        }
        if (id) {
          nonRts = gettNonRts(
            data.searchProject.edges.length ? data.searchProject.edges[0].node.additionalCostsNonrts.edges : [],
          );
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
      <Table
        key="booked-sides"
        columns={columnsTableBookedSides}
        data={bookedSides}
        select={true}
        edit={false}
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
      setColumnsTable: setColumnsTableBookedSides,
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
                return appId ? BOOKED_SIDES_QUERY : id ? PROJECT_BOOKED_SIDES_QUERY : '';
              });
              setBlock(0);
            }}>
            ЗАБРОНИРОВАННЫЕ СТОРОНЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'extra-charge' && 'active'}
            onClick={() => {
              setActiveTab('extra-charge');
              setQuery(appId ? EXTRA_COSTS_QUERY : id ? PROJECT_EXTRA_COSTS_QUERY : '');
              setBlock(1);
            }}>
            ДОП. РАСХОДЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'hot-ptc' && 'active'}
            onClick={() => {
              setActiveTab('hot-ptc');
              setQuery(appId ? NON_RTS_QUERY : id ? PROJECT_NON_RTS_QUERY : '');
              setBlock(2);
            }}>
            НОН РТС
          </CustomTabBtn>
        </CustomTabList>
      </HeaderBar>
      <Layout.Content>{mainContent[activeTab]}</Layout.Content>
      {/* <EditModal
        openModal={openEditModal}
        editingItem={editingItem}
        setOpenModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        block={activeTab}
        cities={cities}
        extraCostsId={extraCosts.key}
        refetch={refetch}
      /> */}
      <EditCosts
        openModal={openEditModal}
        editingItem={editingItem}
        setOpenModal={setOpenEditModal}
        setEditingItem={setEditingItem}
        block={activeTab}
        cities={cities}
        extraCostsId={extraCosts.key}
        refetch={refetch}
      />
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
