import { gql, useMutation } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Input, Modal, Form, DatePicker, InputNumber, Select, Tooltip } from 'antd';

export const BOOKED_SIDES_QUERY = gql`
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
          sumAfterDiscount
          summa
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
          summaClient
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
                sumAfterDiscount
                summa
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
                count
                title
                incomingRent
                incomingTax
                incomingPrinting
                incomingInstallation
                incomingManufacturing
                summaClient
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
`;

export const getBookedSides = (data) => {
  return data.map((invoice) => {
    return {
      key: invoice.node.id,
      code: invoice.node.constructionSide.advertisingSide.side.code
        ? invoice.node.constructionSide.advertisingSide.side.code
        : '',
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

export const getExtraCosts = (data) => {
  return data.map((charge) => {
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
        priceAfterDiscount: charge.node.sumAfterDiscount ? charge.node.sumAfterDiscount + ' тг.' : '',
        sum: charge.node.summa ? charge.node.summa + ' тг.' : '',
        percentAK: 'stub data',
        sumAK: 'stub data',
        sumWithoutAK: 'stub data',
      }
    );
  });
};

export const gettNonRts = (data) => {
  return data.map((item) => {
    return {
      key: item.node.id,
      code: item.node.title,
      city: item.node.city ? item.node.city.title : '',
      quantity: item.node.count,
      rentInput: item.node.incomingRent + ' тг.',
      taxInput: item.node.incomingTax + ' тг.',
      printInput: item.node.incomingPrinting + ' тг.',
      mountInput: item.node.incomingInstallation + ' тг.',
      extraChargeInput: '',
      sumInput: item.node.summaClient + ' тг.',
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

export const EditModal = ({ openModal, setOpenModal, block, cities, editingItem, refetch }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [variables, setVariables] = useState({});
  const { Option } = Select;
  let FormInputs = () => {};
  let startTime = editingItem.period && moment(editingItem.period.split(' - ')[0].split('.').reverse().join('-'));
  let endTime = editingItem.period && moment(editingItem.period.split(' - ')[1].split('.').reverse().join('-'));
  useEffect(() => {
    const city =
      cities.data.length &&
      cities.data.filter((city) => {
        return city.title === editingItem.city;
      })[0].id;
    console.log(editingItem);
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
    }
  }, [form, editingItem]);
  const [updateAddCosts] = useMutation(UPDATE_ADDITIONAL_COSTS);
  switch (block) {
    case 'extra-charge':
      FormInputs = () => {
        return (
          <>
            <Form.Item name="type" rules={[{ required: true, message: 'Пожалуйста, введите наименование услуги.' }]}>
              <Input placeholder="Наименование услуги" />
            </Form.Item>
            <Form.Item name="city" rules={[{ required: true, message: 'Пожалуйста, выберите город.' }]}>
              <Select size="large" placeholder="Город">
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
            <Form.Item name="period" rules={[{ required: true, message: 'Пожалуйста, выберите период.' }]}>
              <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item name="count" rules={[{ required: true, message: 'Пожалуйста, введите количество.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                placeholder="Кол-во"
              />
            </Form.Item>
            <Form.Item name="price" rules={[{ required: true, message: 'Пожалуйста, введите цену.' }]}>
              <InputNumber
                style={{
                  width: 301,
                }}
                placeholder="Цена"
              />
            </Form.Item>
            <Form.Item name="discount" rules={[{ required: true, message: 'Пожалуйста, введите скидку.' }]}>
              <InputNumber
                max={100}
                maxLength={3}
                style={{
                  width: 301,
                }}
                formatter={(value) => `${value}%`}
                placeholder="Скидка"
              />
            </Form.Item>
          </>
        );
      };
      break;
    case 'hot-ptc':
      FormInputs = () => {
        return (
          <>
            <Form.Item name="city">
              <Select size="large" placeholder="Город" defaultValue={editingItem.city}>
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
            <Form.Item name="type">
              <Input placeholder="Тип" defaultValue={editingItem.code} />
            </Form.Item>
            <Form.Item name="count">
              <InputNumber placeholder="Кол-во" defaultValue={editingItem.quantity} />
            </Form.Item>
            <Form.Item name="rent">
              <InputNumber size="large" placeholder="Аренда" defaultValue={editingItem.rentInput} />
            </Form.Item>
            <Form.Item name="tax">
              <InputNumber placeholder="Налог" defaultValue={editingItem.taxInput} />
            </Form.Item>
            <Form.Item name="print">
              <InputNumber placeholder="Печать" defaultValue={editingItem.printInput} />
            </Form.Item>
            <Form.Item name="mount">
              <InputNumber placeholder="Монтаж" defaultValue={editingItem.mountInput} />
            </Form.Item>
            <Form.Item name="addCosts">
              <InputNumber placeholder="Доп. расходы" defaultValue={editingItem.extraChargeInput} />
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
      title="Редактирование расхода"
      confirmLoading={confirmLoading}
      visible={openModal}
      onCancel={() => {
        form.resetFields();
        setOpenModal(false);
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
              const input = {
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
          }
        });
      }}>
      <Form form={form}>
        <FormInputs />
      </Form>
    </Modal>
  );
};
