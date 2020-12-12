import { useMutation } from '@apollo/client';
import React, { useState, useEffect, useContext } from 'react';
import { EstimateContext } from './Estimate';
import worldIcon from '../../../img/header-bar/world.svg';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { DatePicker } from 'antd';
import { Input, Modal, Form, InputNumber, Drawer, Button, message, Select } from 'antd';
import { ReactComponent as ExitIcon } from '../../../img/sales/exitIcon.svg';
import arrowDown from '../../../img/icon_dropdown_select.svg';
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';
import { UPDATE_NON_RTS, UPDATE_ADDITIONAL_COSTS, CREATE_ADDITIONAL_COSTS, CREATE_NON_RTS_COSTS,
  UPDATE_RESERVATION_NON_RTS } from './q_mutations';
import collapseIcon from '../../../img/collapse-icon.svg';

export let fmtPercent = (item) => {
 // return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toString() + ' %' : ' 0 %';
  return item ? (Math.round(item).toString()) + ' %' : ' 0 %';
}
let fmtPercentNull = (item) => {
  // return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toString() + ' %' : ' 0 %';
  return item ? (Math.round(item).toString()) + ' %' : '';
}
export let fmtPrice = (item) => {
//  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '';
  return item ? (Math.round(item).toLocaleString()) + ' тг.' : '';
}
export let fmtPrice0 = (item) => {
//  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '';
  return item ? (Math.round(item).toLocaleString()) + ' тг.' : '0 тг.';
}

export let fmtPriceNum0 = (item) => {
//  return item ? (Math.round((item + Number.EPSILON) * 100) / 100)/*.toFixed(2)*/.toLocaleString() + ' тг.' : '';
  return item ? (Math.round(item).toLocaleString()) : '0';
}

export let fmtPeriod = (startDate, endDate) => {
  return startDate && endDate ? (
    new Date(startDate).toLocaleDateString() +
    ' - ' +
    new Date(endDate).toLocaleDateString()
  ) : '';
}

let agencyComissionDistributed = (ak, cat) => {
  return (ak && cat && (
    ((cat === 'A_0') && ak.toNalog)
    || ((cat === 'A_1') && ak.toMount)
    || ((cat === 'A_2') && ak.toPrint)
    || ((cat === 'A_3') && ak.toRent)
    || ((cat === 'A_4') && ak.toAdditional)));
}

let capitalize = (s) => s ? s[0].toUpperCase() + s.substring(1) : s

export const getSidebarInfoData = (data) => {
  let node = data?.searchSalesEstimateItogs?.edges.length ? data.searchSalesEstimateItogs.edges[0].node : null;
  return [
    {
      id: 1, title: 'Аренда', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Аренда по прайсу:',            value: fmtPrice0(node?.rentByPrice) },
        { title: 'Скидка на аренду по прайсу:',  value: fmtPercent(node?.rentByPriceDiscountPercent) },
        { title: 'Аренда на клиента:',           value: fmtPrice0(node?.rentToClent) },
        { title: 'Скидка на аренду на клиента:', value: fmtPercent(node?.rentToClentDiscountPercent) }
      ]
    },
    {
      id: 2, title: 'Доп. работы', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Монтаж:',      value: fmtPrice0(node?.staticMounting) },
        { title: 'Печать:',      value: fmtPrice0(node?.staticPrinting) },
        { title: 'Доп. работы:', value: fmtPrice0(node?.staticAdditional) },
      ]
    },
    {
      id: 3, title: 'Доп. расходы', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: (
        node?.additionalRtsByTitle?.edges?.map((item, index) => ({
            title: capitalize(item.node.name),
            value: fmtPrice(item.node.summaAfterDiscount),
          })
        ) || [])
    },
    {
      id: 4, title: 'Агентская комиссия', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Процент АК:',          value: fmtPercent(node?.agencyCommissionPercent) },
        { title: 'Сумма АК:',            value: fmtPrice0(node?.agencyCommissionValue) },
        { title: 'Сумма за вычетом АК:', value: fmtPrice0(node?.summaryEstimateValueWithoutAgencyComission) }
      ]
    },
    {
      id: 5, title: 'Налоги', icon: collapseIcon, isShowed: true, sumBlock: false,
      content: [
        { title: 'Налог:',               value: fmtPrice0(node?.nalogBeforeDiscount) },
        { title: 'Скидка на налог:',     value: fmtPercent(node?.nalogDiscountPercent) },
        { title: 'Налога после скидки:', value: fmtPrice0(node?.nalogAfterDiscount) }
      ]
    },
    {
      id: 6,
      title: 'НОН РТС',
      icon: collapseIcon,
      isShowed: true,
      sumBlock: false,
      content: (
        node?.additionalNonrtsByTitle?.edges?.map((item, index) => ({
            title: capitalize(item.node.name),
            value: fmtPrice0(item.node.sale),
          })
        ) || [])
    },
    {
      id: 7,
      title: 'ИТОГО',
      icon: collapseIcon,
      isShowed: false,
      sumBlock: true,
      value: fmtPrice0(node?.summaryEstimateValue)
    }
  ];
};

export const getEstimateReservations = (data = [], sort = '', period = '') => {
  let modifiedData = data.searchSalesEstimateItogs?.edges[0].node.reservations.edges || [];
  modifiedData = modifiedData.map((reservation) => {
    let r = reservation.node;
    console.log(r)
    return {
      key: r.id,
      code: getConstructionSideCode(r.constructionSide),
      city: r.constructionSide?.construction?.location?.postcode.district.city.title || '' ,
      address: r.constructionSide?.construction?.location?.marketingAddress.address || '',
      format: r.constructionSide?.advertisingSide?.side?.format.title || '',
      side: r.constructionSide?.advertisingSide?.side.title || '',
      period: fmtPeriod(r.dateFrom, r.dateTo),
      branding: r.branding ? 'Да' : 'Нет',
      rentByPrice: fmtPrice(r.rentByPriceCalculated),
      discountByPrice: fmtPercent(r.discountPricePercentSelected),
      rentOnClient: fmtPrice(r.valueRentToClientSelected),
      discountOnClient: fmtPercent(r.discountClientPercentSelected),
      rentAfterDiscount:  fmtPrice(r.valueRentToClientAfterDiscountSelected),
      tax: fmtPrice(r.additionalStaticNalog),
      discountOnTax: fmtPercent(r.additionalStaticNalogDiscountPercentSelected),
      taxAfterDiscount: fmtPrice(r.additionalStaticNalogValueAfterDiscount),
      vat: '',
      mount: fmtPrice(r.additionalStaticMounting),
      print: fmtPrice(r.additionalStaticPrinting),
      additional: fmtPrice(r.additionalStaticAdditional),
      sum: fmtPrice(r.itogSummary),
      percentAK: fmtPercent(r.agencyCommissionPercentSelected),
      sumAK: fmtPrice(r.itogAgencyCommission),
      sumWithoutAK: fmtPrice(r.itogSummaryWithoutAgencyCommission),
      agencyCommission: r.agencyCommission
    };
  });

  switch (sort) {
    case 'abc':
      modifiedData = modifiedData.sort((a, b) => {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
  }
  switch (period) {
    case 'increase':
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START));
        const duration2 = moment.duration(END2.diff(START2));
        return duration._milliseconds - duration2._milliseconds;
      });
    case 'decrease':
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START));
        const duration2 = moment.duration(END2.diff(START2));
        return duration2._milliseconds - duration._milliseconds;
      });
  }

  return modifiedData;
};


export const getExtraCosts = (data = [], sort = '', period = '') => {
  let modifiedData = data.searchSalesEstimateItogs?.edges[0].node.additionalRts.edges || [];
  modifiedData = modifiedData.map((charge) => {
    let node = charge.node
    return {
      id: node?.id  || '',
      key: node?.id || '',
      nameOfService: node?.title || '',
      city: node?.city.title || '',
      cityId: node?.city.id || '',
      period: fmtPeriod(node.startPeriod, node.endPeriod),
      quantity: node?.count || '',
      price: fmtPrice(node.price),
      discount: fmtPercent(node.discountPercent),
      priceAfterDiscount: fmtPrice(node.priceAfterDiscount),
      sum: fmtPrice(node.summaAfterDiscount),
      percentAK: fmtPercent(node.agencyCommissionPercent),
      sumAK: fmtPrice(node.agencyCommissionValue),
      sumWithoutAK: fmtPrice(node.valueWithoutAgencyCommission),
      agencyCommission: node.agencyCommission,
      category: node.category,
    };
  });
  switch (sort) {
    case 'abc':
      modifiedData = modifiedData.sort((a, b) => {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
  }
  switch (period) {
    case 'increase':
      modifiedData = modifiedData
        .sort((a, b) => {
          const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
          const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
          const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
          const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
          const duration = moment.duration(END.diff(START)).asDays();
          const duration2 = moment.duration(END2.diff(START2)).asDays();
          return duration - duration2;
        })
        .reverse();
    case 'decrease':
      modifiedData = modifiedData.sort((a, b) => {
        const START = moment(a.period.split(' - ')[0], 'DD.MM.YYYY');
        const END = moment(a.period.split(' - ')[1], 'DD.MM.YYYY');
        const START2 = moment(b.period.split(' - ')[0], 'DD.MM.YYYY');
        const END2 = moment(b.period.split(' - ')[1], 'DD.MM.YYYY');
        const duration = moment.duration(END.diff(START)).asDays();
        const duration2 = moment.duration(END2.diff(START2)).asDays();
        return duration - duration2;
      });
  }

  return modifiedData;
};

export const gettNonRts = (data = [], sort = '') => {
  let nonRtsAdditionals = data.searchSalesEstimateItogs?.edges[0].node.additionalNonrts.edges || [];
  nonRtsAdditionals = nonRtsAdditionals.map((item) => {
    let node = item.node;
    let quantity = node.count || 0;
    let agValue = node.agencyCommissionCalculated ?? 0;
    let agPercent = node.margin && node.agencyCommissionCalculated ? (agValue / node.margin) * 100.0 : null;
    if (agPercent === null && node.agencyCommission?.toNonrts)
      agPercent = node.agencyCommission.percent;
    let sumWithoutAk = (node.margin ?? 0) - agValue;

    return {
      key: node.id,
      code: node.name,
      city: node?.city?.title ||  '',
      cityId: node?.city?.id || '',
      period: fmtPeriod(node.startPeriod, node.endPeriod),
      quantity: quantity,
      rentInput: fmtPrice(node.incomingRent),
      taxInput: fmtPrice(node.incomingTax),
      printInput: fmtPrice(node.incomingPrinting),
      mountInput: fmtPrice(node.incomingInstallation),
      manufactureInput: fmtPrice(node.incomingManufacturing),
      costsInput: fmtPrice(node.incomingAdditional),
      sumInput: fmtPrice(node.pay),
      rentSell: fmtPrice(node.saleRent),
      taxSell: fmtPrice(node.saleTax),
      printSell: fmtPrice(node.salePrinting),
      mountSell: fmtPrice(node.saleInstallation),
      manufactureSell: fmtPrice(node.saleManufacturing),
      sumSell: fmtPrice(node.sale),
      costsSell: fmtPrice(node.saleAdditional),
      percentAK: fmtPercent(agPercent),
      sumAK: fmtPrice(agValue),
      margin: fmtPrice(node.margin),
      agencyCommission: node.agencyCommission,
      sumWithoutAK: fmtPrice(sumWithoutAk),
      category: 'nonrtsAdditional',
    };
  });
  let reservationsNonRts = data.searchSalesEstimateItogs?.edges[0].node.reservationsNonrts.edges || [];
  reservationsNonRts = reservationsNonRts.map((item) => {
    let node = item.node;
    let agValue = node.agencyCommissionCalculated ?? 0;
    let agPercent = node.margin ? (agValue / node.margin) * 100.0 : null;
    if (agPercent === null && node.agencyCommission?.toNonrts)
      agPercent = node.agencyCommission.percent;

    return {
      key: node.id,
      code: getConstructionSideCode(node.constructionSide),
      city: node?.constructionSide?.construction?.location?.postcode?.district?.city.title || null,
      cityId: node?.constructionSide?.construction?.location?.postcode?.district?.city.id || null,
      period: fmtPeriod(node.dateFrom, node.dateTo) + ' ' + node.reservationType?.title,
      dateFrom: node.dateFrom,
      dateTo: node.dateTo,
      quantity: 1,
      rentInput: fmtPrice(node.nonrtsPart?.incomingRent),
      taxInput: fmtPrice(node.nonrtsPart?.incomingTax),
      printInput: fmtPrice(node.nonrtsPart?.incomingPrinting),
      mountInput: fmtPrice(node.nonrtsPart?.incomingInstallation),
      manufactureInput: fmtPrice(node.nonrtsPart?.incomingManufacturing),
      costsInput: fmtPrice(node.nonrtsPart?.incomingAdditional),
      rentSell: fmtPrice(node.nonrtsPart?.saleRent),
      taxSell: fmtPrice(node.nonrtsPart?.saleTax),
      printSell: fmtPrice(node.nonrtsPart?.salePrinting),
      mountSell: fmtPrice(node.nonrtsPart?.saleInstallation),
      manufactureSell: fmtPrice(node.nonrtsPart?.saleManufacturing),
      costsSell: fmtPrice(node.nonrtsPart?.saleAdditional),
      sumInput: fmtPrice(node.pay),
      sumSell: fmtPrice(node.sale),
      percentAK: fmtPercent(agPercent),
      sumAK: fmtPrice(agValue),
      margin: fmtPrice(node.margin),
      agencyCommission: node.agencyCommission,
      category: 'nonrtsReservation',
    };
  });
  let modifiedData = [...reservationsNonRts, ...nonRtsAdditionals];

  switch (sort) {
    case 'abc':
      return modifiedData.sort((a, b) => {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      });
    default:
      return modifiedData;
  }
};

export const DeleteModal = (estimate, deleteEstimate, setDeleted) => {
  const { confirm } = Modal;
  confirm({
    title: 'Вы уверены что хотите удалить?',
    centered: true,
    onOk() {
      return deleteEstimate({
        variables: {
          id: estimate.key,
        },
      })
        .then(({ data }) => {
          if (data.deleteSalesAdditionalCost) {
            data.deleteSalesAdditionalCost.found && setDeleted(true);
            message.success('Успешно удалено.');
          }
          if (data.deleteSalesNonrts) {
            data.deleteSalesNonrts.found && setDeleted(true);
            message.success('Успешно удалено.');
          }
        })
        .catch((err) => {
          console.log(err);
          message.error('Что то пошло не так...');
        });
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

export const EditCosts = ({ openModal, setOpenModal, block, editingItem, refetch }) => {
  const InputLabel = (title) => {
    return (
      <span
        style={{
          color: '#1A1A1A',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        {title}
      </span>
    );
  };
  const { cities } = useContext(EstimateContext);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  let FormInputs = () => {
    return 'no edit';
  };
  const [updateAddCosts] = useMutation(UPDATE_ADDITIONAL_COSTS);
  const [updateNonRts] = useMutation(UPDATE_NON_RTS);
  const [updateReservationNonRts] = useMutation(UPDATE_RESERVATION_NON_RTS);


  let toPrice = (val) => {
    if (typeof val == 'number')
      return val;
    if (!val)
      return 0;
    return parseFloat(val.replace(/ /g, '').split(' ')[0])
  };

  useEffect(() => {
    switch (block) {
      case 'extra-charge': {
        const start = editingItem.period
          ? moment(editingItem.period.split(' - ')[0].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        const end = editingItem.period
          ? moment(editingItem.period.split(' - ')[1].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        let agSum = null;
        let agPercent = null;
        if (editingItem.agencyCommission) {
          let ak = editingItem.agencyCommission;
          let cat = editingItem.category;
          if (agencyComissionDistributed(ak, cat))  {
            agSum = ak.value;
            agPercent = ak.percent;
          }
        }

        form.setFieldsValue({
          name: editingItem.nameOfService || '',
          count: toPrice(editingItem.quantity),
          price: toPrice(editingItem.price),
          discount: toPrice(editingItem.discount),
          agPercent: agPercent === null ? null : toPrice(agPercent),
          agSumm: agSum === null ? null : toPrice(agSum),
          city: editingItem.cityId ? editingItem.cityId : '',
          period: [start, end],
        });
      }
        break;
      case 'hot-ptc': {
        form.setFieldsValue({
          inputRent: toPrice(editingItem.rentInput),
          inputTax: toPrice(editingItem.taxInput),
          inputPrint: toPrice(editingItem.printInput),
          inputMount: toPrice(editingItem.mountInput),
          inputCosts: toPrice(editingItem.costsInput),
          inputManufcature: toPrice(editingItem.manufactureInput),
          summRent: toPrice(editingItem.rentSell),
          summTax: toPrice(editingItem.taxSell),
          summPrint: toPrice(editingItem.printSell),
          summMount: toPrice(editingItem.mountSell),
          summManufacture: toPrice(editingItem.manufactureSell),
          summCosts: toPrice(editingItem.costsSell),
          type: editingItem.code,
          count: editingItem.quantity,
          agPercent: editingItem?.agencyCommission?.toNonrts && editingItem.agencyCommission.percent,
          agSumm: editingItem?.agencyCommission?.toNonrts && editingItem.agencyCommission.value,
          city: editingItem.cityId ? editingItem.cityId : '',
        });
      }
        break;
    }
  }, [editingItem, form]);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  let fontStyle = {
    color: '#1A1A1A',
    fontSize: '14px',
    fontWeight: 'bold',
  };
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr 2fr',
              gap: '30px',
              minHeight: '123px',
            }}>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="name"
              rules={[{ required: true, message: 'Пожалуйста введите наименование услуги.' }]}
              label={<span style={fontStyle}> Наименование услуги</span>}>
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="city"
              rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
              label={<span style={fontStyle}>Город</span>}>
              <Select
                allowClear
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                suffixIcon={
                  <>
                    <img
                      src={arrowDown}
                      alt="arrow top"
                      style={{
                        transform: selectOpened ? 'rotate(180deg)' : '',
                      }}
                    />
                  </>
                }
                onDropdownVisibleChange={(opened) => {
                  setSelectOpened(opened);
                }}
                loading={!cities.loaded}
                size="large">
                {cities.data.map((city) => {
                  return (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="period"
              rules={[{ required: true, message: 'Пожалуйста укажите период.' }]}
              label={<span style={fontStyle}>Период</span>}>
              <RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                format="DD-MM-YYYY"
                size="large"
                placement="topLeft"
              />
            </Form.Item>
            <Form.Item
              name="count"
              className="editForm-item"
              labelAlign="left"
              rules={[{ required: true, message: 'Пожалуйста введите количество.' }]}
              colon={false}
              initialValue={0}
              label={InputLabel('Кол-во')}>
              <InputNumber type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              initialValue={0}
              colon={false}
              rules={[{ required: true, message: 'Пожалуйста введите цену.' }]}
              label={InputLabel('Цена')}>
              <InputNumber size="large" formatter={(value) => `${value} тг`} />
            </Form.Item>
            <Form.Item
              name="discount"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Скидка')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agPercent"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Процент АК')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agSumm"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Сумма АК')}>
              <InputNumber
                size="large"
                formatter={(value) => {
                  return `${value} тг`;
                }}
              />
            </Form.Item>
            <Form.Item className="editForm-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
                style={{
                  width: '100%',
                  height: '38px',
                  marginTop: '40px',
                  borderRadius: '4px',
                  backgroundColor: '#2C5DE5',
                }}>
                Сохранить
              </Button>
            </Form.Item>
          </div>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <>
            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
              }}>
              ВХОДЯЩАЯ СТОИМОСТЬ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '30px',
              }}>
              <Form.Item
                name="inputRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                    // minWidth: '260px',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputManufcature"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
                marginTop: '15px',
              }}>
              СУММА ПРОДАЖИ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6,1fr)',
                gridColumnGap: '30px',
                gridRowGap: '0px',
              }}>
              <Form.Item
                name="summRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summManufacture"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                columnGap: '30px',
                rowGap: '0px',
                minHeight: '123px',
              }}>
              <Form.Item
                name="type"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Тип')}>
                <Input
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="count"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Кол-во')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="agPercent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={null}
                label={InputLabel('Процент АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return (value === null || value === 'null') ? ' %' : `${value}%`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="agSumm"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={null}
                label={InputLabel('Сумма АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return (value === null || value === 'null') ? ' тг' : `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                className="editForm-item"
                labelAlign="left"
                colon={false}
                name="city"
                rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
                label={InputLabel('Город')}>
                <Select
                  allowClear
                  dropdownAlign={{
                    points: ['bl', 'tl'],
                    offset: [0, -4],
                    overflow: {
                      adjustX: 0,
                      adjustY: 1,
                    },
                  }}
                  suffixIcon={
                    <>
                      <img
                        src={arrowDown}
                        alt="arrow top"
                        style={{
                          transform: selectOpened ? 'rotate(180deg)' : '',
                        }}
                      />
                    </>
                  }
                  onDropdownVisibleChange={(opened) => {
                    setSelectOpened(opened);
                  }}
                  loading={!cities.loaded}
                  size="large">
                  {cities.data.map((city) => {
                    return (
                      <Option key={city.id} value={city.id}>
                        {city.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="editForm-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                  style={{
                    width: '100%',
                    height: '38px',
                    marginTop: '40px',
                    borderRadius: '4px',
                    backgroundColor: '#2C5DE5',
                  }}>
                  Сохранить
                </Button>
              </Form.Item>
            </div>
          </>
        );
      };
      break;
  }
  return (
    <Drawer
      height="auto"
      destroyOnClose
      bodyStyle={{
        paddingBottom: 10,
      }}
      title={
        <span
          style={{
            color: '#003360',
            fontSize: 14,
            textTransform: 'uppercase',
          }}>
          Редактирование
        </span>
      }
      placement="bottom"
      closable={true}
      onClose={() => {
        setOpenModal(false);
      }}
      closeIcon={<ExitIcon />}
      visible={openModal}
      maskStyle={{
        backgroundColor: 'transparent',
      }}
      key={'12qwe'}>
      <Form
        layout="inline"
        style={{
          flexDirection: block === 'hot-ptc' ? 'column' : 'row',
        }}
        onFinish={(values) => {
          setConfirmLoading(true);
          let toNumber = (val) => {
            if (val === null)
              return null;
            if (val === false || val === '')
              return 0;
            if (typeof val === 'number')
              return val;
            return parseFloat(val);
          };
          switch (block) {
            case 'extra-charge':
              const start = moment(values.period[0]).toDate();
              const end = moment(values.period[1]).toDate();
              let ak = editingItem.agencyCommission;
              let input = {
                title: values.name,
                count: values.count,
                discountPercent: values.discount,
                price: values.price,
                agencyCommission: {
                  value: values.agSumm === 'null' ? null : toNumber(values.agSumm),
                  percent: values.agPercent === 'null' ? null : toNumber(values.agPercent),
                },
                city: values.city,
                startPeriod: start,
                endPeriod: end,
              };
              if (ak) {
                switch (editingItem.category) {
                  case 'A_0':
                    input.agencyCommission.toNalog = true;
                    break;
                  case 'A_1':
                    input.agencyCommission.toMount = true;
                    break;
                  case 'A_2':
                    input.agencyCommission.toPrint = true;
                    break;
                  case 'A_3':
                    input.agencyCommission.toRent = true;
                    break;
                  case 'A_4':
                    input.agencyCommission.toAdditional = true;
                    break;
                }
              }
              updateAddCosts({
                variables: {
                  input,
                  id: editingItem.key,
                },
              })
                .then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  message.success('Успешно изменено.');
                  refetch();
                })
                .catch((err) => {
                  setConfirmLoading(false);
                  setOpenModal(false);
                  message.error('Что-то пошло не так попробуйте ещё раз.');
                  console.log(err);
                });
              break;
            case 'hot-ptc': {
              console.log(values.agPercent, values.agSumm)
              let promise = null;
              if (editingItem.category == 'nonrtsAdditional') {
                let nonRtsInput = {
                  count: values.count,
                  title: values.type,
                  incomingTax: values.inputTax,
                  incomingRent: values.inputRent,
                  incomingPrinting: values.inputPrint,
                  incomingAdditional: values.inputCosts,
                  incomingInstallation: values.inputMount,
                  incomingManufacturing: values.inputManufcature,
                  saleTax: values.summTax,
                  saleRent: values.summRent,
                  salePrinting: values.summPrint,
                  saleAdditional: values.summCosts,
                  saleInstallation: values.summMount,
                  saleManufacturing: values.summManufacture,
                  agencyCommission: {
                    value: (values.agSumm === 'null' ? null : toNumber(values.agSumm)),
                    percent: (values.agPercent === 'null' ? null : toNumber(values.agPercent)),
                    toNonrts: true
                  },
                  city: values.city,
                };
                promise = updateNonRts({ variables: { input: nonRtsInput, id: editingItem.key } });
              }
              else {
                let nonRtsInput = {
                  dateFrom: editingItem.dateFrom,
                  dateTo: editingItem.dateTo,
                  estimateNonRtsAdd: [{
                    count: values.count,
                    title: editingItem.code,
                    incomingTax: values.inputTax,
                    incomingRent: values.inputRent,
                    incomingPrinting: values.inputPrint,
                    incomingAdditional: values.inputCosts,
                    incomingInstallation: values.inputMount,
                    incomingManufacturing: values.inputManufcature,
                    saleTax: values.summTax,
                    saleRent: values.summRent,
                    salePrinting: values.summPrint,
                    saleAdditional: values.summCosts,
                    saleInstallation: values.summMount,
                    saleManufacturing: values.summManufacture,
                  }],
                  agencyCommission: {
                    value: values.agSumm === 'null' ? null : toNumber(values.agSumm),
                    percent: values.agPercent === 'null' ? null : toNumber(values.agPercent),
                    toNonrts: true,
                  },
                };
                promise = updateReservationNonRts({ variables: { input: nonRtsInput, id: editingItem.key } });
              }
              if (promise) {
                promise.then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  message.success('Успешно изменено.');
                  refetch();
                })
                  .catch((err) => {
                    setConfirmLoading(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    setOpenModal(false);
                    console.log(err);
                  });
              }
            }
              break;
          }
        }}
        form={form}>
        <FormInputs />
      </Form>
      <style>
        {`

        .editBtn {
          width: 100%;
          // max-width: 270px;
          margin-right: 0 !important;
        }

       .editBtn>div {
         display: flex !important;
         justify-content: flex-end;
       }
       .editForm-item {
         display: flex;
         flex-direction: column;
         margin-right: 0 !important;
       }
        `}
      </style>
    </Drawer>
  );
};

export const CreateCosts = ({ block, refetch }) => {
  const InputLabel = (title) => {
    return (
      <span
        style={{
          color: '#1A1A1A',
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        {title}
      </span>
    );
  };
  const { id, appId } = useParams();
  const currentId = appId ? appId : id ? id : '';

  const { createModal, setCreateModal, cities } = useContext(EstimateContext);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  let FormInputs = () => {
    return 'no create';
  };
  const [createAddCosts] = useMutation(CREATE_ADDITIONAL_COSTS);
  const [createNonRts] = useMutation(CREATE_NON_RTS_COSTS);
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 2fr 2fr 1fr 1fr 1fr 1fr 1fr 2fr',
              gap: '30px',
              minHeight: '123px',
            }}>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="name"
              rules={[{ required: true, message: 'Пожалуйста введите наименование услуги.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Наименование услуги
                </span>
              }>
              <Input size="large" />
            </Form.Item>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="city"
              rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Город
                </span>
              }>
              <Select
                allowClear
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                suffixIcon={
                  <>
                    <img
                      src={arrowDown}
                      alt="arrow top"
                      style={{
                        transform: selectOpened ? 'rotate(180deg)' : '',
                      }}
                    />
                  </>
                }
                onDropdownVisibleChange={(opened) => {
                  setSelectOpened(opened);
                }}
                loading={!cities.loaded}
                size="large">
                {cities.data.map((city) => {
                  return (
                    <Option key={city.id} value={city.id}>
                      {city.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="period"
              rules={[{ required: true, message: 'Пожалуйста укажите период.' }]}
              label={
                <span
                  style={{
                    color: '#1A1A1A',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}>
                  Период
                </span>
              }>
              <RangePicker
                dropdownAlign={{
                  points: ['bl', 'tl'],
                  offset: [0, -4],
                  overflow: {
                    adjustX: 0,
                    adjustY: 1,
                  },
                }}
                size="large"
                placement="topLeft"
              />
            </Form.Item>
            <Form.Item
              name="count"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              rules={[{ required: true, message: 'Пожалуйста введите количество.' }]}
              label={InputLabel('Кол-во')}>
              <InputNumber type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              initialValue={0}
              colon={false}
              rules={[{ required: true, message: 'Пожалуйста введите цену.' }]}
              label={InputLabel('Цена')}>
              <InputNumber size="large" formatter={(value) => `${value} тг`} />
            </Form.Item>
            <Form.Item
              name="discount"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Скидка')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agPercent"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Процент АК')}>
              <InputNumber size="large" formatter={(value) => `${value}%`} />
            </Form.Item>
            <Form.Item
              name="agSumm"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              initialValue={0}
              label={InputLabel('Сумма АК')}>
              <InputNumber
                size="large"
                formatter={(value) => {
                  return `${value} тг`;
                }}
              />
            </Form.Item>
            <Form.Item className="editForm-item">
              <Button
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
                style={{
                  width: '100%',
                  height: '38px',
                  marginTop: '40px',
                  borderRadius: '4px',
                  backgroundColor: '#2C5DE5',
                }}>
                Добавить
              </Button>
            </Form.Item>
          </div>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
        const [selectOpened, setSelectOpened] = useState(false);
        return (
          <>
            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
              }}>
              ВХОДЯЩАЯ СТОИМОСТЬ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '30px',
              }}>
              <Form.Item
                name="inputRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                    // minWidth: '260px',
                  }}
                  size="large"
                  formatter={(value) => `${value} тг`}
                />
              </Form.Item>
              <Form.Item
                name="inputManufcature"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>

            <p
              style={{
                fontSize: 12,
                color: '#656565',
                marginBottom: 0,
                marginTop: '15px',
              }}>
              СУММА ПРОДАЖИ
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6,1fr)',
                gridColumnGap: '30px',
                gridRowGap: '0px',
              }}>
              <Form.Item
                name="summRent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summTax"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summPrint"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summMount"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summCosts"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="summManufacture"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                columnGap: '30px',
                rowGap: '0px',
                minHeight: '123px',
              }}>
              <Form.Item
                name="type"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Тип')}>
                <Input
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="count"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Кол-во')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="agPercent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Процент АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value}%`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="agSumm"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                initialValue={0}
                label={InputLabel('Сумма АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                className="editForm-item"
                labelAlign="left"
                colon={false}
                name="city"
                rules={[{ required: true, message: 'Пожалуйста выберите город.' }]}
                label={InputLabel('Город')}>
                <Select
                  allowClear
                  dropdownAlign={{
                    points: ['bl', 'tl'],
                    offset: [0, -4],
                    overflow: {
                      adjustX: 0,
                      adjustY: 1,
                    },
                  }}
                  suffixIcon={
                    <>
                      <img
                        src={arrowDown}
                        alt="arrow top"
                        style={{
                          transform: selectOpened ? 'rotate(180deg)' : '',
                        }}
                      />
                    </>
                  }
                  onDropdownVisibleChange={(opened) => {
                    setSelectOpened(opened);
                  }}
                  loading={!cities.loaded}
                  size="large">
                  {cities.data.map((city) => {
                    return (
                      <Option key={city.id} value={city.id}>
                        {city.title}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item className="editForm-item">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                  style={{
                    width: '100%',
                    height: '38px',
                    marginTop: '40px',
                    borderRadius: '4px',
                    backgroundColor: '#2C5DE5',
                  }}>
                  Добавить
                </Button>
              </Form.Item>
            </div>
          </>
        );
      };
      break;
  }
  return (
    <Drawer
      height="auto"
      destroyOnClose
      bodyStyle={{
        paddingBottom: '10px',
      }}
      title={
        <span
          style={{
            color: '#003360',
            fontSize: 14,
            textTransform: 'uppercase',
          }}>
          Добавление
        </span>
      }
      placement="bottom"
      closable={true}
      onClose={() => {
        setCreateModal(false);
      }}
      closeIcon={<ExitIcon />}
      visible={createModal}
      maskStyle={{
        backgroundColor: 'transparent',
      }}>
      <Form
        layout="inline"
        style={{
          flexDirection: block === 'hot-ptc' ? 'column' : 'row',
        }}
        onFinish={(values) => {
          // console.log(values);
          setConfirmLoading(true);
          form.validateFields().then(() => {
            switch (block) {
              case 'extra-charge':
                const start = moment(values.period[0]).toDate();
                const end = moment(values.period[1]).toDate();
                let input = {
                  title: values.name,
                  count: values.count,
                  discountPercent: values.discount,
                  price: values.price,
                  agencyCommission: {
                    value: values.agSumm === 'null' ? null : values.agSumm,
                    percent: values.agPercent === 'null' ? null : values.agPercent,
                  },
                  city: values.city,
                  startPeriod: start,
                  endPeriod: end,
                  project: currentId,
                };
                createAddCosts({
                  variables: {
                    input,
                  },
                })
                  .then(() => {
                    setCreateModal(false);
                    form.resetFields();
                    setConfirmLoading(false);
                    message.success('Успешно создано.');
                    refetch();
                  })
                  .catch((err) => {
                    setConfirmLoading(false);
                    setCreateModal(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    console.log(err);
                  });
                break;
              case 'hot-ptc':
                let nonRtsInput = {
                  count: values.count,
                  title: values.type,
                  incomingTax: values.inputTax,
                  incomingRent: values.inputRent,
                  incomingPrinting: values.inputPrint,
                  incomingAdditional: values.inputCosts,
                  incomingInstallation: values.inputMount,
                  incomingManufacturing: values.inputManufcature,
                  saleTax: values.summTax,
                  saleRent: values.summRent,
                  salePrinting: values.summPrint,
                  saleAdditional: values.summCosts,
                  saleInstallation: values.summMount,
                  saleManufacturing: values.summManufacture,
                  agencyCommission: {
                    value: values.agSumm === 'null' ? null : values.agSumm,
                    percent: values.agPercent === 'null' ? null : values.agPercent,
                    toNonrts: true,
                  },
                  city: values.city,
                  project: currentId,
                };
                console.log(currentId);
                // console.log(nonRtsInput);
                createNonRts({
                  variables: {
                    input: nonRtsInput,
                  },
                })
                  .then(() => {
                    setCreateModal(false);
                    form.resetFields();
                    setConfirmLoading(false);
                    message.success('Успешно создано.');
                    refetch();
                  })
                  .catch((err) => {
                    setConfirmLoading(false);
                    message.error('Что-то пошло не так попробуйте ещё раз.');
                    setCreateModal(false);
                    console.log(err);
                  });
                break;
            }
          });
        }}
        form={form}>
        <FormInputs />
      </Form>
      <style>
        {`

        .editBtn {
          width: 100%;
          // max-width: 270px;
          margin-right: 0 !important;
        }

       .editForm-item {
         display: flex;
         flex-direction: column;
         margin-right: 0 !important;
         margin-bottom: 0 !important;
       }

        .rangePicker-dropdown {
          top: 532px !important;
        }

        // .select-dropdown {
        //   top: 542px !important;
        // }

        `}
      </style>
    </Drawer>
  );
};

export const CityFilterDropdown = (props) => {
  const { cities, setSort, sort } = useContext(EstimateContext);
  const [selectedCity, setSelectedCity] = useState(null);
  const Placeholder = (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <img
        style={{
          marginRight: '9px',
        }}
        src={worldIcon}
        alt="world icon"
      />
      Выбрать город
    </p>
  );
  const { Option } = Select;
  return (
    <div
      style={{
        width: 260,
      }}>
      <div
        style={{
          padding: '16px',
        }}>
        <p
          style={{
            fontSize: 14,
            color: sort.length ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 16,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSort('abc');
            props.clearFilters();
            setSelectedCity(null);
            props.confirm();
          }}>
          Сортировать от А до Я
        </p>
        <p
          style={{
            fontSize: 14,
            color: '#1A1A1A',
            marginBottom: 0,
            cursor: 'pointer',
          }}
          onClick={() => {
            setSort('');
            props.confirm();
            props.clearFilters();
            setSelectedCity(null);
          }}>
          Сортировать по умолчанию
        </p>
      </div>
      <div
        style={{
          borderTop: '1px solid #D3DFF0',
        }}>
        <div
          style={{
            padding: 16,
          }}>
          <p
            style={{
              color: '#656565',
              fontSize: 12,
            }}>
            ОПЦИИ
          </p>

          <Select
            style={{
              width: '100%',
            }}
            size="middle"
            allowClear
            value={selectedCity}
            onClear={() => {
              props.clearFilters();
              setSelectedCity(null);
            }}
            loading={!cities.loaded}
            placeholder={Placeholder}
            onSelect={(val) => {
              props.setSelectedKeys([val]);
              props.confirm();
              setSelectedCity(val);
              setSort('');
            }}>
            {cities.data.map((city) => {
              return (
                <Option key={city.id} value={city.title}>
                  {city.title}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </div>
  );
};

export const PeriodFilterDropdown = (props) => {
  const { periodFilter, setPeriodFilter } = useContext(EstimateContext);

  return (
    <div
      style={{
        width: 260,
      }}>
      <div
        style={{
          padding: '16px',
        }}>
        <p
          style={{
            fontSize: 14,
            color: periodFilter === 'increase' ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 16,
            cursor: 'pointer',
          }}
          onClick={() => {
            setPeriodFilter((prevState) => {
              switch (prevState) {
                case 'increase':
                  return '';
                default:
                  return 'increase';
              }
            });
            props.clearFilters();
            props.confirm();
          }}>
          Сортировать по увеличению
        </p>
        <p
          style={{
            fontSize: 14,
            color: periodFilter === 'decrease' ? '#2C5DE5' : '#1A1A1A',
            marginBottom: 0,
            cursor: 'pointer',
          }}
          onClick={() => {
            props.confirm();
            props.clearFilters();
            setPeriodFilter((prevState) => {
              switch (prevState) {
                case 'decrease':
                  return '';
                default:
                  return 'decrease';
              }
            });
          }}>
          Сортировать по уменьшению
        </p>
      </div>
      <div
        style={{
          borderTop: '1px solid #D3DFF0',
        }}>
        <div
          style={{
            padding: 16,
          }}>
          <p
            style={{
              color: '#656565',
              fontSize: 12,
            }}>
            ОПЦИИ
          </p>
          <DatePicker
            style={{
              width: '100%',
            }}
            onChange={(val) => {
              if (!val) {
                props.clearFilters();
              }
            }}
            format="DD.MM.YYYY"
            onSelect={(val) => {
              props.setSelectedKeys([val.toDate().setHours(0, 0, 0, 0)]);
              props.confirm();
              console.log('cleared');
            }}
            placeholder="Выберите дату"
          />
        </div>
      </div>
    </div>
  );
};
