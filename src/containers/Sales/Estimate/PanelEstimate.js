import React, { useState } from 'react';
import { Layout } from 'antd';
import { useParams } from 'react-router-dom';

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
import { gql, useQuery } from '@apollo/client';

const PanelDesign = () => {
  const [activeTab, setActiveTab] = useState('booked-sides');
  // const [bookSides, setBookSides] = useState([]);
  const { appId } = useParams();
  let extraCosts = [];
  const BOOKED_SIDES_QUERY = gql`
    query applicationQuery($id: ID) {
      searchAttachment(id: $id) {
        edges {
          node {
            id
            code
            estimate {
              title
              reservations {
                edges {
                  node {
                    id
                    dateFrom
                    dateTo
                    branding
                    design
                    constructionSide {
                      advertisingSide {
                        side {
                          title
                          format {
                            title
                          }
                          code
                        }
                      }
                      construction {
                        location {
                          marketingAddress {
                            address
                          }

                          postcode {
                            district {
                              city {
                                title
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const [query, setQuery] = useState(BOOKED_SIDES_QUERY);

  const { loading, error, data } = useQuery(query, {
    variables: {
      id: appId,
    },
  });

  let bookedSides = [];
  let nonRts = [];

  if (data) {
    switch (activeTab) {
      case 'booked-sides':
        bookedSides = data.searchAttachment.edges[0].node.estimate.reservations.edges.map((invoice) => {
          return {
            key: invoice.node.id,
            code: invoice.node.constructionSide.advertisingSide.side.code,
            city: invoice.node.constructionSide.construction.location.postcode.district.city.title,
            address: invoice.node.constructionSide.construction.location.marketingAddress.address,
            format: invoice.node.constructionSide.advertisingSide.side.format.title,
            side: invoice.node.constructionSide.advertisingSide.side.title,
            period:
              new Date(invoice.node.dateFrom).toLocaleDateString() +
              ' - ' +
              new Date(invoice.node.dateTo).toLocaleDateString(),
            branding: invoice.node.branding ? 'Да' : 'Нет',
          };
        });
        break;
      case 'extra-charge':
        extraCosts = data.searchSalesAdditionalCost.edges.map((charge) => {
          return {
            key: charge.node,
            nameOfService: charge.node.title,
            city: charge.node.city.title,
            period:
              new Date(charge.node.startPeriod).toLocaleDateString() +
              ' - ' +
              new Date(charge.node.endPeriod).toLocaleDateString(),
            quantity: charge.node.count,
            price: charge.node.price,
            discount: charge.node.discount,
            priceAfterDiscount: charge.node.sumAfterDiscount,
            sum: charge.node.summa,
            percentAK: 'stub data',
            sumAK: 'stub data',
            sumWithoutAK: 'stub data',
          };
        });
        break;
      case 'hot-ptc':
        nonRts = data.searchSalesNonrts.edges.map((item) => {
          return {
            key: item.node.id,
            code: item.node.title,
            city: '',
            quantity: item.node.count,
            rentInput: item.node.incomingRent + ' тг.',
            taxInput: item.node.incomingTax + ' тг.',
            printInput: item.node.incomingPrinting,
            mountInput: item.node.incomingInstallation,
            extraChargeInput: '',
            sumInput: item.node.summaClient,
          };
        });
    }
  }

  const NON_RTS = gql`
    query nonRtsQuery($id: ID) {
      searchSalesNonrts(id: $id) {
        edges {
          node {
            id
            count
            title
            incomingRent
            incomingTax
            incomingPrinting
            incomingInstallation
            incomingManufacturing
            summaClient
          }
        }
      }
    }
  `;

  const EXTRA_COSTS_QUERY = gql`
    query additionalCostsQuery($id: ID) {
      searchSalesAdditionalCost(id: $id) {
        edges {
          node {
            id
            title
            city {
              title
            }
            startPeriod
            endPeriod
            price
            count
            discount
            sumAfterDiscount
            summa
          }
        }
      }
    }
  `;

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
              setQuery(BOOKED_SIDES_QUERY);
            }}>
            ЗАБРОНИРОВАННЫЕ СТОРОНЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'extra-charge' && 'active'}
            onClick={() => {
              setActiveTab('extra-charge');
              setQuery(EXTRA_COSTS_QUERY);
            }}>
            ДОП. РАСХОДЫ
          </CustomTabBtn>
          <CustomTabBtn
            className={activeTab === 'hot-ptc' && 'active'}
            onClick={() => {
              setActiveTab('hot-ptc');
              setQuery(NON_RTS);
            }}>
            НОН РТС
          </CustomTabBtn>
        </CustomTabList>
      </HeaderBar>
      <Layout.Content>{mainContent[activeTab]}</Layout.Content>
    </div>
  );
};

export default PanelDesign;
