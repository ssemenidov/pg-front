import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Modal, Form, DatePicker, InputNumber, Select, Drawer, Button } from 'antd';
import { ReactComponent as ExitIcon } from '../../../img/sales/exitIcon.svg';
import { getConstructionSideCode } from '../../../components/Logic/constructionSideCode';

export const BOOKED_SIDES_QUERY = gql`
  query applicationQuery($id: ID) {
    searchAttachment(id: $id) {
      edges {
        node {
          id
          code
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                constructionSide {
                  advertisingSide {
                    code
                    side {
                      title
                      code
                      format {
                        title
                        code
                      }
                      code
                    }
                  }
                  construction {
                    numInDistrict
                    location {
                      marketingAddress {
                        address
                      }

                      postcode {
                        title
                        district {
                          title
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
`;

export const EXTRA_COSTS_QUERY = gql`
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
        }
      }
    }
  }
`;

export const NON_RTS_QUERY = gql`
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
        }
      }
    }
  }
`;

export const PROJECT_BOOKED_SIDES_QUERY = gql`
  query bookedSidesQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          reservations {
            edges {
              node {
                id
                dateFrom
                dateTo
                branding
                constructionSide {
                  advertisingSide {
                    code
                    side {
                      title
                      code
                      format {
                        title
                        code
                      }
                      code
                    }
                  }
                  construction {
                    numInDistrict
                    location {
                      marketingAddress {
                        address
                      }
                      postcode {
                        title
                        district {
                          title
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
`;

export const PROJECT_EXTRA_COSTS_QUERY = gql`
  query projectExtraCostsQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          additionalCosts {
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
                percentAgentCommission
                valueAgentCommission
              }
            }
          }
        }
      }
    }
  }
`;

export const PROJECT_NON_RTS_QUERY = gql`
  query projectNonRtsQuery($id: ID) {
    searchProject(id: $id) {
      edges {
        node {
          additionalCostsNonrts {
            edges {
              node {
                id
                city {
                  title
                }
                count
                title
                incomingRent
                incomingTax
                incomingPrinting
                incomingInstallation
                incomingManufacturing
                incomingAdditional
                city {
                  title
                }
                saleRent
                saleTax
                salePrinting
                saleInstallation
                saleManufacturing
                saleAdditional
                valueAgentCommission
                percentAgentCommission
              }
            }
          }
        }
      }
    }
  }
`;

export const getBookedSides = (data = []) => {
  return data.map((invoice) => {
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
};

export const getExtraCosts = (data = []) => {
  return data.map((charge) => {
    let price = charge.node.price ? charge.node.price : 0;
    let discount = charge.node.discount ? charge.node.discount : 100;
    let count = charge.node.count ? charge.node.count : 0;
    let sumAfterDiscount = price * (1.0 - discount / 100.0);
    let agPercent = charge.node.percentAgentCommission ? charge.node.percentAgentCommission : 0;
    let agValue = charge.node.valueAgentCommission ? charge.node.valueAgentCommission : 0;

    return (
      charge.node.city !== null && {
        key: charge.node.id ? charge.node.id : '',
        nameOfService: charge.node.title ? charge.node.title : '',
        city: charge.node.city.title ? charge.node.city.title : '',
        period: charge.node.startPeriod
          ? new Date(charge.node.startPeriod).toLocaleDateString() +
            ' - ' +
            new Date(charge.node.endPeriod).toLocaleDateString()
          : '',
        quantity: charge.node.count ? charge.node.count : '',
        price: charge.node.price ? charge.node.price + ' тг.' : '',
        discount: charge.node.discount ? charge.node.discount + '%' : '',
        priceAfterDiscount: sumAfterDiscount + ' тг.',
        sum: sumAfterDiscount * count + ' тг.',
        percentAK: agPercent + ' %',
        sumAK: agValue + ' тг.',
      }
    );
  });
};

export const gettNonRts = (data = []) => {
  return data.map((item) => {
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
};

const UPDATE_ADDITIONAL_COSTS = gql`
  mutation updateAddCosts($id: ID!, $input: UpdateAdditionalCostsInput!) {
    updateSalesAdditionalCost(id: $id, input: $input) {
      additionalCosts {
        id
        endPeriod
        startPeriod
        price
        discount
      }
    }
  }
`;

const UPDATE_NON_RTS = gql`
  mutation updateNonRts($id: ID!, $input: UpdateEstimateNonRtsInput!) {
    updateSalesNonrts(id: $id, input: $input) {
      estimateNonRts {
        id
      }
    }
  }
`;

export const EditModal = ({ openModal, setOpenModal, block, cities, editingItem, refetch }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Option } = Select;
  let FormInputs = () => {};
  let startTime = editingItem.period && moment(editingItem.period.split(' - ')[0].split('.').reverse().join('-'));
  let endTime = editingItem.period && moment(editingItem.period.split(' - ')[1].split('.').reverse().join('-'));
  useEffect(() => {
    let city =
      cities.data.length &&
      editingItem.city &&
      cities.data.filter((city) => {
        return city.title === editingItem.city;
      });
    city = city.length ? city[0].id : '';
    switch (block) {
      case 'extra-charge':
        form.setFieldsValue({
          type: editingItem.nameOfService,
          city,
          period: [startTime, endTime],
          count: editingItem.quantity,
          price: editingItem.price && editingItem.price.split(' ')[0],
          discount: editingItem.discount && editingItem.discount.split('%')[0],
        });
        break;
      case 'hot-ptc':
        form.setFieldsValue({
          type: editingItem.code,
          count: editingItem.quantity,
          city,
          rent: editingItem.rentInput.split(' ')[0],
          tax: editingItem.taxInput.split(' ')[0],
          print: editingItem.printInput.split(' ')[0],
          mount: editingItem.mountInput.split(' ')[0],
          manufacture: editingItem.manufactureSell.split(' ')[0],
          addCosts: editingItem.extraChargeInput,
        });
        break;
    }
  }, [form, editingItem]);
  const [updateAddCosts] = useMutation(UPDATE_ADDITIONAL_COSTS);
  const [updateNonRts] = useMutation(UPDATE_NON_RTS);
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        return (
          <>
            <Form.Item
              label="Наименование услуги"
              name="type"
              rules={[{ required: true, message: 'Пожалуйста, введите наименование услуги.' }]}>
              <Input allowClear placeholder="Наименование услуги" />
            </Form.Item>
            <Form.Item label="Город" name="city" rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}>
              <Select placeholder="Город">
                {cities &&
                  cities.data.map((city) => {
                    return (
                      <Option key={city.id} value={city.id}>
                        {city.title}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Период"
              name="period"
              rules={[{ required: true, message: 'Пожалуйста, выберите период.' }]}>
              <DatePicker.RangePicker allowClear />
            </Form.Item>
            <Form.Item
              label="Кол-во"
              name="count"
              rules={[{ required: true, message: 'Пожалуйста, введите количество.' }]}>
              <InputNumber placeholder="Кол-во" />
            </Form.Item>
            <Form.Item label="Цена" name="price" rules={[{ required: true, message: 'Пожалуйста, введите цену.' }]}>
              <InputNumber allowClear placeholder="Цена" />
            </Form.Item>
            <Form.Item
              label="Скидка"
              name="discount"
              rules={[{ required: true, message: 'Пожалуйста, введите скидку.' }]}>
              <InputNumber max={100} maxLength={3} formatter={(value) => `${value}%`} placeholder="Скидка" />
            </Form.Item>
          </>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
        return (
          <>
            <Form.Item label="Город" name="city" rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}>
              <Select placeholder="Город">
                {cities &&
                  cities.data.map((city) => {
                    return (
                      <Option key={city.id} value={city.id}>
                        {city.title}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item label="Тип" name="type" rules={[{ required: true, message: 'Пожалуйста, введите тип.' }]}>
              <Input placeholder="Тип" />
            </Form.Item>
            <Form.Item
              label="Кол-во"
              name="count"
              rules={[{ required: true, message: 'Пожалуйста, введите количество.' }]}>
              <InputNumber placeholder="Кол-во" />
            </Form.Item>
            <Form.Item
              label="Аренда"
              name="rent"
              rules={[{ required: true, message: 'Пожалуйста, введите стоимость аренды.' }]}>
              <InputNumber placeholder="Аренда" />
            </Form.Item>
            <Form.Item label="Налог" name="tax" rules={[{ required: true, message: 'Пожалуйста, введите налог.' }]}>
              <InputNumber placeholder="Налог" />
            </Form.Item>
            <Form.Item
              label="Печать"
              name="print"
              rules={[{ required: true, message: 'Пожалуйста, введите стоимсость печати.' }]}>
              <InputNumber placeholder="Печать" />
            </Form.Item>
            <Form.Item
              label="Монтаж"
              name="mount"
              rules={[{ required: true, message: 'Пожалуйста, введите стоимость монтажа.' }]}>
              <InputNumber placeholder="Монтаж" />
            </Form.Item>
            <Form.Item
              label="Производство"
              name="manufacture"
              rules={[{ required: true, message: 'Пожалуйста, введите сумму производства.' }]}>
              <InputNumber placeholder="Производство" prefix=" тг." />
            </Form.Item>
            <style>
              {`
            .ant-input-number {
              width: 100%;
            }
            `}
            </style>
          </>
        );
      };
  }
  return (
    <Modal
      width="400px"
      title="Редактирование расхода"
      confirmLoading={confirmLoading}
      visible={openModal}
      onCancel={() => {
        form.resetFields();
        setOpenModal(false);
        setConfirmLoading(false);
      }}
      onOk={() => {
        form.validateFields().then((values) => {
          console.log(values);
          setConfirmLoading(true);
          switch (block) {
            case 'extra-charge':
              const price = Number(values.price);
              const discount = Number(values.discount);
              const count = Number(values.count);
              const priceAfterDiscount = (Number(values.price) * (100 - Number(values.discount))) / 100;
              const summa = priceAfterDiscount * count;
              const input2 = {
                title: values.type,
                city: values.city,
                startPeriod: new Date(values.period[0]).toJSON(),
                endPeriod: new Date(values.period[1]).toJSON(),
                count: count,
                discount: discount,
                sumAfterDiscount: priceAfterDiscount,
                price: price,
                summa: summa,
              };
              updateAddCosts({
                variables: {
                  input: input2,
                  id: editingItem.key,
                },
              })
                .then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  refetch();
                })
                .catch((err) => {
                  setConfirmLoading(false);
                  console.log(err);
                });
              break;
            case 'hot-ptc':
              const tax = Number(values.tax);
              const print = Number(values.print);
              const mount = Number(values.mount);
              const manufacture = Number(values.manufacture);
              const rent = Number(values.rent);
              const summ = values.count * rent + tax + print + mount + manufacture;
              const input = {
                title: values.type,
                count: values.count,
                incomingTax: tax,
                incomingRent: rent,
                incomingPrinting: print,
                incomingInstallation: mount,
                incomingManufacturing: manufacture,
                city: values.city,
              };

              updateNonRts({
                variables: {
                  input,
                  id: editingItem.key,
                },
              })
                .then(() => {
                  setOpenModal(false);
                  form.resetFields();
                  setConfirmLoading(false);
                  refetch();
                })
                .catch((err) => console.log(err));
          }
        });
      }}>
      <Form form={form}>
        <FormInputs />
      </Form>
    </Modal>
  );
};

export const DELETE_ADD_COSTS_QUERY = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesAdditionalCost(id: $id) {
      found
      deletedId
    }
  }
`;

export const DELETE_NON_RTS = gql`
  mutation deleteAddCost($id: ID!) {
    deleteSalesNonrts(id: $id) {
      found
      deletedId
    }
  }
`;

export const DeleteModal = (estimate, deleteEstimate, setDeleted) => {
  const { confirm } = Modal;
  confirm({
    title: 'Do you Want to delete these items?',
    centered: true,
    content: 'Some descriptions',
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

export const EditCosts = ({ openModal, setOpenModal, block, cities, editingItem, refetch }) => {
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

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [form] = Form.useForm();
  let FormInputs = () => {};
  console.log(editingItem);
  const [updateAddCosts] = useMutation(UPDATE_ADDITIONAL_COSTS);
  const [updateNonRts] = useMutation(UPDATE_NON_RTS);
  useEffect(() => {
    switch (block) {
      case 'extra-charge':
        form.setFieldsValue({
          name: editingItem.nameOfService || 0,
          count: editingItem.quantity || 0,
          price: editingItem.price.split(' ')[0] || 0,
          discount: editingItem.discount.split('%')[0] || 0,
          agPercent: editingItem.percentAK.split('%')[0] || 0,
          agSumm: editingItem.sumAK.split(' ')[0] || 0,
        });
        break;
      case 'booked-sides':
        form.setFieldsValue({
          // rentPrice: editingItem.taxInput.split(" ")[0] || 0,
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
        });
    }
  }, [editingItem, form]);
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        return (
          <>
            <Form.Item
              className="editForm-item"
              labelAlign="left"
              colon={false}
              name="name"
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
              <Input
                style={{
                  width: '270px',
                }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="count"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              label={InputLabel('Кол-во')}>
              <InputNumber
                style={{
                  width: '120px',
                }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="price"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              label={InputLabel('Цена')}>
              <InputNumber
                style={{
                  width: '270px',
                }}
                size="large"
                formatter={(value) => `${value} тг`}
              />
            </Form.Item>
            <Form.Item
              name="discount"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              label={InputLabel('Скидка')}>
              <InputNumber
                style={{
                  width: '120px',
                }}
                size="large"
                formatter={(value) => `${value}%`}
              />
            </Form.Item>
            <Form.Item
              name="agPercent"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              label={InputLabel('Процент АК')}>
              <InputNumber
                style={{
                  width: '270px',
                }}
                size="large"
                formatter={(value) => `${value}%`}
              />
            </Form.Item>
            <Form.Item
              name="agSumm"
              className="editForm-item"
              labelAlign="left"
              colon={false}
              label={InputLabel('Сумма АК')}>
              <InputNumber
                style={{
                  width: '270px',
                }}
                size="large"
                formatter={(value) => {
                  return `${value} тг`;
                }}
              />
            </Form.Item>
            <Form.Item
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexEnd',
              }}
              className="editBtn">
              <Button
                type="primary"
                htmlType="submit"
                loading={confirmLoading}
                style={{
                  width: '100%',
                  height: '38px',
                  marginTop: '15px',
                  borderRadius: '4px',
                }}>
                Сохранить
              </Button>
            </Form.Item>
          </>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
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
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Аренда')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Налог')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Печать')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Монтаж')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Доп.расходы')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Производство')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                name="type"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Тип')}>
                <Input
                  style={{
                    width: '100%',
                    minWidth: '260px',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="count"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Кол-во')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
                  }}
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="agPercent"
                className="editForm-item"
                labelAlign="left"
                colon={false}
                label={InputLabel('Процент АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
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
                label={InputLabel('Сумма АК')}>
                <InputNumber
                  style={{
                    width: '100%',
                    minWidth: '260px',
                  }}
                  size="large"
                  formatter={(value) => {
                    return `${value} тг`;
                  }}
                />
              </Form.Item>
              <Form.Item
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flexEnd',
                }}
                className="editBtn">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={confirmLoading}
                  style={{
                    minWidth: '260px',
                    height: '38px',
                    marginTop: '15px',
                    borderRadius: '4px',
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
          marginBottom: '15px',
          flexDirection: block === 'hot-ptc' ? 'column' : 'row',
          justifyContent: block === 'extra-charge' ? 'space-between' : '',
        }}
        onFinish={(values) => {
          console.log(values);
          setConfirmLoading(true);
          switch (block) {
            case 'extra-charge':
              let input = {
                title: values.name,
                count: values.count,
                discount: values.discount,
                price: values.price,
                percentAgentCommission: values.agPercent,
                valueAgentCommission: values.agSumm,
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
                  refetch();
                })
                .catch((err) => {
                  setConfirmLoading(false);
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
              };
              console.log(nonRtsInput);
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
                  refetch();
                })
                .catch((err) => {
                  setConfirmLoading(false);
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
          max-width: 270px;
        }

       .editBtn>div {
         display: flex !important;
         justify-content: flex-end;
       }
       .editForm-item {
         display: flex;
         flex-direction: column;
       }
        `}
      </style>
    </Drawer>
  );
};
