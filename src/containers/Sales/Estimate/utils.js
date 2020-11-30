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
import { UPDATE_NON_RTS, UPDATE_ADDITIONAL_COSTS, CREATE_ADDITIONAL_COSTS, CREATE_NON_RTS_COSTS } from './queries';

export const getBookedSides = (data = [], sort = '') => {
  let modifiedData = data.map((invoice) => {
    return {
      key: invoice.node.id,
      code: getConstructionSideCode(invoice.node.constructionSide),
      city: invoice.node.constructionSide.construction.location.postcode.district.city.title
        ? invoice.node.constructionSide.construction.location.postcode.district.city.title
        : '',
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

export const getExtraCosts = (data = [], sort = '') => {
  let modifiedData = data.map((charge) => {
    let price = charge.node.price ? charge.node.price : 0;
    let discount = charge.node.discount ? charge.node.discount : 0;
    let count = charge.node.count ? charge.node.count : 0;
    let sumAfterDiscount = price * (1.0 - discount / 100.0);
    let agPercent = charge.node.percentAgentCommission ? charge.node.percentAgentCommission : 0;
    let agValue = charge.node.valueAgentCommission ? charge.node.valueAgentCommission : 0;
    return {
      key: charge.node.id ? charge.node.id : '',
      nameOfService: charge.node.title ? charge.node.title : '',
      city: charge.node.city ? charge.node.city.title : '',
      cityId: charge.node.city ? charge.node.city.id : '',
      period: charge.node.startPeriod
        ? new Date(charge.node.startPeriod).toLocaleDateString() +
          ' - ' +
          new Date(charge.node.endPeriod).toLocaleDateString()
        : '',
      quantity: charge.node.count ? charge.node.count : '',
      price: charge.node.price ? charge.node.price + ' тг.' : '',
      discount: charge.node.discount ? charge.node.discount + '%' : '',
      priceAfterDiscount: sumAfterDiscount.toFixed(2) + ' тг.',
      sum: (sumAfterDiscount * count).toFixed(2) + ' тг.',
      percentAK: agPercent + ' %',
      sumAK: agValue + ' тг.',
    };
  });
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

export const gettNonRts = (data = [], sort = '') => {
  let modifiedData = data.map((item) => {
    let inputRent = item.node.incomingRent || 0;
    let inputTax = item.node.incomingTax || 0;
    let inputPrint = item.node.incomingPrinting || 0;
    let inputMount = item.node.incomingInstallation || 0;
    let inputManufacture = item.node.incomingManufacturing || 0;
    let inputCosts = item.node.incomingAdditional || 0;

    let sellRent = item.node.saleRent || 0;
    let sellTax = item.node.saleTax || 0;
    let sellPrint = item.node.salePrinting || 0;
    let sellMount = item.node.saleInstallation || 0;
    let sellManufacture = item.node.saleManufacturing || 0;
    let sellAdditonalCosts = item.node.saleAdditional || 0;
    let quantity = item.node.count || 0;
    let sumInput = inputRent + inputTax + inputPrint + inputMount + inputManufacture + inputCosts;
    let sumSell = sellRent + sellTax + sellPrint + sellMount + sellManufacture + sellAdditonalCosts;
    let agPercent = item.node.percentAgentCommission || 0;
    let agValue = item.node.valueAgentCommission || 0;

    return {
      key: item.node.id,
      code: item.node.title,
      city: item.node.city ? item.node.city.title : '',
      cityId: item.node.city ? item.node.city.id : '',
      quantity: quantity,
      rentInput: inputRent + ' тг.',
      taxInput: inputTax + ' тг.',
      printInput: inputPrint + ' тг.',
      mountInput: inputMount + ' тг.',
      manufactureInput: inputManufacture + ' тг.',
      costsInput: inputCosts + ' тг.',
      sumInput: sumInput + ' тг.',
      rentSell: sellRent + ' тг.',
      taxSell: sellTax + ' тг.',
      printSell: sellPrint + ' тг.',
      mountSell: sellMount + ' тг.',
      manufactureSell: sellManufacture + ' тг.',
      sumSell: sumSell + ' тг.',
      costsSell: sellAdditonalCosts + ' тг.',
      percentAK: agPercent + '%',
      sumAK: agValue + ' тг.',
    };
  });

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
          }
          if (data.deleteSalesNonrts) {
            data.deleteSalesNonrts.found && setDeleted(true);
          }
        })
        .catch((err) => {
          console.log(err);
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
  useEffect(() => {
    switch (block) {
      case 'extra-charge':
        const start = editingItem.period
          ? moment(editingItem.period.split(' - ')[0].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        const end = editingItem.period
          ? moment(editingItem.period.split(' - ')[1].split('.').join('-'), 'DD-MM-YYYY')
          : '';
        form.setFieldsValue({
          name: editingItem.nameOfService || 0,
          count: editingItem.quantity || 0,
          price: editingItem.price ? editingItem.price.split(' ')[0] : 0,
          discount: editingItem.discount ? editingItem.discount.split('%')[0] : 0,
          agPercent: editingItem.percentAK ? editingItem.percentAK.split('%')[0] : 0,
          agSumm: editingItem.sumAK ? editingItem.sumAK.split(' ')[0] : 0,
          city: editingItem.cityId ? editingItem.cityId : "",
          period: [start, end],
        });
        break;
      case 'hot-ptc':
        form.setFieldsValue({
          inputRent: editingItem.rentInput.split(' ')[0] || 0,
          inputTax: editingItem.taxInput.split(' ')[0] || 0,
          inputPrint: editingItem.printInput.split(' ')[0] || 0,
          inputMount: editingItem.mountInput.split(' ')[0] || 0,
          inputCosts: editingItem.costsInput.split(' ')[0] || 0,
          inputManufcature: editingItem.manufactureInput.split(' ')[0] || 0,
          summRent: editingItem.rentSell.split(' ')[0] || 0,
          summTax: editingItem.taxSell.split(' ')[0] || 0,
          summPrint: editingItem.printSell.split(' ')[0] || 0,
          summMount: editingItem.mountSell.split(' ')[0] || 0,
          summManufacture: editingItem.manufactureSell.split(' ')[0] || 0,
          summCosts: editingItem.costsSell.split(' ')[0] || 0,
          type: editingItem.code,
          count: editingItem.quantity,
          agPercent: editingItem.percentAK.split('%')[0] || 0,
          agSumm: editingItem.sumAK.split(' ')[0] || 0,
          city: editingItem.cityId ? editingItem.cityId : "",
        });
    }
  }, [editingItem, form]);
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
                format="DD-MM-YYYY"
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
              label={InputLabel('Кол-во')}>
              <InputNumber type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              initialValue={0}
              colon={false}
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
            <Form.Item>
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
          switch (block) {
            case 'extra-charge':
              const start = moment(values.period[0]).toDate();
              const end = moment(values.period[1]).toDate();
              let input = {
                title: values.name,
                count: values.count,
                discount: values.discount,
                price: values.price,
                percentAgentCommission: values.agPercent,
                valueAgentCommission: values.agSumm,
                city: values.city,
                startPeriod: start,
                endPeriod: end,
              };
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
                valueAgentCommission: values.agSumm,
                percentAgentCommission: values.agPercent,
                city: values.city,
              };
              // console.log(nonRtsInput);
              updateNonRts({
                variables: {
                  input: nonRtsInput,
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
                  message.error('Что-то пошло не так попробуйте ещё раз.');
                  setOpenModal(false);
                  console.log(err);
                });
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
              label={InputLabel('Кол-во')}>
              <InputNumber type="number" size="large" />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              initialValue={0}
              colon={false}
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
            <Form.Item>
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
                  discount: values.discount,
                  price: values.price,
                  percentAgentCommission: values.agPercent,
                  valueAgentCommission: values.agSumm,
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
                  valueAgentCommission: values.agSumm,
                  percentAgentCommission: values.agPercent,
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
