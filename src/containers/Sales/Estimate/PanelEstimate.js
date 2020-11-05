import React, { useState } from 'react';
import { Layout } from 'antd';

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
  dataBookedSides,
  dataExtraCharge,
  dataHotPtc
} from './stubDataSource';


const PanelDesign = () => {
  const [activeTab, setActiveTab] = useState('booked-sides');

  const [columnsForPopupBookedSides, setColumnsForPopupBookedSides] = useState(initColumnsForPopupBookedSides);
  const [columnsTableBookedSides, setColumnsTableBookedSides] = useState(initColumnsTableBookedSides);

  const [columnsForPopupExtraCharge, setColumnsForPopupExtraCharge] = useState(initColumnsForPopupExtraCharge);
  const [columnsTableExtraCharge, setColumnsTableExtraCharge] = useState(initColumnsTableExtraCharge);

  const [columnsForPopupHotPtc, setColumnsForPopupHotPtc] = useState(initColumnsForPopupHotPtc);
  const [columnsTableHotPtc, setColumnsTableHotPtc] = useState(initColumnsTableHotPtc);

  let mainContent = {
    'booked-sides': <Table
      key='booked-sides'
      columns={columnsTableBookedSides}
      data={dataBookedSides}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        placement: 'top',
        pageSizeOptions: ['25', '50', '100','1000'],
        total: 100,
      }}
    />,
    'extra-charge': <Table
      key='extra-charge'
      columns={columnsTableExtraCharge}
      data={dataExtraCharge}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        placement: 'top',
        pageSizeOptions: ['25', '50', '100','1000'],
        total: 100,
      }}
    />,
    'hot-ptc': <Table
      key='hot-ptc'
      columns={columnsTableHotPtc}
      data={dataHotPtc}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        placement: 'top',
        pageSizeOptions: ['25', '50', '100','1000'],
        total: 100,
      }}
    />
  }

  let tabEditColData = {
    'booked-sides': {
      columnsForPopup: columnsForPopupBookedSides,
      setColumnsForPopup: setColumnsForPopupBookedSides,
      setColumnsTable: setColumnsTableBookedSides
    },
    'extra-charge': {
      columnsForPopup: columnsForPopupExtraCharge,
      setColumnsForPopup: setColumnsForPopupExtraCharge,
      setColumnsTable: setColumnsTableExtraCharge
    },
    'hot-ptc': {
      columnsForPopup: columnsForPopupHotPtc,
      setColumnsForPopup: setColumnsForPopupHotPtc,
      setColumnsTable: setColumnsTableHotPtc
    }
  }

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <HeaderBar
        enableEditQuantityOfColumns={true}
        columnsConfig={tabEditColData[activeTab]}
      >
        <CustomTabList>
          <CustomTabBtn
            className={activeTab === 'booked-sides' && 'active'}
            onClick={() => setActiveTab('booked-sides')}
          >
            ЗАБРОНИРОВАННЫЕ СТОРОНЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'extra-charge' && 'active'}
            onClick={() => setActiveTab('extra-charge')}
          >
            ДОП. РАСХОДЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'hot-ptc' && 'active'}
            onClick={() => setActiveTab('hot-ptc')}
          >
            НОН РТС
          </CustomTabBtn>
        </CustomTabList>
      </HeaderBar>
      <Layout.Content>
        { mainContent[activeTab] }
      </Layout.Content>
    </div>
  );
};

export default PanelDesign;
